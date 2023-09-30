import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export function Library() {
  function handlelogin(event) {
    event.preventDefault()
    var gmail = document.getElementById("gmail").value;
    var password = document.getElementById("password").value;
    let librarianid = document.getElementById("librarianid").value;
    let logindetails = {
      gmail: gmail,
      librarianid : librarianid,
      password: password
    }
    if (gmail === "" && password === "" && librarianid==="") {
      alert("enter the valid details")
    }
    else {
      alert(gmail)
      axios.post("http://localhost:3007/librarymanagement", logindetails)
        .then((res) => {
          if (res.data.status === "success") {
            var id = res.data.id
            alert(id)
            window.location.href = `/LibrarianDashboard/${id}`

          }
          else{
            alert("contact admin")
          }
       
        })
    }

  }
//   function handleRegister(event){
//     event.preventDefault()

//     let librarianid=document.getElementById("librarianid").value;
//     let gmail=document.getElementById("gmail").value;
//     let password=document.getElementById("password").value;

//    let librariandetails={
//     librarianid:librarianid,
//     gmail:gmail,
//     password:password
//    }
//     if(librarianid === '' &&  gmail==='' && password==='' ){
//       alert("enter all details")
    
//   }else{
//     axios.post("http://localhost:3007/librarymanagement",librariandetails)
//     .then(res=>{
//         if(res.data.status === "error"){
//         alert("Data are not inserted")
//       }
//       else if (res.data.status === "success"){
//         alert("data are insert")
//         window.location.href='./LibrarianDashboard'
//       }
//     })
//   }
// }
  return (
    <>
      <div className=" container-fluid login_body">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4 ">
            <div className="login_content">
              <h1 className="text-white">Login Page</h1>
              <form className="mx-1 mx-md-4" onSubmit={handlelogin}>

              <div className="mb-3">
                <label className="text-white"><b>LibrarianID</b></label>
                <input type="text" id="librarianid" className="form-control"
                  placeholder="LibrarianID" />
              </div>
              <div>
                <label className="text-white" ><b>Gmail address</b></label>
                <input type="email" id="gmail" className="form-control "
                  placeholder="Enter a valid email address" />
              </div>
              <div className="mb-3">
                <label className="text-white"><b>Password</b></label>
                <input  type="password" id="password" className="form-control"
                  placeholder="Enter password" />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                
              </div>
              <button type="submit" className="btn btn-success btn-lg">Register</button>
              <div>
                {/* <Link to="/LibrarianDashboard" ><button type="sumbit" className="btn btn-success btn-lg">Login</button></Link> */}
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}