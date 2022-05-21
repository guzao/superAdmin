import { h, defineComponent, Component, resolveComponent } from 'vue'
export function UseElIcon(icon: string, color = 'inherit', size?: number | string): Component {
  return defineComponent({
    name: 'UseElIcon',
    render() {
      return h(resolveComponent('el-icon'), {
        color: color,
        size: size || ''
      }, () => [
        h('909')
      ])
    }
  })
}