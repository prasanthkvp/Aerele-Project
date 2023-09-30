import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function Updatebook() {
    var { bookid } = useParams()
    const [bookimage, setBookimage] = useState('')
    const [title, setTittle] = useState('')
    const [author, setAuthor] = useState('')
    const [quantity, setQuantity] = useState('')
    const [rentfee, setRentfee] = useState('')

    useEffect(() => {
        fetch('http://localhost:3007/getonebook/' + bookid)
            .then(data => data.json())
            .then((res) => {
                setQuantity(res[0].quantity)
                setRentfee(res[0].rentfee)

            })
    }, [])

    function handleupdate(event) {
        event.preventDefault()
        var quantity = document.getElementById("quantity").value
        var rentfee = document.getElementById("rentfee").value


        var updatebook = {
            quantity: quantity,
            rentfee: rentfee
        }

        if (rentfee === '') {
            alert("Enter the details")
        }
        else {
            axios.put('http://localhost:3007/updatebook/' + bookid, updatebook)
                .then((res) => {
                    if (res.data.status === "error") {
                        alert("Data is not updated")
                    }
                    else if (res.data.status === "success") {
                        alert("Data updated!")


                    }
                })
        }
    }

    return (<>
        <nav></nav>
        <div className="RegMainPage h-100 d-flex justify-content-center align-items-center row">
            <div className="regcard container d-flex flex-column align-items-center justify-content-center gap-3 ">
                <h1 className="text-center">Alter Book List  only Quantity and RentFee</h1>
                <form onSubmit={handleupdate}>

                    {/* <input type="text" id="bookimage" value={bookimage} onChange={(updatedata) => { setBookimage(updatedata.target.value) }} className="mb-2 rounded  w-100 p-1 border-0" placeholder="image" required></input> */}

                    {/* <input type="text" id="title" value={title} onChange={(updatedata) => { setTittle(updatedata.target.value) }} className="mb-2 rounded w-100 p-1 border-0" placeholder="title" required></input> */}

                    {/* <input type="text" id="author" value={author} onChange={(updatedata) => { setAuthor(updatedata.target.value) }} className="mb-2 rounded w-100 p-1 border-0" placeholder="author" required></input> */}
                    <label>Quantity</label>
                    <input type="tel" id="quantity" value={quantity} onChange={(updatedata) => { setQuantity(updatedata.target.value) }} className="mb-2 rounded w-100 p-1 border-0" placeholder="quantity" required></input>
                     <label>Rentfee</label>
                    <input type="text" id="rentfee" value={rentfee} onChange={(updatedata) => { setRentfee(updatedata.target.value) }} className="mb-2 rounded w-100 p-1 border-0" placeholder="rentfee" required></input>

                    <input type="submit" class="btn btn-success btn-block rounded w-25 p-1 border-0" value="UPDATE"></input>
                </form>
            </div>
        </div>
    </>);
}