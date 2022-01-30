const express = require('express');
const router = express.Router();
const couponModel = require('../models/coupon');
const getData = require('./../getData/getData')

router.get('/:strart' , async (request, response) => {
    //const coupons = await couponModel.paginate({},{offset: 0, limit: parseInt(request.params.strart) + 20})
    try{
        const coupons = await couponModel.find().skip(parseInt(request.params.strart)).limit(20)
        response.send(coupons);
    }
    catch (error) {
        response.status(500).send(error);
    }
})

router.get('/' , async (_, response) => {
    const coupons = await couponModel.find();
    try{
        response.send(coupons);
    }
    catch (error) {
        response.status(500).send(error);
    }
})

router.post('/' , async (_, response) => {
    const couponsList = getData.createCoupons();
    try{
        couponsList.forEach(async coupon => {
            await new couponModel(coupon).save();
        });
        const coupons = await couponModel.find();
        response.send(coupons);
    }
    catch (error) {
        response.status(500).send(error);
    }
})

router.put('/:id' , async (request, response) => {
    try{
        const coupon = await couponModel.updateOne(
            {"_id": request.params.id},{$set:{
                "couponName": request.body.couponName,
                "type": request.body.type,
                "startDate":request.body.startDate,
                "endDate": request.body.endDate,
                "discountAmount": request.body.discountAmount,
                "userGroupName": request.body.discountAmount
            }});
        response.send(coupon);
    }
    catch (error) {
        response.status(500).send(error);
    }
})

router.delete('/:id' ,async (request, response) => {
    try{
        const coupon = await couponModel.deleteOne({"_id":request.params.id})
        response.send(coupon);
    }
    catch (error) {
        response.status(500).send(error);
    }
})

router.delete('/' , async (_, response) => {
    try{
        const coupon = await couponModel.deleteMany();
        response.send(coupon);
    }
    catch (error) {
        response.status(500).send(error);
    }
})


module.exports = router