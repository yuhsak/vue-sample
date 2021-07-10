<template>
  <main>
    <section class="container">
      <h1>TODO</h1>
      <input
        class="text-field"
        type="text"
        placeholder="カテゴリでフィルタ"
        :value="input.filter.category"
        @change="onInputFilterCategory"
      />
      <template v-for="item in this.filteredTodoList">
        <TodoItem :key="item.id" :content="item" />
      </template>
    </section>
    <ToolBox :addTodoItem="handleAddTodoItem" />
  </main>
</template>

<script>
  import Vue from 'vue'
  import TodoItem from './todo-item'
  import ToolBox from './tool-box'

  const idByUnit = (unit) => () => [...Array(unit)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
  const generateId = idByUnit(16)

  export default Vue.extend({
    name: 'App',
    components: {
      TodoItem,
      ToolBox,
    },
    data() {
      return {
        todoList: [],
        input: {
          filter: {
            category: null,
          },
        },
      }
    },
    mounted() {
      const todoListJson = localStorage.getItem('todoList')
      if (todoListJson) {
        const todoList = JSON.parse(todoListJson)
        this.todoList = todoList
      }
    },
    computed: {
      filteredTodoList() {
        if (this.input.filter.category === null) {
          return this.todoList
        }
        return this.todoList.filter((item) => {
          return item.category === this.input.filter.category
        })
      },
    },
    methods: {
      onInputFilterCategory(event) {
        if (event.target.value === '') {
          this.input.filter.category = null
          return
        }
        this.input.filter.category = event.target.value
      },
      handleAddTodoItem(item) {
        if (item.title === '') {
          return
        }
        this.todoList.push({
          id: generateId(),
          title: item.title,
          expiresAt: item.expiresAt || null,
          category: item.category || null,
        })
        localStorage.setItem('todoList', JSON.stringify(this.todoList))
      },
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
