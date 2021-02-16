<template lang="html">
  <div id="content" class="markdown-body" v-html="content"></div>
</template>

<script>
import 'highlight.js/styles/lioshi.css'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const toHtml = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})

export default {
  name: 'MdToHtml',
  props: ['md'],
  data(){
    return {

    }
  },
  computed: {
    content(){
      return toHtml.render(this.md)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/markdown.scss';
</style>
