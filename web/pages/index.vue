<template>
  <div class="container">
    <div class="cover">
      <div id="scene" :style="{height:boxH}">
        <div class="layer" data-depth="0.2" :style="layerStyle">
          <img v-if="user.profile.access_cover_url" id="image" :style="imgStyle" :src="user.profile.access_cover_url" width="1920" height="1080">
          <img v-else id="image" :style="imgStyle" src="../assets/cover.png" width="1920" height="1080">
        </div>
      </div>
      <div class="mask" :style="`background-color: ${user.profile.color || '#ffc7c7'}; opacity: .5`"></div>
      <div class="post">
				<div class="time">{{time}}</div>
				<div class="title">{{user.profile.title}}</div>
				<div class="describe">{{user.profile.summary}}</div>
			</div>
    </div>
    <div class="content">
      <div class="article">
        <template v-for="item in list">
          <div :key="item.id" class="list">
            <div class="box">
              <div class="cover" :style="`background-image: url(${item.access_cover_url})`" />
              <div class="info">
                <div>
                  <div class="title">{{ item.title }}</div>
                  <div class="summary">{{item.summary}}</div>
                </div>
                <div class="detail">
                  <div class="time">{{articleTime(item.created_date)}}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <footer>
      也叫
    </footer>
  </div>
</template>

<script>
import Parallax from 'parallax-js'
import { format } from 'date-fns'
export default {
  async asyncData(context) {
    const [
      res1,
      res2,
      res3
    ] = await Promise.all([
      context.$axios.get('/user'),
      context.$axios.get('/article'),
      context.$axios.get('/article/tags')
    ])
    return {
      user: res1.data,
      list: res2.data.data.list,
      tags: res3.data.data.list
    }
  },
  data() {
    return {
      user: null,
      list: null,
      layerStyle: {},
      imgStyle: {},
      boxW: '100%', // 视口宽度
      boxH: '100%', // 视口高度
    }
  },
  computed: {
    time() {
      const year = format(new Date(this.user.profile.updated_date), 'yyyy') 
      const month = format(new Date(this.user.profile.updated_date), 'M')
      const day = format(new Date(this.user.profile.updated_date), 'dd')
      return `${month}月${day}日，${year}`
    },
    articleTime() {
      return time => {
        const year = format(new Date(time), 'yyyy') 
        const month = format(new Date(time), 'MM')
        const day = format(new Date(time), 'dd')
        return `${year}-${month}-${day}`
      }
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
      let _w = parseInt(this.boxW),  // 保留一份视口宽高
          _h = parseInt(this.boxH),
          x,  // 图片横向和纵向放大的大小
          y,
          i,  // 临时变量
          e = ( _w >= 1000 || _h >= 1000) ? 1000 : 500;  //图片宽高比率，计算图片放大
      if ( _w > _h) {  //视口宽>视口高
        i = _w / e * 50
        y = i
        x = i * _w / _h
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
    },
  },
  beforeRouteEnter(to,from,next){
		next(vm => {
			vm.init()
			window.onresize = () => vm.init()
		})
	},
  mounted() {
    const scene = document.getElementById('scene');
		const parallaxInstance = new Parallax(scene, {
			relativeInput: true,
			clipRelativeInput: true,
		})
  }
}
</script>

<style lang="scss" scoped>
.cover{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  #scene {
    /deep/#image {
      position: absolute;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(176, 14, 37, 0.7);
    clip-path: polygon(0 0, 25% 0, 60% 100%, 0% 100%);
  }
  .post{
    position: absolute;
    top: 54%;
    left: 10%;
    color: #fff;
    width: 30%;
    transform: translateY(-50%);
    .time{
      font-size: 14px;
    }
    .title{
      margin: 15px 0 30px;
      a{
        font-size: 28px;
        color: #fff;
        text-decoration: none;
        cursor: pointer;
        transition: all .3s;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .describe{
      line-height: 22px;
    }
  }
}
.content {
  padding: 24px 0;
  .article {
    max-width: 1200px;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    .list {
      width: 25%;
      padding: 8px;
      .box {
        background-color: #fff;
        padding: 10px;
        box-shadow: 0 3px 3px #888;
        border-radius: 6px;
        height: 320px;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        transition: transform ease .3s;
        &:hover{
          transform: translateY(-4px);
        }
        .cover {
          width: 100%;
          height: 200px;
          background-position: center;
          background-size: cover;
        }
        .info {
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          justify-content: space-between;
          .title {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            padding-top: 4px;
            font-weight: 600;
            font-size: 1.2em;
            padding: 4px 0;
          }
          .summary {
            color: #aaa;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1024px){
  .content {
    .article {
      padding: 0 12px;
      .list {
        width: 33.33%;
      }
    }
  }
}
@media screen and (max-width: 900px){
  .cover {
    .mask {
      clip-path: polygon(0 0, 220px 0, 700px 100%, 0% 100%);
    }
    .post{
      width: 40%;
      .title a{
        font-size: 22px;
      }
    }
  }
  .content {
    .article {
      .list {
        // width: 50%;
      }
    }
  }
}
@media screen and (max-width: 768px){
  .cover {
    .mask {
      clip-path: none;
      background: rgba(176, 14, 37, 0.35);
    }
    .post{
      bottom: 8%;
      left: 5%;
      top: auto;
      width: 70%;
      transform: none;
    }
  }
  .content {
    .article {
      .list {
        width: 50%;
      }
    }
  }
}
@media screen and (max-width: 480px){
  .post {
    .time{
      display: none;
    }
    .title{
      margin-bottom: 10px;
    }
    .describe{
      font-size: 13px;
      line-height: 20px;
    }
  }
  .content {
    .article {
      .list {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width: 375px){
  .content {
      .article {
        padding: 0 5px;
        .list {
          width: 100%;
          .cover {
            height: 170px;
          }
        }
      }
    }
}
</style>
