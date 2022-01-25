const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")

const CouponSchema = mongoose.Schema({
    couponName: String,
    type: String, 
    startDate: Date,
    endDate: Date,
    discountAmount: Number,
    userGroupName: String

});

CouponSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Coupon', CouponSchema);
