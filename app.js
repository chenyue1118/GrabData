const express =require('express')
const app = express()

const mulrer = ({ dst: '/'})
app.use(express.static('./upload'))

app.use('/userInfo', (req, res) => {
  console.log(req,file);
  send(1)
})

app.listen(6001, () => {
  console.log('Serve at 6001');
})
