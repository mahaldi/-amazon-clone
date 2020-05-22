const router = require('express').Router()
const Product = require('../models/product')
const upload = require('../middlewares/upload-photo')

router.post('/products', upload.single('photo'), async(req, res) => {
	try{
		let product = new Product()
		product.title = req.body.title
		product.ownerID = req.body.ownerID
		product.categoryID = req.body.categoryID
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
			status: true,
			products
		})
	}catch(err){
		res.status(500).json({
			status: false,
			message: err
		})
	}
})

router.get('/products/:id', async(req, res) => {
	try{
		let products = await Product.findOne({ _id: req.params.id })
		res.json({
			status: true,
			products
		})
	}catch(err){
		res.status(500).json({
			status: false,
			message: err
		})
	}
})

router.put('/products/:id', upload.single('photo'), async(req, res) => {
	try{
		let product = await Product.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					title: req.body.title,
					price: req.body.price,
					category: req.body.categoryID,
					photo: req.file.location,
					description: req.body.description,
					owner: req.body.ownerID,
					stockQuantity: req.body.stockQuantity
				}
			},
			{ upsert: true } // akan mengupdate object yang ada saja
		)
		res.json({
			status: true,
			updatedProduct: product // balikan datanya bukan yang terakhir di update, tapi data di mongo sudah terupdate
		})
	}catch(err){
		res.status(500).json({
			status: false,
			message: err
		})
	}
})

router.delete('/products/:id', async(req, res) => {
	try{
		let product = await Product.findOneAndDelete({ _id: req.params.id })

		if(product)
			res.json({
				status: true,
				message: 'Successfully deleted'
			})
	}catch(err) {
		res.status(500).json({
			status: false,
			message: err
		})
	}
})
module.exports = router;
