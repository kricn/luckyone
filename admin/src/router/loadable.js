//懒加载

import Loadable from 'react-loadable'
import { Spin } from 'antd'

const loadingComponent = () => {
  return <div className={'spin-loading'}>
    <div><Spin size="large" /></div>
  </div>;
};

export default (loader, loading=loadingComponent) => {
  return Loadable({
    loader,
    loading
  })
}