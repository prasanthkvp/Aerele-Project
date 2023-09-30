import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
export function BookManagement(){
    const [book, setBook] = useState([])
    useEffect(() => {
        fetch("http://localhost:3007/getallbook")
            .then(res => res.json())
            .then(details => setBook(details))
    })
    function handledelete(bookid) {
        alert(bookid)
        let deletedata = { bookid: bookid }
        console.log(deletedata);
        axios.post("http://localhost:3007/deletebook", deletedata)
            .then((res) => {
                if (res.data.status === "error") {
                    alert("data are not deleted")
                }
                else if (res.data.status === "success") {
                    alert("data are deleted")
                }
            })
    }
    return (
        <>
            <div className="row w-100 d-flex justify-content-evenly">
                {
                    book.map((value, index) => (
                        <>
                            <div className="col-10 col-sm-5 col-md-3 m-2 mx-3">
                                <div class="card d-flex align-items-center border-0">
                                    <div className="image-container">
                                        <img src={value.bookimage} className="card_img_size" />
                                    </div>
                                    <div class="card-body card_content_size text-white bg-dark">
                                        <h3 >BookTitle:{value.title}</h3>
                                        <h5>And By{value.author}</h5>
                                        <h5>Quantity:{value.quantity}</h5>
                                        <h5>Rent{value.rentfee}</h5>
                                        <Link to={`/updatebooks/${value.bookid}`} className="btn btn-success">update</Link>
                                        <a href="#" class="btn btn-danger rounded border-0 ms-5" onClick={() => { handledelete(value.bookid) }}>Remove</a>

                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>

        </>
    );
}