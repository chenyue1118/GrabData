const request = require('request')
const progress = require('progress-stream')
const fs = require('fs')
const path = require('path')

const ProgressBar  = require('./progress-bar')

class DownloadFile {
  constructor(data) {
    console.log(data)
    this.data = data
    this.pb = new ProgressBar('下载进度')
    this.str = progress({
      time: 1000
    })
    this.totalSize = 0
  }

  getDownload() {
    str.on('progress', (progress) => {
      pb.render({
        completed: progress.transferred ? progress.transferred : 0,
        total: this.totalSize
      })
    })
  }

}

module.exports = DownloadFile
