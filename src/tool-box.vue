<template>
  <section class="tool-box">
    <input class="text-field" type="text" placeholder="タイトル" :value="title" @keyup="onInputTitle" />
    <input class="text-field" type="text" placeholder="期限" :value="expiresAt" @keyup="onInputExpiresAt" />
    <input class="text-field" type="text" placeholder="カテゴリ" :value="category" @keyup="onInputCategory" />
    <button @click="onClickAdd">追加</button>
  </section>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'ToolBox',
    props: {
      addTodoItem: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        title: '',
        expiresAt: '',
        category: '',
      }
    },
    methods: {
      onInputTitle(event) {
        this.title = event.target.value
      },
      onInputExpiresAt(event) {
        this.expiresAt = event.target.value
      },
      onInputCategory(event) {
        this.category = event.target.value
      },
      onClickAdd() {
        this.addTodoItem({
          title: this.title,
          expiresAt: this.expiresAt,
          category: this.category,
        })
        this.title = ''
        this.expiresAt = ''
        this.category = ''
      },
    },
  })
</script>

<style scoped>
  .tool-box {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #ccc;
    height: 178px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .text-field {
    margin-bottom: 8px;
    font-size: 16px;
    padding: 4px;
  }
  .tool-box button {
    padding: 4px;
  }
</style>
