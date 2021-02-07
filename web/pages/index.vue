<template>
  <div class="container">
    <div class="cover">
      <div id="scene" :style="{height:boxH}">
        <div class="layer" data-depth="0.4" :style="layerStyle">
          <img id="image" :style="imgStyle" src="../assets/cover.png" width="1920" height="1080">
        </div>
      </div>
    </div>
    <NuxtLink to="/about">About Page</NuxtLink>
  </div>
</template>

<script>
import Parallax from 'parallax-js'
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
      layerStyle: {},
      imgStyle: {},
      boxW: '100%', // 视口宽度
      boxH: '100%', // 视口高度
    }
  },
  methods: {
    init(){
      //初始化高度
			this.boxH = document.documentElement.clientHeight + 'px';
			this.boxW = document.documentElement.clientWidth + 'px';
			this.coverLayer()
    },
    coverLayer() {
      let scene = document.getElementById('scene'),  // 获取承载图片容器
          _w = parseInt(this.boxW),  // 保留一份视口宽高
          _h = parseInt(this.boxH),
          x,  // 图片横向和纵向放大的大小
          y,
          i,  // 临时变量
          e = ( _w >= 1000 || _h >= 1000) ? 1000 : 500;  //图片宽高比率，计算图片放大
      if ( _w > _h) {  //视口宽>视口高
        i = _w / e * 50
        y = i
        i = i * _w / _h
      } else {
        i = _h / e * 50;
        x = i;
        y = i * _h / _w;
      }
      const style = {
        width: _w + x + 'px',
        height: _h + y + 'px',
        marginLeft: - 0.5 * x + 'px',
        marginTop: - 0.5 * y + 'px'
      }
      this.layerStyle = Object.assign({}, this.layerStyle, style)
      console.log(this.layerStyle)
      this.coverImg()
    },
    coverImg() {
      const width = parseInt(this.layerStyle.width), //承载图片容器的宽高
          height = parseInt(this.layerStyle.height),
				  ratio = 1080 / 1920, //高宽比
				  style = {};
      const compute = height / width > ratio; //图片形状和容器形状比较， true为容器为竖直矩形

      style['width'] = compute ? (height / ratio + 'px') : `${width}px`;  //调整图片宽高
			style['height'] = compute ? `${height}px` : (width * ratio + 'px');

			style['left'] = (width - parseInt(style.width)) / 2 +'px';  //图片一定的偏移量，防止动的时候出现空白
			style['top'] = (height - parseInt(style.height)) / 2 +'px';

      this.imgStyle = Object.assign({}, this.imgStyle, style);
      console.log(this.imgStyle)
    }
  },
  beforeRouteEnter(to,from,next){
		next(vm => {
			vm.init()
			window.onresize = () => vm.init
		})
	},
  mounted() {
    // const scene = document.getElementById('scene');
		// const parallaxInstance = new Parallax(scene, {
		// 	relativeInput: true,
		// 	clipRelativeInput: true,
		// })
  }
}
</script>

<style lang="scss" scoped>
.container {
  .cover{
    width: 100%;
    height: 100vh;
  }
}
</style>
