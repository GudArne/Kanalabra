const Koa = require('koa');
const bcrypt = require('bcryptjs');
const bodyParser = require('koa-bodyparser');
const sql = require("sqlite3").verbose();

let db = new sql.Database('./db/Fyllespelet.db', function(err){
    if(err)
    {
        console.log(err.message);
    }
    else
    {
        console.log("connected");
    }

});

const app = new Koa();
app.use(bodyParser());

module.exports = async function(name, email, password)
{
    let user = {};
    user.name = name;
    user.email = email;
    //console.log(user);
    let tmpPassword = password;

    const salt = await bcrypt.genSalt(12);
    console.log("SALT: ",salt);

    user.password = await bcrypt.hash(tmpPassword,salt)
    console.log("pwHash: ", user.password);

    const result = await ins("INSERT INTO users (user_name, user_email, user_password) VALUES(?,?,?)",[user.name, user.email, user.password]);
    return result;
    
}

function ins(query, params){

    return new Promise(function(resolve, reject){
        db.run(query, params, function(err){
            if(err) reject(" error: " + err.message)
            else {
                resolve(true);
            }
        });
    });
}


// GAMMAL FUNCTION, ANVÄNDS INTE
function saveUser(userObj)
{
    let name = userObj.name;
    let email = userObj.email;
    let password = userObj.password;

    let insert_query = "INSERT INTO users (user_name, user_email, user_password) VALUES(?,?,?)";
    db.run(insert_query,[name, email, password],function(err){
        if(err) {
            console.log(err + " Din email används nog redan");}
        else
        {

            
        }
    });
    db.all("SELECT * FROM users",[],(err,result)=>{
        
        result.map(function(el){
            console.log("name: " + el.user_name + " mail: " + el.user_email + " pw: " + el.user_password);
        });
    });
}


