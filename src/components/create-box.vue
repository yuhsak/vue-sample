<template>
  <section class="create-box">
    <input class="text-field" type="text" placeholder="タイトル" :value="title" @keyup="handleInputTitle" />
    <input class="text-field" type="text" placeholder="期限" :value="expiresAt" @keyup="handleInputExpiresAt" />
    <input class="text-field" type="text" placeholder="カテゴリ" :value="category" @keyup="handleInputCategory" />
    <button @click="handleClickAdd">追加</button>
  </section>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'CreateBox',
    props: {
      addTodo: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        title: null,
        expiresAt: null,
        category: null,
      }
    },
    methods: {
      handleInputTitle(event) {
        this.title = event.target.value
      },
      handleInputExpiresAt(event) {
        this.expiresAt = event.target.value
      },
      handleInputCategory(event) {
        this.category = event.target.value
      },
      handleClickAdd() {
        this.addTodo({
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
  .create-box {
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
  .create-box button {
    padding: 4px;
  }
</style>
