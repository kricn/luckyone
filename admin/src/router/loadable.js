//懒加载

import Loadable from 'react-loadable'
import { Spin } from 'antd'

const loadingComponent = () => {
  return <div className={'spin-loading'} style={{
  	display: 'flex',
  	justifyContent: 'center',
  	alignItems: 'center',
  	height: '100%'
  }}>
    <div><Spin size="large" /></div>
  </div>;
};

export default (loader, loading=loadingComponent) => {
  return Loadable({
    loader,
    loading
  })
}