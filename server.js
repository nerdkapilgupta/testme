const {exec} = require('child_process')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const prependhttp = require('prepend-http')
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.get('/brokenlinkchecker', (req, res) => {
  res.render('brokenlinkchecker', {title: 'brk check',info: ''})
})

app.post('/brokenlinkchecker', (req, res) => {
  var url = prependhttp(req.body.url)

  exec(`brkn ${url} --verbose`, (err, stdout, stderr) => {

    if (err) {
      res.send(err)
    }

    console.log(stdout)

    res.render('brokenlinkchecker', {title: 'brk check',info: stdout})
  })
})

app.listen(5000)