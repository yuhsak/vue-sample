module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'ToDoList',
    },
  },
}
