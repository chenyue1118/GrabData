const request = require('request')

const fs = require('fs')
const path = require('path')

const fileUrl = 'https://www.bitahub.com/static/img/icon-fragment1-job.7af6c029.png'
const fileName = fileUrl.split('/').pop()
// const saveFile = `${__dirname}/downFile/${fileName}`
const saveFile = path.join(__dirname, `/downFile/${fileName}`)
console.log(saveFile);
request(fileUrl)
  // .pipe(fs.createWriteStream(__dirname + '/downFile/doodle.png'))
  .pipe(fs.createWriteStream(saveFile))
  .on('finish', () => {
    console.log(11111111111111111111);
  })
