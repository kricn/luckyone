import { Component } from 'react';
import { Switch } from 'react-router';

//菜单路由
import menu from '../../router/menu.js'

//自定义组件
import PrivateRouter from '../praviteRouter'

class ContainerMain extends Component {
  constructor() {
    super()
    this.state = {}
  }

  renderRoute = ({path, component}) => {
    return <PrivateRouter exact path={path} component={component} key={path} />
  }

  render() {
    return  (
      <Switch>
        {
          menu && menu.map(item => {
            return this.renderRoute(item)
          })
        }
      </Switch>
    )
  }
}

export default ContainerMain;
