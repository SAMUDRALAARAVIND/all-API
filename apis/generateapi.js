const connection = require("./connection")
class createApiKey {
    constructor(data){
        this.data = data;
    }
    insertData(apiKey){
        return new Promise((resolve)=>{
            var sql = `insert into api(email,password,apikey) values('${this.data.email}','${this.data.password}','${apiKey}')`;
            connection.query(sql,(err,result)=>{
            if(err) resolve(false)
            else resolve(true)
          })
        })
    }
    checkEmail(email){
        return new Promise((resolve)=>{
            var sql = `select * from api where email='${email}' limit 1;`;
            connection.query(sql,(err,result)=>{
            if(err){
                resolve("An error occured in mysql")
            }
            else{
                console.log(result.length)
                if(result.length>=1){
                  resolve("User already exists")
                }
                else resolve("done")
            }
          })
        })
    }
    generateRandomString(email){
        var start = "";
            var end = "";
            var randomNum = Math.floor((Math.random()*1000000)+1)
            var index;
            for(index = 0;index<email.length;index++)
                if(email[index] == '@')
                  break;
            start = email.substring(0,index/2)
            end = email.substring(index/2,index)
            end = end.toUpperCase()
            var randomString = randomNum.toString()
            var sIndex=0,rIndex=0,eIndex=0
          var finalApikey = ""
          var chance = 0
          while(sIndex<index/2 && rIndex<6 && eIndex<index/2){
                if(chance==0){
                  finalApikey+=start[sIndex]
                  sIndex++
                  chance++
                  continue
                }
                if(chance==1){
                    finalApikey+=randomString[rIndex]
                    rIndex++
                    chance++
                    continue
                }
                if(chance==2){
                    finalApikey+=end[eIndex]
                    eIndex++
                    chance = 0
                }
          }
          if(sIndex<index>2)
            finalApikey+=sIndex.substring(sIndex,start.length)
          if(rIndex<6)
            finalApikey+=randomString.substring(rIndex,6)
         if(eIndex<index/2)
           finalApikey+=end.substring(eIndex,end.length)
          return "gaertapvoisntd"+finalApikey;
    }
    async generateApiKey(callBack){
        var checkEmailPresence = await this.checkEmail(this.data.email)
        console.log(checkEmailPresence)
        if(checkEmailPresence == "done"){
            //we are ready to insert
            var apiKey =  this.generateRandomString(this.data.email)
            var insertStatus = this.insertData(apiKey)
            if(insertStatus){
                callBack(apiKey)
            }
            else{
                callBack("User already exists")
            }
        }
        else{
            callBack("User already exists")
        }
    }
}
module.exports = createApiKey