const request = require('request')
const progress = require('progress-stream')
const ProgressBar  = require('./progress-bar')

const fs = require('fs')
const path = require('path')

let pb = new ProgressBar('下载进度')
let str = progress({
  time: 1000
})
let totalSize = 0

str.on('progress', (progress) => {
  pb.render({
    completed: progress.transferred ? progress.transferred : 0,
    total: totalSize
  })
  // console.log(progress)
  // console.log(`已下载${progress.transferred / 1024}kb`);
})

// const fileUrl = 'https://www.bitahub.com/static/img/icon-fragment1-job.7af6c029.png'
// const fileUrl = 'https://vdept.bdstatic.com/556e535943676c624e4454437259376b/5073447745573272/8398b36a5923b60485a9d41d7b84ea7bcaaddff71c3c44cd435975c120ae38f25acb4e254144ed8d60ac8b36b68250d2.mp4?auth_key=1596191725-0-0-fe7a0750d60ab3b144f32e670e609da0'
const fileUrl = 'https://atom-installer.github.com/v1.49.0/AtomSetup-x64.exe?s=1594405751&ext=.exe'
// const fileUrl = 'https://az764295.vo.msecnd.net/stable/91899dcef7b8110878ea59626991a18c8a6a1b3e/VSCodeUserSetup-x64-1.47.3.exe'
// const fileUrl = 'https://ffmpeg.org/releases/ffmpeg-snapshot.tar.bz2'
const fileName = fileUrl.split('?')[0].split('/').pop()
// const saveFile = `${__dirname}/downFile/${fileName}`
const saveFile = path.join(__dirname, `/downFile/${fileName}`)
// 测试路径错误时候的ERR
// const saveFile = path.resolve(`/downFile/${fileName}`)
console.log('当前存储文件路径', saveFile);
request(fileUrl)
  // .pipe(fs.createWriteStream(__dirname + '/downFile/doodle.png'))
  .on('response', (response) => {
    console.log(`文件大小：${response.headers['content-length'] / 1024 / 1024} M`)
    totalSize = response.headers['content-length']
    // fs.writeFile(path.join(__dirname, `/downFile/1.txt`), JSON.stringify(response), () => {})
  })
  .pipe(str)
  .pipe(fs.createWriteStream(saveFile))
  .on('finish', () => {
    console.log('status', '下载成功');
  })
  .on('error', (err) => {
    console.log('err', err);
  })
