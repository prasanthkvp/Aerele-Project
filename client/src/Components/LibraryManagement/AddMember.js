import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
export function AddMember() {
  function handlemember(event) {
    let firstname = document.getElementById("firstname").value;
    alert(firstname)
    let lastname = document.getElementById("lastname").value;
    let gmail = document.getElementById("gmail").value;
    let phonenumber = document.getElementById("phonenumber").value;
    let AddMember = {
      firstname: firstname,
      lastname: lastname,
      gmail: gmail,
      phonenumber: phonenumber
    }
    if (firstname === "" && lastname === "" && gmail === "" && phonenumber === "" && phonenumber === ""){ 
      alert("Insert the all data")
  }else{
    axios.post("http://localhost:3007/addmember",AddMember)
    .then((res)=>{
      alert(res)
        if(res.data.status === "error"){
        alert("Data are not inserted")
        console.log(res);
      }
      else if (res.data.status === "success"){
        alert("data are insert")
      }
  })
}
  }
  return (
    <>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black two">
            <div className="card-body p-md-5">
              <div className="row addMember justify-content-center">
                <div className=" col-xl-5 order-2 order-lg-1">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add Member</p>
                  <form className="mx-1 mx-md-4" onSubmit={handlemember}>
                    <div className="d-flex flex-row align-items-center mb-4">

                      <div className=" flex-fill">
                        <b><label>FirstName</label></b>
                        <input type="text" id="firstname" placeholder="Enter the Name" className="form-control" />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">

                      <div className="flex-fill">
                        <b><label >LastName</label></b>
                        <input type="text" id="lastname" placeholder="Enter the Last Name" className="form-control" />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">

                      <div className="flex-fill">
                        <b> <label >Gmail</label></b>
                        <input type="Gmail" id="gmail" placeholder="Enter the gmail" className="form-control" />

                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">

                      <div className="flex-fill">
                        <b><label className="">Phone Number</label></b>
                        <input type="text" id="phonenumber" placeholder="Phone Number" className="form-control" />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success btn-lg">Sumbit</button>
                    <Link to="/LibrarianDashboard/:id" ><button type="submit" className="btn btn-danger btn-lg ms-3">Home</button></Link>
                  </form>
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex justify-content-center p-4">
                  <img src="https://images.unsplash.com/photo-1592387824063-aaefe623b4bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWRkJTIwbWVtZWJlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                    className="img-fluid img-one " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}