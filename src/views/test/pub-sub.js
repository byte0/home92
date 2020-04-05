/*
  非父子组件之间数据传递
*/
import React from 'react'
// events是Node.js的核心模块
const EventEmitter = require('events')
const hub = new EventEmitter()

class Tom extends React.Component {
  state = {
    msg: 'hello'
  }

  componentDidMount () {
    hub.on('receive-info', (info) => {
      this.setState({
        msg: this.state.msg + ':' + info
      })
    })
  }
  
  handleClick = () => {
    hub.emit('receive-msg', 'Tom')
  }

  render () {
    return (
      <div>
        <h2>Tom:</h2>
        <span>{this.state.msg}</span>
        <button onClick={this.handleClick}>点击</button>
      </div>
    )
  }
}

class Jerry extends React.Component {
  state = {
    info: 'nihao'
  }

  componentDidMount () {
    hub.on('receive-msg', (msg) => {
      // console.log(msg)
      this.setState({
        info: this.state.info + ':' + msg
      })
    })
  }

  handleClick = () => {
    hub.emit('receive-info', 'Jerry')
  }

  render () {
    return (
      <div>
        <h2>Jerry:</h2>
        <span>{this.state.info}</span>
        <button onClick={this.handleClick}>点击</button>
      </div>
    )
  }
}

class TestPubSub extends React.Component {
  render () {
    return (
      <div>
        <h1>测试非父子组件之间数据传递</h1>
        <hr/>
        <Tom/>
        <hr/>
        <Jerry/>
      </div>
    )
  }
}

export default TestPubSub