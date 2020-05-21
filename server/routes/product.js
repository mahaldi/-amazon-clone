const router = require('express').Router()
const Product = require('../models/product')
const upload = require('../middlewares/upload-photo')

router.post('/products', upload.single('photo'), async(req, res) => {
	try{
		let product = new Product()
		product.title = req.body.title
		product.description = req.body.description
		product.photo = req.file.location
		product.price = req.body.price
		product.stockQuantity = req.body.stockQuantity
		await product.save()
		res.json({
			status: true,
			message: 'Successfully saved'
		})

	}catch(err) {
		res.status(500).json({
			status: false,
			message: err
		})
	}
})

router.get('/products', async(req, res) => {
	try{
		let products = await Product.find()
		res.json({
			success: true,
			products
		})
	}catch(err){
		res.status(500).json({
			status: false,
			message: err
		})
	}
})
module.exports = router;
