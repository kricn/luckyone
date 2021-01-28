<template>
  <div class="container">
    <NuxtLink to="/">index</NuxtLink>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const data = await context.$axios.get('/article')
    return {
      list: data.data.data.list
    }
  },
  data() {
    return {
      list: []
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    color: red;
  }
}
</style>
