import React, { Component, Fragment } from 'react'

//组件
import AsideMenu from '../../../../components/asideMenu'

import './index.scss'
import logo from '../../../../image/yz.jpg'

class Aside extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Fragment>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <AsideMenu />
      </Fragment>
    )
  }
}

export default Aside;