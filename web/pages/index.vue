<template>
  <div class="container">
    <div class="title">{{list}}</div>
    <NuxtLink to="/about">About Page</NuxtLink>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const data = await context.$axios.get('/article')
    return {
      list: data.data.data.list,
    }
  },
  data() {
    return {
      list: [],
    }
  },
  mounted() {
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