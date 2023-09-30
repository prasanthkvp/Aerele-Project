import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export function AddBook(){
    function handleRegister(event){
        let bookimage=document.getElementById("bookimage").value;
        let title=document.getElementById("title").value;
        let author=document.getElementById("author").value;
        alert(author)
        let quantity=document.getElementById("quantity").value;
        let rentfee=document.getElementById("rentfee").value;
       
    
        var addbook={
            bookimage:bookimage,
            title:title,
            author:author,
            quantity:quantity,
            rentfee:rentfee
            
        }
        if(title === '' && author === '' && quantity === '' && rentfee === ''){
        alert("error")
        
      }else{
        axios.post("http://localhost:3007/addbook",addbook)
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
    return(
        <>
        <body className="addBook_bg">
    <div className="d-flex justify-content-center vh-100 align-items-center content">
        <form className="col-lg-6 " onSubmit={handleRegister}>
          <div>
            <h1 className="text-center "><b>ADD BOOK</b></h1>
          </div>
          <div class="form-outline mb-4">
            <label><b>BookImage</b></label>
            <input type="text" id="bookimage" class="form-control" placeholder="Image link" />
          </div>
          <div class="form-outline mb-4">
            <label><b>Title</b></label>
            <input type="text" id="title" class="form-control" placeholder="Enter the book title" />
          </div>
          <div class="form-outline mb-4">
          <label><b>AUTHOR</b></label>
            <input type="text" id="author" class="form-control" placeholder="Enter the author name" />
          </div>
          <div class="form-outline mb-4">
          <label><b>QUANTITY</b></label>
            <input type="text" id="quantity" class="form-control" placeholder="Enter the quantity"  />
          </div>
          <div class="form-outline mb-4">
          <label><b>RENT FEE</b></label>
            <input type="text" id="rentfee" class="form-control" placeholder="Enter the rent for book"  />
          </div>    
          <div className="d-flex justify-content-start gap-2">
          <div class="row mb-4">
           <button type="sumbit" class="btn btn-success btn-block mb-4">SUBMIT</button>

          </div>
          <div class="row mb-4">
          <Link to="/LibrarianDashboard/:id"> <button type="button" class="btn btn-danger btn-block mb-4 ms-5">BACK</button> </Link>
          </div>
          </div>
        </form>
      </div>
      </body>
      
        </>
    );
}