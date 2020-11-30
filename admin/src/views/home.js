import { Component, Fragment } from 'react';

import { Button } from 'antd'

class Home extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return  (
      <div className="home">
          <Button type="primary">click</Button>
      </div>
    )
  }
}

export default Home;
