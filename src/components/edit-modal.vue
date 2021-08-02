<template>
  <div class="overlay" v-if="visible">
    <div class="content">
      <div class="input-container">
        <label for="title">タイトル</label>
        <input class="title text-field" type="text" :value="content.title" @keyup="handleChangeTitle" />
      </div>
      <div class="input-container">
        <label for="expiresAt">期限</label>
        <input class="expiresAt text-field" type="text" :value="content.expiresAt" @keyup="handleChangeExpiresAt" />
      </div>
      <div class="input-container">
        <label for="category">カテゴリ</label>
        <input class="category text-field" type="text" :value="content.category" @keyup="handleChangeCategory" />
      </div>
      <div class="button-wrapper">
        <button class="cancel-button" @click="close">閉じる</button>
        <button class="update-button" @click="save">更新</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'EditModal',
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      content: {
        type: Object,
        required: true,
      },
      close: {
        type: Function,
        required: true,
      },
      save: {
        type: Function,
        required: true,
      },
      onChangeTitle: {
        type: Function,
        required: true,
      },
      onChangeCategory: {
        type: Function,
        required: true,
      },
      onChangeExpiresAt: {
        type: Function,
        required: true,
      },
    },
    methods: {
      handleChangeTitle(e) {
        this.onChangeTitle(e.target.value)
      },
      handleChangeExpiresAt(e) {
        this.onChangeExpiresAt(e.target.value)
      },
      handleChangeCategory(e) {
        this.onChangeCategory(e.target.value)
      },
    },
  })
</script>

<style scoped>
  .overlay {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    z-index: 2;
    width: 50%;
    height: 50%;
    padding: 1em;
    background-color: #fff;
    position: relative;
  }

  .text-field {
    margin-bottom: 4px;
    font-size: 16px;
    padding: 4px;
    display: block;
  }

  .input-container label,
  .input-container input {
    display: inline-block;
  }

  .input-container label {
    width: 100px;
  }

  .button-wrapper {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  .cancel-button,
  .update-button {
    border-radius: 5px;
    width: 50px;
    display: inline-block;
    margin-right: 8px;
  }

  .update-button {
    background-color: rgb(100, 220, 70);
  }

  .cancel-button {
    background-color: rgb(220, 100, 70);
  }
</style>
