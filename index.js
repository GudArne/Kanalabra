const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session');
const send = require('koa-send');
const bodyParser = require('koa-bodyparser');
const register = require('./middleware/loginsystem/register');



const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.keys = ['secret']
app.use(session({}, app))




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