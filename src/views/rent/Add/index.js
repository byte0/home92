import React, { Component } from 'react'

import {
  Flex,
  List,
  InputItem,
  Picker,
  ImagePicker,
  TextareaItem,
  Modal,
  NavBar,
  Toast
} from 'antd-mobile'

import HousePackge from '../../../components/HousePackage'
import styles from './index.module.css'
import request from '../../../utils/request.js'
const alert = Modal.alert

// 房屋类型
const roomTypeData = [
  { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
  { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
  { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
  { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
  { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
]

// 朝向：
const orientedData = [
  { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
  { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
  { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
  { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
  { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
  { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
  { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
  { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
]

// 楼层
const floorData = [
  { label: '高楼层', value: 'FLOOR|1' },
  { label: '中楼层', value: 'FLOOR|2' },
  { label: '低楼层', value: 'FLOOR|3' }
]

export default class RentAdd extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // 临时图片地址
      tempSlides: [],

      // 小区的名称和id
      community: {
        name: '',
        id: ''
      },
      // 价格
      price: '',
      // 面积
      size: 0,
      // 房屋类型
      roomType: '',
      // 楼层
      floor: '',
      // 朝向：
      oriented: '',
      // 房屋标题
      title: '',
      // 房屋图片
      houseImg: '',
      // 房屋配套：
      supporting: '',
      // 房屋描述
      description: ''
    }
  }

  componentDidMount () {
    // 选择小区名称
    if (this.props.location.state) {
      this.setState({
        community: this.props.location.state
      })
    }
  }

  // 取消编辑，返回上一页
  onCancel = () => {
    alert('提示', '放弃发布房源?', [
      {
        text: '放弃',
        onPress: async () => this.props.history.go(-1)
      },
      {
        text: '继续编辑'
      }
    ])
  }

  handleItem = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  addHouse = async () => {
    // 提交表单
    // 上传图片
    const {
      tempSlides,
      title,
      description,
      oriented,
      supporting,
      price,
      roomType,
      size,
      floor,
      community
    } = this.state
    if (tempSlides.length <= 0) {
      Toast.info('请选择图片', 1)
    }
    // 图片上传
    const form = new FormData()
    tempSlides.forEach(item => {
      form.append('file', item.file)
    })
    const res = await request({
      method: 'post',
      url: 'houses/image',
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    const houseImg = res.body.join('|')
    const formRes = await request({
      method: 'post',
      url: 'user/houses',
      data: {
        houseImg,
        title,
        description,
        oriented: oriented[0],
        supporting,
        price,
        roomType:roomType[0],
        size,
        floor: floor[0],
        community: community.id
      }
    })
    if (formRes.status === 200) {
      // 发布成功，跳转到列表页面
      this.props.history.push('/rent')
    }
  }

  handleImgs = (files, type, index) => {
    // 处理图片的选择
    console.log(files, type, index)
    this.setState({
      tempSlides: files
    })
  }

  render() {
    const Item = List.Item
    const { history } = this.props
    const {
      community,
      price,
      size,
      roomType,
      floor,
      oriented,
      description,
      tempSlides,
      title
    } = this.state
    return (
      <div className={styles.root}>
        <NavBar
          className={styles.navHeader}
          mode="dark"
          onLeftClick={this.onCancel}
        >
          发布房源
        </NavBar>
        <List
          className={styles.header}
          renderHeader={() => '房源信息'}
          data-role="rent-list"
        >
          {/* 选择所在小区 */}
          <Item
            extra={community.name || '请输入小区名称'}
            arrow="horizontal"
            onClick={() => {
              // 控制路由跳转
              history.replace('/rent/search')
            }}
          >
            小区名称
          </Item>
          <InputItem placeholder="请输入租金/月" extra="￥/月" onChange={(value) => {
            this.handleItem('price', value)
          }} value={price}>
            租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金
          </InputItem>
          <InputItem placeholder="请输入建筑面积" extra="㎡" onChange={(value) => {
            this.handleItem('size', value)
          }} value={size}>
            建筑面积
          </InputItem>
          <Picker onChange={(value) => {
            this.handleItem('roomType', value)
          }} extra='请选择户型' data={roomTypeData} value={roomType} cols={1}>
            <Item arrow="horizontal">
              户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型
            </Item>
          </Picker>
          <Picker onChange={(value) => {
            this.handleItem('floor', value)
          }} data={floorData} value={floor} cols={1}>
            <Item arrow="horizontal">所在楼层</Item>
          </Picker>
          <Picker onChange={(value) => {
            this.handleItem('oriented', value)
          }} data={orientedData} value={oriented} cols={1}>
            <Item arrow="horizontal">
              朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向
            </Item>
          </Picker>
        </List>

        <List
          className={styles.title}
          renderHeader={() => '房屋标题'}
          data-role="rent-list"
        >
          <InputItem
            placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
            value={title}
            onChange={(value) => {
              this.handleItem('title', value)
            }}
          />
        </List>

        <List
          className={styles.pics}
          renderHeader={() => '房屋图像'}
          data-role="rent-list"
        >
          <ImagePicker
            files={tempSlides}
            onChange={this.handleImgs}
            multiple={true}
            className={styles.imgpicker}
          />
        </List>

        <List
          className={styles.supporting}
          renderHeader={() => '房屋配置'}
          data-role="rent-list"
        >
          {/*子组件向父组件传值*/}
          <HousePackge select onSelect={(value) => {
            this.setState({
              supporting: value.join('|')
            })
          }}/>
        </List>

        <List
          className={styles.desc}
          renderHeader={() => '房屋描述'}
          data-role="rent-list"
        >
          <TextareaItem
            rows={5}
            placeholder="请输入房屋描述信息"
            autoHeight
            value={description}
            onChange={(value) => {
              this.handleItem('description', value)
            }}
          />
        </List>

        <Flex className={styles.bottom}>
          <Flex.Item className={styles.cancel} onClick={this.onCancel}>
            取消
          </Flex.Item>
          <Flex.Item className={styles.confirm} onClick={this.addHouse}>
            提交
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}
