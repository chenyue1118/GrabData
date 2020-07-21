const express =require('express')

const app = express()

app.use(express.static('./public'))

app.listen(6001, () => {
  console.log('Serve at 6001');
})
