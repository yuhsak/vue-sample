<template>
  <main>
    <section class="container">
      <h1>TODO</h1>
      <FilterBox title="カテゴリ" :value="input.filter.categry" :onInput="setFilterCategory" />
      <FilterBox title="期限" :value="input.filter.expiresAt" :onInput="setFilterExpiresAt" />
      <TodoList
        :ids="filteredTodoIds"
        :getTodoById="getTodoById"
        :onClickDelete="deleteTodoById"
        :onClickEdit="openEditModal"
      />
    </section>
    <CreateBox :addTodo="createTodo" />
    <EditModal
      :visible="input.edit.visible"
      :close="closeEditModal"
      :save="saveCurrentEditting"
      :content="input.edit.content"
      :onChangeTitle="setEditTitle"
      :onChangeExpiresAt="setEditExpiresAt"
      :onChangeCategory="setEditCategory"
    />
  </main>
</template>

<script>
  import Vue from 'vue'
  import TodoList from './components/todo-list.vue'
  import FilterBox from './components/filter-box.vue'
  import CreateBox from './components/create-box'
  import EditModal from './components/edit-modal'
  import { setEntity, emptyStringToNull } from './util'
  import { getTodos, createTodo, deleteTodo, updateTodo } from './service'

  export default Vue.extend({
    name: 'App',
    components: {
      TodoList,
      CreateBox,
      FilterBox,
      EditModal,
    },
    data() {
      return {
        entity: {
          todo: {},
        },
        todoList: {
          ids: [],
        },
        input: {
          filter: {
            expiresAt: null,
            category: null,
          },
          edit: {
            visible: false,
            id: null,
            content: {
              title: null,
              expiresAt: null,
              category: null,
            },
          },
        },
      }
    },
    methods: {
      // Atomic ops
      getTodoById(id) {
        return this.entity.todo[id]
      },
      setTodo(todo) {
        this.entity.todo = setEntity(this.entity.todo, todo)
      },
      setTodos(todos) {
        this.entity.todo = todos.reduce(setEntity, this.entity.todo)
      },
      addTodoId(id) {
        this.todoList.ids.unshift(id)
      },
      addTodoIds(ids) {
        this.todoList.ids = [...ids, ...this.todoList.ids]
      },
      removeTodoId(id) {
        this.todoList.ids = this.todoList.ids.filter((_id) => _id !== id)
      },
      // Async ops
      async fetchTodos() {
        const todos = await getTodos()
        this.setTodos(todos)
        this.addTodoIds(todos.map((todo) => todo._id))
      },
      async createTodo(content) {
        if (!content.title) return
        const todo = await createTodo(emptyStringToNull(content))
        this.setTodo(todo)
        this.addTodoId(todo._id)
      },
      async deleteTodoById(id) {
        await deleteTodo(id)
        this.removeTodoId(id)
      },
      async updateTodoById(id, content) {
        if (!content.title) return
        const todo = await updateTodo(id, emptyStringToNull(content))
        this.setTodo(todo)
      },
      // Filter
      setFilterExpiresAt(value) {
        const expiresAt = value === '' ? null : value
        this.input.filter = { ...this.input.filter, expiresAt }
      },
      setFilterCategory(value) {
        const category = value === '' ? null : value
        this.input.filter = { ...this.input.filter, category }
      },
      // Edit
      setEditTitle(value) {
        const title = value === '' ? null : value
        this.input.edit.content = { ...this.input.edit.content, title }
      },
      setEditExpiresAt(value) {
        const expiresAt = value === '' ? null : value
        this.input.edit.content = { ...this.input.edit.content, expiresAt }
      },
      setEditCategory(value) {
        const category = value === '' ? null : value
        this.input.edit.content = { ...this.input.edit.content, category }
      },
      openEditModal(id) {
        const { _id, ...todo } = this.getTodoById(id)
        this.input.edit.content = todo
        this.input.edit.id = _id
        this.input.edit.visible = true
      },
      closeEditModal() {
        this.input.edit.content = { title: null, expiresAt: null, category: null }
        this.input.edit.id = null
        this.input.edit.visible = false
      },
      async saveCurrentEditting() {
        await this.updateTodoById(this.input.edit.id, this.input.edit.content)
        this.closeEditModal()
      },
    },
    computed: {
      todos() {
        return this.todoList.ids.map((id) => this.getTodoById(id))
      },
      filteredTodoIds() {
        const { category, expiresAt } = this.input.filter
        return this.todos
          .filter((todo) => category === null || todo.category === category)
          .filter((todo) => expiresAt === null || todo.expiresAt === expiresAt)
          .map((todo) => todo._id)
      },
    },
    mounted() {
      this.fetchTodos()
    },
  })
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    font-family: Meiryo;
  }
</style>

<style scoped>
  .container {
    padding: 0 16px;
    padding-bottom: 178px;
  }
  h1 {
    margin-bottom: 8px;
  }
  .text-field {
    margin-bottom: 8px;
    font-size: 16px;
    padding: 4px;
  }
</style>
