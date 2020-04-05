/*
  测试反向代理
*/
import React from 'react'
import axios from 'axios'

class TestProxy extends React.Component {
  state = {
    userInfo: ''
  }

  handleClick = () => {
    // 点击按钮时触发后台接口调用
    // axios.get('http://localhost:9999/data')
    // http://localhost:3000/api/data
    // http://localhost:3000/data
    axios.get('api/data')
      .then(res => {
        this.setState({
          userInfo: res.data.uname + '---' + res.data.age + '---' + res.data.gender
        })
      })
  }

  render () {
    const {userInfo} = this.state
    return (
      <div>
        <h1>测试反向代理</h1>
        <hr/>
        <div>{userInfo}</div>
        <div>
          <button onClick={this.handleClick}>点击</button>
        </div>
      </div>
    )
  }
}

export default TestProxy