const router = require('express').Router()
const Category = require('../models/category')

router.post('/categories', async(req, res) => {
	try{
		let category = new Category()
		category.type = req.body.type

		await category.save()
		res.json({
			status: true,
			message: 'Successfully saved'
		})
	}catch(err){
		res.status(500).json({
			status: false,
			message: err
		})
	}
})


router.get('/categories', async(req, res) => {
	try{
		let categories = await Category.find()
		res.json({
			success: true,
			categories: categories
		})
	}catch(err){
		res.status(500).json({
			status: false,
			message: err
		})
	}
})

module.exports = router
