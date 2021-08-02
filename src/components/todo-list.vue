<template>
  <div>
    <template v-for="todo in this.todos">
      <TodoItem :key="todo._id" :content="todo" :onClickDelete="onClickDelete" :onClickEdit="onClickEdit" />
    </template>
  </div>
</template>

<script>
  import Vue from 'vue'
  import TodoItem from './todo-item'

  export default Vue.extend({
    name: 'TodoList',
    props: {
      ids: {
        type: Array,
        required: true,
      },
      getTodoById: {
        type: Function,
        required: true,
      },
      onClickDelete: {
        type: Function,
        required: true,
      },
      onClickEdit: {
        type: Function,
        required: true,
      },
    },
    components: {
      TodoItem,
    },
    computed: {
      todos() {
        return this.ids.map(this.getTodoById)
      },
    },
  })
</script>
