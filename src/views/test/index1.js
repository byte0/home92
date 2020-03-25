/*
  组件重用的一种方式：render-props
  与高阶组件的作用类似，都是用于代码的复用
*/
import React from 'react'

class AutoSizer extends React.Component {
  state = {
    width: 300,
    height: 300
  }

  render () {
    // children属性值是组件标签中间的内容（此时是函数）
    // const renderProps = this.props.children
    const renderProps = this.props.renderProps
    // 这里渲染的内容没有变化，依然是原始嵌套的组件 List
    return renderProps({
      width: this.state.width,
      height: this.state.height
    })
  }
}

class List extends React.Component {
  render () {
    const { width, height } = this.props
    return (
      <div>
        <div style={{width: width + 'px', height: height + 'px', background: 'orange'}}>List组件</div>
      </div>
    )
  }
}


class TestRenderProps extends React.Component {
  render () {
    return (
      <div>
        <h1>测试组件复用render-props</h1>
        <hr/>
        <AutoSizer renderProps={({width, height}) => {
          return <List width={width} height={height}/>
        }}/>
      </div>
    )
  }
}

export default TestRenderProps