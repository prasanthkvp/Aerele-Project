import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export function IssueBook() {
  function handleIssue(event){
    // event.preventDefault()
    let memberid = document.getElementById("memberid").value;
    let bookid = document.getElementById("bookid").value;
    let dueday = document.getElementById("duedate").value;
    let transactiondate = document.getElementById("date").value;

    
    let issue = {
      memberid: memberid,
      bookid: bookid,
      dueday: dueday,
      transactiondate:transactiondate     
    }


    console.log(issue);


    if (memberid === "" && bookid === "" && dueday === "" ){ 
      alert("Insert the all data")
  }else{
    axios.post("http://localhost:3007/issue",issue)
    .then((res)=>{
      alert(res)
        if(res.data.status === "error"){
        alert(" Not taken")
        console.log(res);
      }
      else if (res.data.status === "inserted"){
        alert("Taken")
        window.location.href='/TransactionManagement'
      } else if (res.data.status === "updated"){
        alert("Existing Added")
        window.location.href='/TransactionManagement'
      } else if (res.data.status === "limit reached"){
        alert("Debt Recahed It's Limit")
        window.location.href="/Transaction"
      }

      
  })
}
  }
  return (
    <>
      <div className=" container-fluid issuebookBg">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4 ">
            <div className="login_content">
              <h1 className="text-white">Issue Book</h1>
              <form className="mx-1 mx-md-4" onSubmit={handleIssue}>
                <div className="mb-3">
                  <label className="text-white"><b>MemberID</b></label>
                  <input type="text" id="memberid" className="form-control"
                    placeholder="MemberID" />
                </div>
                <div>
                  <label className="text-white" ><b>BookID</b></label>
                  <input type="text" id="bookid" className="form-control "
                    placeholder="BookID" />
                </div>
                <div className="mb-3">
                  <label className="text-white"><b>Due Day</b></label>
                  <input id="duedate" type="number" className="form-control"
                    placeholder="DueDate" />
                </div>
                <div className="mb-3">
                  <label className="text-white"><b> Transaction Date</b></label>
                  <input id="date" type="date" className="form-control"
                    placeholder="DueDate" />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                </div>
                 <button type="submit" className="btn btn-danger btn-lg">Issue</button>
                <div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}