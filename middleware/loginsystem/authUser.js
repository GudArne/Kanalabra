const Koa = require('koa');
const bcrypt = require('bcryptjs');
const app = new Koa();

require("../connect")(app);

module.exports = async function(user)
{
    const email = user.email;
    const password = user.password;
    
    return new Promise(function(resolve, reject){

    
        app.db.all("SELECT * FROM users where user_email=(?)",[email],(err,result)=>{

            if(err){
                console.log(err);
            }
            else
            {
                result.map(function(el){
                    hashedPw = el.user_password;
                });
                bcrypt.compare(password, hashedPw, function(err, match){

                    if (match) {
                        console.log("This is match: ",match);
                        console.log("Du skrev in rätt lösenord");
                        resolve(true);
                    }
                    else {
                        console.log("fel lösen");
                        reject(false);
                    }
                });
            }     
        });
    });
}

