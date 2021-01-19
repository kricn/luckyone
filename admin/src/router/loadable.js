//懒加载

import Loadable from 'react-loadable'
import { Spin } from 'antd'

const loadingComponent = () => {
  return <div className={'spin-loading'} style={{
  	display: 'flex',
  	justifyContent: 'center',
  	alignItems: 'center',
  	height: '100vh'
  }}>
    <div><Spin /></div>
  </div>;
};

export default function LazyLoad(loader, loading=loadingComponent) {
  return Loadable({
    loader,
    loading
  })
}