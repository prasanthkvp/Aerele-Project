import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function Updatemember() {
    var {memberid} = useParams()
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [gmail,setGmail] = useState('')
    const [phonenumber,setPhonenumber] = useState('')
    useEffect(()=>{
        fetch('http://localhost:3007/getone/'+memberid)
        .then(data => data.json())
        .then((res)=>{
            setFirstname(res[0].firstname)
            setLastname(res[0].lastname)
            setGmail(res[0].gmail)
            setPhonenumber(res[0].phonenumber)
        })
    }, [])

        function handleupdate(event){
            event.preventDefault()
            var firstname = document.getElementById("firstname").value
            var lastname = document.getElementById("lastname").value
            var gmail = document.getElementById("gmail").value
            var phonenumber = document.getElementById("phonenumber").value
         
    
            var updatedetails = {
                firstname : firstname,
                lastname : lastname,
                gmail : gmail ,
               phonenumber : phonenumber,
            }

            if(gmail === ''){
                alert("Enter the mail")
            }
            else{
                axios.put('http://localhost:3007/update/'+memberid, updatedetails)
                .then((res)=>{
                    if(res.data.status === "error"){
                        alert("Data is not updated")
                    }
                    else if(res.data.status === "success"){
                        alert("Data updated!")
                        window.location.href="/Members"
                      
                    }
                })
            }
    }

    return (<>
    <nav></nav>
        <div className="RegMainPage h-100 d-flex justify-content-center align-items-center row">
            <div className="regcard container d-flex flex-column align-items-center justify-content-center gap-3">
                <h1 className="text-center">ALTER MEMBER DETAILS</h1>
                <form onSubmit={handleupdate}>

                    <input type="text" id="firstname" value={firstname} onChange={(updatedata)=>{setFirstname(updatedata.target.value)}} className="mb-2 rounded  w-100 p-1 border-0" placeholder="First Name" required></input>

                    <input type="text" id="lastname" value={lastname} onChange={(updatedata)=>{setLastname(updatedata.target.value)}} className="mb-2 rounded w-100 p-1 border-0" placeholder="Last name" required></input>

                    <input type="text" id="gmail" value={gmail} onChange={(updatedata)=>{setGmail(updatedata.target.value)}} className="mb-2 rounded w-100 p-1 border-0" placeholder="gmail" required></input>

                    <input type="tel" id="phonenumber" value={phonenumber} onChange={(updatedata)=>{setPhonenumber(updatedata.target.value)}} className="mb-2 rounded w-100 p-1 border-0" placeholder="Phone" required></input>

                    <input type="submit" class="btn btn-success btn-block rounded w-100 p-1 border-0" value="UPDATE"></input>
                </form>
            </div>
        </div>
           </>);
}