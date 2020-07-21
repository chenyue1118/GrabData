const request = require('request')

const fs = require('fs')
const path = require('path')

const fileUrl = 'https://www.bitahub.com/static/img/icon-fragment1-job.7af6c029.png'
const fileName = fileUrl.split('/').pop()
// const saveFile = `${__dirname}/downFile/${fileName}`
const saveFile = path.join(__dirname, `/downFile/${fileName}`)
// 测试路径错误时候的ERR
// const saveFile = path.resolve(`/downFile/${fileName}`)
console.log('当前存储文件路径', saveFile);
request(fileUrl)
  // .pipe(fs.createWriteStream(__dirname + '/downFile/doodle.png'))
  .pipe(fs.createWriteStream(saveFile))
  .on('finish', () => {
    console.log('status', '下载成功');
  })
  .on('error', (err) => {
    console.log('err', err);
  })
