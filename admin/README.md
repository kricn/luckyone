# 

## react-router-dom的使用和鉴权判断
### 第一层入口判断
App.js作为主入口，同样也作为第一层路由匹配的地方，路径/即是App.js里的内容。\
引入react-router-dom，解构需要的类。
```javascript
//BrowserRouter是路由模式，相当于vue-router里的mode，还有一个HashRouter
//Redirect 重定向路由
//Switch 若路由匹配成功，则只匹配一个路由，这样就不会出现多个路由一起匹配
//Route 高阶组件，这个才是生成路由的组件，不过在App.js里没有用到
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
```
由于第一层路由就开始有权限的校验，但Route路由并没有校验功能，所以需要封装一个路由的高阶组件
```javascript
//校验路由的高阶组件
/* /src/components/privateRouter.js */
import React from 'react'
import { Redirect, Route} from 'react-router-dom'

//获取token，这里只判断登录状态即可
//登录之后再通过角色去过滤路由
//获取token方法
import { getToken } from '@/utils/session.js'

//由于没有state，生命周期等，所以写成无状态组件
//直接接收一整个路由表
const  PrivateRouter = (props) => {
  //尽管没用到children, 但先解构出来，剩下的属性
  //才是符合Route的属性，不然会报错
  const { isAuth, meta, children, ...route } = props
  //判断该路由是否需要登录
  //通过路由表里的meta字段里的auth判断是否需要权限
  if (meta && meta.auth) {
    //需要登录，判断其登录状态
    //没有登录就重定向到登录页面
    //或者给每个路由都可以指定重定向的路径
    return getToken() ? 
        isAuth === '1' ?
        <Route {...route} /> : 
        <Redirect to="/login" /> : 
        <Redirect to="/login" />
  } else {
    //不用登录的，直接返回，路由表上对应那条的属性赋值给Route
  	return <Route {...route} />
  }
}

export default PrivateRouter;
```
在App.js里引入PrivateRouter组件
```javascript
import { Component, Fragment } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

//路由高阶组件
import PrivateRouter from './components/praviteRouter'
//路由表
import router from '@/router/index'
//引入redux的store
import store from '@/store'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //定义一个登录的状态，因为有token不一定是登录
      //同时这个状态改变可以让路由跳转（不是刷新页面的那种跳转）
      //与location.href是有区别的
      //区别在于，路由跳转之前的提示信息可以显示在下一个页面
      //而location.href不会
      //sessionStorage存的是字符串
      isAuth: sessionStorage.getItem('isAuth') || '0'
    }
  }

  //订阅store里的state
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        isAuth: store.getState().appReducer.isAuth
      })
    })
  }
  componentWillUnmount() {
      if(this.unsubscribe) {
          this.unsubscribe()
      }
  }

  render() {
    return  (
      <Fragment>
        <BrowserRouter>
        {/* 这里要包一层Switch组件 */}
          <Switch>
            {
              router.map((route, index) => {
                return <PrivateRouter
                  isAuth={this.state.isAuth}
                  key={index}
                  {...route}
                />
              })
            }
          </Switch>
        </BrowserRouter>
      </Fragment>
    )
  }
}
export default App;
```
此时，未登录（没有token）的用户会被重定向到登录页
### 第二层子路由判断
在主入口布局，一般是在 / 有个整体布局，也可以给路由加个前缀，只要把 / 重定向到那缀那里就行
```javascript
/* 根路由表 @/router/index.js */
/* 菜单路由表 @/router/menu.js */
// 一共有两个地址要处理路由
// 一个是整体布局路由注册时需要过滤路由，如果有角色权限的话
// 没有角色权限就不用处理，直接全部注册就好
// 将注册好的路由表作为参数传给菜单栏，省的二次过滤
// 注意：这里传过来的路由表是一个数组，是引用数据类型
// 如果直接过滤，可能会把需要注册的路由也一并过滤掉
// 所以需要深克隆一个路由表
// 在菜单栏，其实直接用就行了，但像动态路由这种是不用显示的
// 这里也把动态路由过滤点
// 菜单的过滤和路由注册时的过滤是不一样的
// 注册出的路由数量要>=菜单显示的数量


// 这里记得也要定义一个isAuth属性，不然会一直重定向


/* @/views/index/index.js */
//过滤路由注册方法
//过滤路由注册
//主要看该角色有没有权限
  filterRoutes = routes => {
    const role = getRole('role')
    return routes.filter(item => {
      return !item.meta || !item.meta.role || item.meta.role.indexOf(role) !== -1
    })
  }
//渲染路由方法
//定义成一个函数是可能有子菜单，可以进行递归
//参数是以数组的形式传入，最后以数组形式返回
renderRoutes = routes => {
    return routes.map(route => {
      return route.children && route.children.length > 0 ?
        this.renderRoutes(route.children) :
        <PrivateRouter isAuth={this.state.isAuth} key={route.path} {...route} />
    })
  }

/* @/views/index/components/aside/index.js */
//过滤菜单路由入口，主要是显示，和隐藏动态路由，一般动态路由是详情或者编辑之类的
//过滤动态路由和不显示路由
  filterRoutes = routes => {
    return routes.filter(item => {
      if (item.children && item.children.length > 0) {
        item.children = this.filterRoutes(item.children)
      }
      return !(item.meta && item.meta.noMenu) && !item.path.includes(':')
    })
  }
//渲染菜单
  renderMenu = ({ meta, path, children }) => {
    if (!meta) {
      return false;
    }
    return children && children.length > 0 ? 
      (
        <SubMenu key={path} title={meta.title} icon={React.createElement(meta.icon)}>
          {
            //此处知道最多是两层，便不写递归
            //需要的话，在此处判断后开始递归
            children.map(i => {
              return (<Menu.Item key={i.path}>
                <Link to={i.path}>{i.meta.title}</Link>
              </Menu.Item>)
            })
          }
        </SubMenu>
      )
      : 
      (
        <Menu.Item key={path} icon={React.createElement(meta.icon)}>
          <Link to={path}>{meta.title}</Link>
        </Menu.Item>
      )
  }
```
## redux的使用
redux和vuex一样，都是一个状态管理仓库，react中只允许有一个store，但是可以有多个reducer\
redux 通过注入组件，在组件中，组件通过dispatch促发reducer的action, reducer更新state的状态\
最后组件通过订阅sotre而得知state发生变化，从而重新渲染进行更新
** 不要为了用redux而用redux **
```shell
# 引入redux react-redux redux-promise redux-logger redux-thunk
# redux-logger 是调试用的，方便查看store状态变化
# redux-thunk 处理异步变化，redux-promise 处理promise变化
npm install redux react-redux redux-promise redux-thunk --save
npm install redux-logger --save-dev
```
新建store文件夹，在其目录下新建index.js文件
```javascript
// @/store/index.js
import { applyMiddleware, combineReducers, createStore } from 'redux';
import appReducer from '@/app.reducer.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rdPromise from 'redux-promise';

const countReducer = (state = 0, action) => {
    const {type, payload} = action
    switch(type) {
        case 'ADD':
            return state + payload;
        case 'MINUS':
            return state - payload;
        default:
            return state
    }
}

const totalReducer = {
    countReducer
}

const store = createStore(
    //用于合并所有的reducer
    combineReducers(totalReducer),
    applyMiddleware(thunk, logger, rdPromise)
)

export default store
```
在src目录下的index.js中全局注入
```javascript
// @/index.js
import { Provider } from 'react-redux'
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```
之后在其他组件引入store，通过getState获取store的值\
通过store.dispatch({type: 'ADD', payload: 1})的形式去调用reducer的动作
```javascript
// @/views/Home/index.js
import React, { Component, Fragment } from 'react'
import store from '@/store'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    //订阅store，state有更新则会促发
    this.unsubscribe = store.subscribe(() => {
        //这里使用强制刷新，也可以用this.setState刷新需要的值
        this.forceUpdate()
    })
  }
  componentWillUnmount() {
    // 这里要变为 null, 不然组件间跳转时异步操作没有完成
    // 更新 state 的状态会报错
      this.setState = () => null
  }

  add = () => {
    //通过dispatch促发reducer里的action
    store.dispatch({type: 'ADD', payload: 1})
  }

  del = () => {
    store.dispatch({type: 'MINUS', payload: 1})
  }

  render() {
    return (
      <>
        统计
        <div>
          {/*
            获取state的值
            获取到的是一个对象
            对象的key值是store里通过combineReducers时的对象的key，
            值就是reducer里的state
          */}
          {store.getState().countReducer}
        </div>
        <button onClick={this.add}>+</button>
        <button onClick={this.del}>-</button>
      </>
    )
  }
}

export default Home;
```
## css 或 scss 样式隔离和全局样式
### css 或 scss 样式隔离
通过脚手架建立的react项目，运行 npm run eject 暴露出 config 文件夹\
在 /config/webpack.config.js 里已经配置好了 scss 模块化的配置，大概在\
529行或搜索 sassModuleRegex, 这里只需要安装好 style-loader, css-loader, sass-loader,\
接着将 scss 文件命名为 xxx.module.scss 即可
```scss
// 引入该 scss 文件的组件中用到该类后会生成唯一的类名
.container {
  width: 100%;
  // 通过global修饰后，.box 的类名不会做任何变动
  // 一般用来修改第三方组件的样式
  :global(.box) {
    width: 100%;
  }
}
```
在组件里使用
```javascript
import style from '@/xxx/index.module.scss'
export default function () {
  return (
    <div className={style.container}>
      <div className={style.box}>box</div>
    </div>
  )
}
```
### 全局样式配置
安装 sass-resources-loader
找到 test: sassRegex, 大概在502行，在 getStyleLoaders() 后 concat 上配置
```javascript
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
    },
    'sass-loader'
  ).concat({  //此处
    loader: 'sass-resources-loader',
    options: {
      resources: [
        path.resolve(__dirname, './../src/styles/main.scss')
      ]
    }
  }),
  sideEffects: true,
},
```
