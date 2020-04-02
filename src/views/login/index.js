import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import styles from './index.module.css'
import request from '../../utils/request.js'
import { withFormik } from 'formik'
import * as yup from 'yup'

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,9}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

// function Form (props) {
//   return (
//     <div>
//       <div>测试withFormic</div>
//       <div>{props.msg}</div>
//       <div>{props.info}</div>
//       <div>{props.username}</div>
//       <div>{props.password}</div>
//     </div>
//   )
// }

// function withForm (obj) {
//   const ret = obj.foo()
//   // 本质上返回的这个函数才是高阶组件HOC
//   return function (Component) {
//     return class extends React.Component {
//       render () {
//         return (
//           <Component {...obj} {...ret}/>
//         )
//       }
//     }
//   }
// }

// withForm的作用：将参数（对象）注入到Form组件中
// const WrapForm = withForm({
//   msg: 'nihao',
//   info: 'hello',
//   foo: () => ({username: 'lisi', password: '123'})
// })(Form)

class Login extends Component {

  // state = {
  //   username: '',
  //   password: ''
  // }

  // handleItem = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  // handleSubmit = async (e) => {
  //   // 禁止默认的表单提交
  //   e.preventDefault()
  //   const res = await request({
  //     url: '/user/login',
  //     method: 'post',
  //     data: {
  //       username: this.state.username,
  //       password: this.state.password
  //     }
  //   })
  //   if (res.status === 200) {
  //     // 登录成功，缓存token，跳转到主页
  //     sessionStorage.setItem('mytoken', res.body.token)
  //     this.props.history.push('/home')
  //   } else {
  //     // 登录失败，进行提示
  //     Toast.info(res.description)
  //   }
  // }

  render() {
    // const { username, password } = this.state
    const {
      // 表单输入域的状态
      values,
      // 表单提交的事件
      handleSubmit,
      // 表单输入域监听事件
      handleChange,
      // 验证的错误提示
      errors,
      // 输入域是否被操作过
      touched,
      // 输入域验证触发的条件
      handleBlur
    } = this.props
    return (
      <div className={styles.root}>
        {/*<WrapForm/>*/}
        {/* 顶部导航 */}
        <NavBar className={styles.navHeader} mode="dark">
          账号登录
        </NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="username"
                onBlur={handleBlur}
                value={values.username}
                onChange={handleChange}
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {touched.username && errors.username && <div className={styles.error}>{errors.username}</div>}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="password"
                value={values.password}
                onChange={handleChange}
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {touched.password && errors.password && <div className={styles.error}>{errors.password}</div>}
            <div className={styles.formSubmit}>
              <button onClick={handleSubmit} className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

// export default Login
// withFormik作用：向Login组件注入props
export default withFormik({
  // 提供表单输入域状态
  mapPropsToValues: () => ({username:'', password: ''}),
  // 实现表单验证
  // validate: (values) => {
  //   // 参数values表示表单的数据
  //   const errors = {}
    
  //   if (!values.username) {
  //     // 用户名是否为空
  //     errors.username = '用户名不能为空'
  //   } else if (!REG_UNAME.test(values.username)) {
  //     errors.username = '用户名必须为5-8位的字符串'
  //   }

  //   if (!values.password) {
  //     // 密码不能为空
  //     errors.password = '密码不能为空'
  //   } else if (!REG_PWD.test(values.password)) {
  //     errors.password = '密码必须为5-12位的字符串'
  //   }

  //   return errors
  // },
  validationSchema: yup.object().shape({
    username: yup.string().required('用户名不能为空').matches(REG_UNAME, '用户名必须为5-8位的字符串'),
    password: yup.string().required('密码不能为空').matches(REG_PWD, '密码必须为5-12位的字符串')
  }),
  // 表单提交的动作
  handleSubmit: async (values, login) => {
    // 参数values其实就是表单输入的最新数据
    // 参数login表示组件的实例对象
    // console.log(values)
    // 这里用于实现登录功能
    const res = await request({
      url: '/user/login',
      method: 'post',
      data: {
        username: values.username,
        password: values.password
      }
    })
    if (res.status === 200) {
      // 登录成功，缓存token，跳转到主页
      sessionStorage.setItem('mytoken', res.body.token)
      login.props.history.push('/home')
    } else {
      // 登录失败，进行提示
      Toast.info(res.description)
    }
  }
})(Login)
