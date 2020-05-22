const express = require('express') //https://idjs.github.io/belajar-nodejs/expressjs/index.html untuk bisa akses method http request
const morgan = require('morgan') // untuk menampilkan request http pada terminal
const bodyParser = require('body-parser') // agar data yang diberikan dari front end ke backend dalam format yang proper (translate data dari frontend ke backend)
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors') // jika tidak menggunakan ini maka ketika melakukan http request(ex:POST) di client akan muncul error cors

dotenv.config()

const app = express()

mongoose.connect(
	process.env.DATABASE,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	err => {
		if(err)
			return console.log(err)
		console.log('connected to database')
	}
)

//middleware
app.use(morgan('dev')) // menampilkan logs http request pada terminal
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

//apis
const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const ownerRoutes = require('./routes/owner')

app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', ownerRoutes)

app.listen(3000, err => {
	if (err)
		return console.log(err)
	console.log('listening on port 3000')
})
