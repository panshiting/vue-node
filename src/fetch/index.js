import fetch from './fetch'

const url = ''
const services = {
  login: data => fetch(url + '/app/access/login', data)
}

export default services
