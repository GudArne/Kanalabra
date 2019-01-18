const sql = require("sqlite3").verbose();

module.exports = function(app){

app.db = new sql.Database('./db/Fyllespelet.db', function(err){
    if(err)
    {
        console.log(err.message);
    }
    else
    {
        console.log("connected");
    }

});
}
