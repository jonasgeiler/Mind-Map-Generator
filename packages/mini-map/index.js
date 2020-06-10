import { registRender, registStore } from './lib/ux'
import render from './layout'
import store from './store'
import Views from './views'

registRender(render)
registStore(store)

export default {

  mount(el) {},

  initData () {},
}
