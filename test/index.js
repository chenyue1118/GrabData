const express = require('express')
const app = express()

const superagent = require('superagent')
require('superagent-proxy')(superagent)

const proxy = 'http://127.0.0.1:53866'

app.use('/gg', (req, res) => {
  const url = 'https://www.google.com/'
  superagent
    .get(url)
    .proxy(proxy)
    .end((err, response) => {
      if (err) {
        console.log('err', err)
        res.send({ 'state': false, message: err })
      } else {
        console.log('response', response)
        res.send({ 'state': true, message: response })
      }
    })
})

app.listen(6003, () => {
  console.log('Test Server at 6003')
})
