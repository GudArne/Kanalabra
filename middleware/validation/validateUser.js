const Joi = require("Joi");


//password: Joi.string().min(5).max(40).regex(/^[a-zA-Z0-9]$/)
module.exports = async function(user){
 
    const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().min(5).max(40)
    
}).with('email', 'password');


    const valResult = Joi.validate(user, schema);
    console.log(valResult);

    if(valResult.error === null)return true;
    else return valResult.error.details[0].message;

}


