const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // await page.goto('http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2016/11.html');
  // await page.goto('https://checklyhq.com/')
  // const imageHref = await page.evaluate((sel) => {
  //   return document.querySelector(sel).getAttribute('src').replace('/', '')
  // }, '.hero-image')
  // console.log(imageHref);


  await page.goto('https://es6.ruanyifeng.com/', { waitUntil: 'networkidle2' })
  // .fragment1 .title
  const imageHref = await page.evaluate(() => {
    // return document.querySelector('#sidebar ol li')
    let str = []
    const list = [...document.querySelectorAll('#sidebar ol li')];
    list.forEach(el => {
      // str += el.childNodes[0].hash;
      str.push(el.childNodes[0].hash)
    })
    // document.querySelector('#sidebar').remove();
    return str
  })
  console.log(imageHref);
  console.log(imageHref.length);

  // const imageHref = await page.evaluate((sel) => {
  //   return document.querySelector(sel).innerHTML
  // }, '.fragment1 .title')
  // console.log(imageHref);



  // await page.waitFor(3000);
  await page.screenshot({path: 'example.png'});

  await browser.close();
  console.log('访问结束');
})();
