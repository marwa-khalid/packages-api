var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

var packageSchema = mongoose.Schema({
 name: String,
 price: String,   
});
var package = mongoose.model("package",packageSchema);

function validatepackage(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(10).required(),
        price: Joi.string().min(3).max(10).required(),
        //price: Joi.number().min(0).required(),
     });
     return schema.validate(data, {abortEarly: false});
}
module.exports.package = package;
module.exports.validate = validatepackage;
