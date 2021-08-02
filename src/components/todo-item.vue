<template>
  <div class="todo-item">
    <button class="delete-button" @click="onClickDelete(content._id)">×</button>
    <button class="edit-button" @click="onClickEdit(content._id)">編集</button>
    <h2>{{ content.title }}</h2>
    <p v-if="content.expiresAt">{{ content.expiresAt }}まで</p>
    <p v-if="content.category">{{ content.category }}</p>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'TodoItem',
    props: {
      content: {
        type: Object,
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
  })
</script>

<style scoped>
  .todo-item {
    border-radius: 4px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    padding: 8px;
    margin-bottom: 8px;
    position: relative;
  }
  .todo-item .delete-button {
    position: absolute;
    right: 72px;
    top: 8px;
    width: 28px;
    height: 28px;
  }
  .todo-item .edit-button {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 56px;
    height: 28px;
  }
</style>
