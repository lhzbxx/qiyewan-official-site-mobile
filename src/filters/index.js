import dataApi from '../api/data'

export function cdnPrefix (value) {
  return 'http://cdn.qiyewan.com/' + value
}

export function totalPrice (checkout) {
  let amount = checkout.amount
  let member = checkout.member
  if (checkout.product.serialId.substr(4) === 'HR0003') {
    return member > 3 ? ((98 + 18.8 * (member - 3)) * amount).toFixed(2) : (98 * amount).toFixed(2)
  } else {
    return (amount * checkout.product.unitPrice).toFixed(2)
  }
}

export function dateFormat (timestamp) {
  let date = new Date(parseInt(timestamp))
  return date.getFullYear() + '/' + format(date.getMonth() + 1) + '/' + format(date.getDate()) + ' ' +
    (date.getHours() < 12 ? '上午' + date.getHours() : '下午' + (date.getHours() - 12)) +
    ':' + format(date.getMinutes()) + ':' + format(date.getSeconds())
}

export function timeFormat (timestamp) {
  timestamp /= 1000
  let hours = Math.floor(timestamp / 3600)
  timestamp %= 3600
  let minutes = Math.floor(timestamp / 60)
  let seconds = Math.floor(timestamp % 60)
  return hours + '时' + minutes + '分' + seconds + '秒'
}

export function regionFormat (regionCode) {
  let index = dataApi.regions.findIndex(item => item.code === regionCode)
  return index === -1 ? '上海' : dataApi.regions[index].name
}

function format (num) {
  return num > 10 ? num : '0' + num
}
