const mysql = require("mysql")

var connection = mysql.createConnection({
    host:"b0pvcyaxjphwkhrcfnkl-mysql.services.clever-cloud.com",
    user:"uelrcdmrmg8d8gnz",
    password:"SWoOWs0wmebIt2e7bg4n",
    database:"b0pvcyaxjphwkhrcfnkl"
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