let mongoose = require('mongoose');

let objSchema = new mongoose.Schema({
    code: String,
    date: Date,
    salesman: String,
    sub_total: Number,
    tax_amount: Number,
    tax_percentage: Number,
    discount_amount: Number,
    discount_percentage: Number,
    total_discount: Number,
    grand_total: Number,
    // sales_details: [],
    created_by: String,
    created_at: Date,
    updated_by: String,
    updated_at: Date,
    deleted_by: String,
    deleted_at: Date,
    is_deleted: Boolean
});

objSchema.pre('save',  function(next) { 
    this.created_at = Date.now();
    this.created_by = 'SUPER ADMIN';
    this.updated_at = Date.now();
    this.updated_by = 'SUPER ADMIN';
    this.is_deleted = false;
    next();
});

objSchema.pre('findOneAndUpdate', function(next) { 
    console.log(this, 'this')
    this._update.updated_at = Date.now();
    this._update.updated_by = 'SUPER ADMIN edit';
    next();
});
let objModel = mongoose.model('sale', objSchema);


module.exports = objModel;