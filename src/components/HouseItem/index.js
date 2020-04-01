import React from 'react'
import { BASE_IMG_URL } from '../../utils/config.js'
import PropTypes from 'prop-types'
import styles from './index.module.css'

function HouseItem({ houseImg, title, desc, tags, price, onClick, style }) {
  return (
    <div className={styles.house} onClick={onClick} style={style}>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={BASE_IMG_URL + houseImg} alt="" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.desc}>{desc}</div>
        <div>
          {/* ['近地铁', '随时看房'] */}
          {tags && tags.map((tag, index) => {
            const tagClass = 'tag' + (index + 1)
            return (
              <span
                className={[styles.tag, styles[tagClass]].join(' ')}
                key={tag}
              >
                {tag}
              </span>
            )
          })}
        </div>
        <div className={styles.price}>
          <span className={styles.priceNum}>{price}</span> 元/月
        </div>
      </div>
    </div>
  )
}

// 对组件的传入的属性进行类型检测
// 如果传入的属性值，不符合验证规则，就进行警告
HouseItem.propTypes = {
  // src: PropTypes.string.isRequired
  title: PropTypes.string,
  desc: PropTypes.string,
  tags: PropTypes.array,
  price: PropTypes.number
  // onClick: PropTypes.func
}

export default HouseItem
