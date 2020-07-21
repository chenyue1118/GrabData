const express = require('express')
const app = express()
const cheerio =require('cheerio')

const superagent = require('superagent')
require('superagent-proxy')(superagent)

const proxy = 'http://127.0.0.1:7078'

app.use('/gg', (req, res) => {
  // const url = 'http://==============/thread0806.php?fid=16'
  // const url = 'http://==============/htm_data/2007/16/4017673.html'
  // const url = 'https://==============/video/search?search=%E7%BE%8E%E5%A5%B3'
  // const url = 'https://==============/front/menu_livesex?segment=straight&token=MTU5NTM0Mzk0MpvsREwYODrb-FMAr4h1whwcNvhmgJLqIq587FVPoyx9v2Wqb_-hNqd3GV1SCLRT4T2feh91ZcxL7xyfYkeN9_8.?'
  superagent
    .get(url)
    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    .set('Host', '==============')
    .set('Referer', 'https://==============/video/search?search=%E7%BE%8E%E5%A5%B3')
    .set('Sec-Fetch-Dest', 'empty')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')
    .proxy(proxy)
    .end((err, response) => {
      if (err) {
        // console.log('err', err)
        res.send({ 'state': false, message: err })
      } else {
        // console.log('response', response)
        const $ = cheerio.load(response.text)
        let infos = [];
        $('.videoblock.videoBox').each((idx, element) => {
          const $element = $(element);
          console.log($element);
          const info = {
            // title: $element.find('.img.videoPreviewBg').find('.img').attr('title'),
            title: $element.find('.img.videoPreviewBg').attr('title'),
            key: element.attribs['_vkey'],
          };
          infos.push(info)
        });
        console.log(infos);
        res.send({ 'state': true, message: response.text })
        // res.send(response.text)
      }
    })
})

app.listen(6003, () => {
  console.log('Test Server at 6003')
})
