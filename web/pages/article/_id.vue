<template>
  <div class="container">
    <div class="content">
      <p class="title">{{detail.title}}</p>
      <div class="info">
        <span class="time">{{time(detail.created_date)}}</span>
        <span class="view">阅读 {{detail.views}}</span>
        <div class="tags" v-if="detail.tags.length > 0">
          <template v-for="item in detail.tags">
            <span :key="item.id" class="tag">
              {{item.name}}
            </span>
          </template>
        </div>
      </div>
      <div class="text">
        <md-to-html :md="detail.content" />
      </div>
    </div>
  </div>
</template>
<script>
import { format } from 'date-fns'
import MdToHtml from '@/components/MdToHtml.vue'
export default {
  components: { MdToHtml },
  async asyncData(context) {
    const [res1] = await Promise.all([
      context.$axios.get(`/article/${context.params.id}}`)
    ])
    return {
      detail: res1.data.data
    }
  },
  data() {
    return {
      detail: null
    }
  },
  computed: {
    time() {
      return date => {
        const year = format(new Date(date), 'yyyy') 
        const month = format(new Date(date), 'MM')
        const day = format(new Date(date), 'dd')
        return `${month}月${day}日，${year}`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  min-height: 100%;
}
.content {
  max-width: 968px;
  margin: auto;
  background-color: #fff;
  padding: 12px;
  .title {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .tags {
    padding: 12px 0;
    .tag {
      background-color: #abcdef;
      padding: 1px 8px;
      border-radius: 12px;
      margin-right: 8px;
    }
  }
}
</style>