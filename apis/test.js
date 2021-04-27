const mysql = require("mysql")

var connection = mysql.createConnection({
    host:"*************************************",
    user:"***************",
    password:"***************",
    database:"*************"
})
function getData(){
    return new Promise((resolve)=>{
        var query = "select * from users";
        connection.query(query,(err,result)=>{
            if(err) resolve(err)
            else resolve(result)
        })
    })
}
async function getAllData(){
    var data = await getData()
    console.log(data);
    // data=data.json()
    console.log(data[0].id)
    console.log(data[0].username)

}

var s = 123
s = s.toString()
s+="samu"
console.log(s)
