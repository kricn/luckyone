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
  const { meta, children, ...route } = props
  //判断该路由是否需要登录
  //通过路由表里的meta字段里的auth判断是否需要权限
  if (meta && meta.auth) {
    //需要登录，判断其登录状态
    //没有登录就重定向到登录页面
    //或者给每个路由都可以指定重定向的路径
    return getToken() ? 
        <Route {...route} /> : 
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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
// 在菜单栏，其实直接用就行了，但像动态路由这种是不用显示的
// 这里也把动态路由过滤点
// 菜单的过滤和路由注册时的过滤是不一样的
// 注册出的路由数量要>=菜单显示的数量

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
        <PrivateRouter key={route.path} {...route} />
    })
  }

/* @/views/index/components/aside/index.js */
//过滤菜单路由入口，主要是显示，和隐藏动态路由，一般动态路由是详情或者编辑之类的
//过滤动态路由
  filterRoutes = routes => {
    return routes.filter(item => {
      return !item.path.includes(':')
    })
  }
//渲染菜单
  renderMenu = ({ meta, path, children }) => {
    if (!meta) {
      return false;
    }
    console.log(children)
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