const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session');
const send = require('koa-send');
const bodyParser = require('koa-bodyparser');
const register = require('./middleware/loginsystem/register');
const authUser = require('./middleware/loginsystem/authUser');
const sql = require("sqlite3").verbose();
const validate = require('koa-joi-validate');
const Joi = require('joi');
const validateUser = require('./middleware/validation/validateUser');
const jwt = require('jsonwebtoken');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.keys = ['kanalabra']
app.use(session({}, app))


router.post('/login', async ctx => {
    const user = ctx.request.body;

    console.log("this is from route: ",user);
    const valResult = validateUser(user);

    if (valResult)
    {
      //Check if validate email and password with regex is correct (true)
      console.log("this is valResult", valResult);

      //Login if email and password is correct in db AND give user a session
      let loginCheck = await authUser(user)
      if (loginCheck)
      {
        ctx.body = "Du är inloggad";
      }
      
    }
});

router.get("/login", async function(ctx){
  await send(ctx, 'app/includes/login.html');

});



//async function test(ctx,next)
//{
//  console.log("testning");
//  await next();
//}


router.get("/", async function(ctx){
  await send(ctx, 'public/index.html');

});

router.get("/register", async function(ctx){
  await send(ctx, 'app/includes/register.html');

});
router.post("/register", async function(ctx){

  if (register(ctx.request.body.name, ctx.request.body.email, ctx.request.body.password))
  {
    ctx.body = "User created!";
  }
});




app.listen(5500); 