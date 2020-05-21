const express = require('express') //https://idjs.github.io/belajar-nodejs/expressjs/index.html untuk bisa akses method http request
const morgan = require('morgan') // untuk menampilkan request http pada terminal
const bodyParser = require('body-parser') // agar data yang diberikan dari front end ke backend dalam format yang proper (translate data dari frontend ke backend)

const app = express()

//middleware
app.use(morgan('dev')) // menampilkan logs http request pada terminal
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.json('running amazon-clone')
})

app.get('/', (req, res) => {
	console.log(req.body)
})

app.listen(3000, err => {
	if (err)
		return console.log(err)
	console.log('linstening on port 3000')
})
