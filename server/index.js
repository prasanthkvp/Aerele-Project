const express = require("express")
const cors = require("cors")
const bodyparse = require("body-parser")
const mysql = require("mysql")
const crypto=require("crypto")
const { request } = require("http")
const { error } = require("console")
const storeex = express()
storeex.use(cors()) 
storeex.use(bodyparse.json())
storeex.use(express.json())
storeex.use(bodyparse.urlencoded({ extended: true }))
storeex.use(express.static('public'))
let localdb = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Lakshmi@13",
    database: "library_management"
})
localdb.connect((error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log("db connected")
    }
})
// storeex.post('/librarymanagement',(request,response)=>{
//     let sno=crypto.randomUUID();
//     let {librarianid,gmail,password}=request.body
//     let insertquery=`insert into librarian_login(sno,librarianid,gmail,password)values('${sno}',?,?,?)`
//     localdb.query(insertquery,[librarianid,gmail,password],(error,result)=>{
//         if(error){
//             response.send({"status":"error"})
//             console.log(error)
//         }
//         else{
//             response.send({"status":"success"})
//         }
//     })
// })

//post method
storeex.post('/librarymanagement',(request,response)=>{
    let {gmail,librarianid,password}=request.body
    let loginquery='select * from librarian_login where gmail=?'
    localdb.query(loginquery,[gmail],(error,result)=>{
        if(error){
            response.send({"status":"error"})
        }
        else if(result.length>0){
            let dblibrarianid=result[0].librarianid
            let dbgmail=result[0].gmail
            let dbpassword=result[0].password
            let id=result[0].sno
         
            if(dbgmail=== gmail && dbpassword === password && dblibrarianid===librarianid){
                response.send({"status":"success","id":id,})
            }
            else if(error){
                response.send({"status":"invalid"})
            }
        }
        else{
            response.send({"status":"emptyset"})
        }
    })
})
storeex.post('/addbook',(request,response)=>{

    let bookid=crypto.randomUUID();
  
    let {bookimage,title,author,quantity,rentfee}=request.body
    let insertquery=`insert into addbooks(bookimage,bookid,title,author,quantity,rentfee)values(?,'${bookid}',?,?,?,?)`
    localdb.query(insertquery,[bookimage,title,author,quantity,rentfee],(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
        }
    })
})

//For Issue Book
storeex.post('/issue', (request, response) => {
  let { memberid, bookid, dueday, transactiondate } = request.body

  let bookPrice
  var outDebt
  var totalPrice
  var totalDebt


  let queryissue = 'select rentfee from addbooks where bookid = ?'
  localdb.query(queryissue, [bookid], (error, result) => {
      if (error) {
          response.send({ "status": "error" })
          console.log(error)
      }
      else {
          bookPrice = result[0].rentfee
          totalPrice = bookPrice * dueday
          console.log(bookPrice);
      }
  })
  let querydeleteissue = 'select outstandingdebt, memberid from transaction where memberid = ?'
  localdb.query(querydeleteissue, [memberid], (error, result) => {
      if (error) {
          response.send({ "status": "error" })
          console.log(error)
      } else {
          console.log('Entering else');
          console.log(result);
          if (result.length == 0) {
              console.log('Entering if');
              let insertqueryissue = 'insert into transaction (bookid,memberid,transactiondate,dueday,outstandingdebt) values(?,?,?,?,?)'
              localdb.query(insertqueryissue, [bookid, memberid,transactiondate, dueday, totalPrice], (error, result) => {
                  if (error) {
                      response.send({ "status": "error" })
                      console.log(error)
                  }
                  else {
                      response.send({ "status": "inserted" })
                  }
              })
          } else {
              console.log(result);
              outDebt = result[0].outstandingdebt
              console.log(outDebt);
              console.log(totalPrice);
              totalDebt = outDebt + totalPrice
              console.log(totalDebt);
              if (totalDebt > 500) {
                  response.send({ "status": "limit reached" })
              } else if (totalDebt > 0 && totalDebt < 500) {
                  let updateissue = 'update transaction set outstandingdebt = ? where memberid = ?'
                
                  localdb.query(updateissue, [totalDebt, memberid], (error, result) => {
                      if (error) {
                          response.send({ "status": "error" })
                          console.log(error)
                      }
                      else {
                          response.send({ "status": "updated" })
                      }
                  })
              }

          }
      }
  })
})
// transactionID
storeex.get('/transaction', (request, response) => {
  let transaction = 'select * from transaction'
  localdb.query(transaction, (error, result) => {
      if (error) {
          response.send(error)
          console.log(error)
      }
      else {
          response.send(result)
      }
  })
})
storeex.post('/transactiondelete/:transactionid', (request, response) => {
  let { transactionid} = request.params
  let trandeletequery = 'delete from transaction where transactionid=?'
  localdb.query(trandeletequery, [transactionid], (error, result) => {
      if (error) {
          response.send({ "status": "error" })
          console.log(error)
      }
      else {
          response.send({ "status": "success" })
      }
  })
})
////get and update for member

storeex.get('/getone/:memberid', (request, response) =>{
  let {memberid} = request.params
  let getonequery = 'select * from addmember where memberid = ?'
  localdb.query(getonequery, [memberid], (error, result)=>{
      if(error){
          response.send({"status":"error"})
          console.log(error)
      }
      else{
          response.send(result)
          console.log(result)
      }
  })
})

storeex.put('/update/:memberid', (request, response) =>{
  let {memberid} = request.params
  let {firstname,lastname, gmail,phonenumber} = request.body
  let updateQuery = 'update addmember set firstname = ? ,lastname = ? , gmail = ?, phonenumber = ?  where memberid = ?'
  localdb.query(updateQuery, [firstname,lastname, gmail, phonenumber, memberid], (error, result) => {
      if(error){
          response.send({"status" : "error"})
          console.log(error)
      }
      else{
          response.send({"status" : "success"})
      }
  })
})
storeex.post('/addmember',(request,response)=>{
    let {firstname,lastname,gmail,phonenumber}=request.body
    let insertquery=`insert into addmember(firstname,lastname,gmail,phonenumber)values(?,?,?,?)`
    localdb.query(insertquery,[firstname,lastname,gmail,phonenumber],(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
        }
    })
})
storeex.get('/getallmember',(request,response)=>{
    let writequery='select * from addmember'
 localdb.query(writequery,(error,result)=>{
    if(error){
      response.send(error)
    }else{
        response.send(result)
    }
 })
})
storeex.post('/deletemember',(request,response)=>{
    let memberid=request.body.memberid
    let deletequery='delete from addmember where memberid=?'
    localdb.query(deletequery,[memberid],(error,result)=>{
        if(error){
            response.send({"status":"error"})
        }
        else{
            response.send({"status":"success"})
        }
    })
})


//get and update for book
storeex.get('/getonebook/:bookid', (request, response) =>{
  let {bookid} = request.params
  let getonequery = 'select * from addbooks where bookid = ?'
  localdb.query(getonequery, [bookid], (error, result)=>{
      if(error){
          response.send({"status":"error"})
          console.log(error)
      }
      else{
          response.send(result)
          console.log(result)
      }
  })
})

storeex.put('/updatebook/:bookid', (request, response) =>{
  let {bookid} = request.params
  console.log(bookid)
  let {quantity, rentfee} = request.body
  let updateQuery = 'update addbooks set quantity = ? , rentfee = ? where bookid = ?'
  localdb.query(updateQuery, [quantity,rentfee,bookid], (error, result) => {
      if(error){
          response.send({"status" : "error"})
          console.log(error)
      }
      else{
          response.send({"status" : "success"})
      }
  })
})
storeex.get('/getallbook',(request,response)=>{
    let writequery='select * from addbooks'
 localdb.query(writequery,(error,result)=>{
    if(error){
      response.send(error)
    }else{
        response.send(result)
    }
 })
})
storeex.post('/deletebook',(request,response)=>{
    let bookid=request.body.bookid
    console.log(bookid);
    let deletequery='delete from addbooks where bookid=?'
    localdb.query(deletequery,[bookid],(error,result)=>{
       
        if(error){
            
            response.send({"status":"error"})
        }
        else{
            console.log(result);
            response.send({"status":"success"})
            
        }
    })
})
storeex.listen(3007,()=>{
    console.log("your port is running in 3007")
})