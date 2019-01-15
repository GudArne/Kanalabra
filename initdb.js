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

const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_admin INTEGER DEFAULT 0,
    user_password TEXT NOT NULL
);
`;

db.run(createUserTable);

//let insert_query = "INSERT INTO users (user_name, user_email, user_password) VALUES(?,?,?)";

//db.run(insert_query,["mattias", "mattias@mattias.se", "qweqwe"]);

//db.all("SELECT * FROM users",[],(err,result)=>{
//    console.log(result);
//});
