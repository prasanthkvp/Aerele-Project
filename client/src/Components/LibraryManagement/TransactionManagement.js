import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";
export function TransactionManagement(){

    const[transaction,setTransaction]=useState([])
    useEffect(()=>{
        fetch('http://localhost:3007/transaction')
        .then(res=>res.json())
        .then(data=>setTransaction(data))
    })
   
    var remove = (transactionid) => {
        axios.post('http://localhost:3007/transactiondelete/'+transactionid)
              .then((res) => {
                  if (res.data.status === "error") {
                      alert("data are not delete")
                  }
                  else if (res.data.status === "success") {
                      alert("data are deleted")
                  }
              })
      }
    return(
        <>
        <div className="row w-100 d-flex justify-content-evenly">
        <h1 className="bg-dark text-center text-white"><b>TRANSACTIONS DETAILS</b></h1>

        {
           transaction.map((value, index) => (
                <>
                    <div className="col-10 col-sm-5 col-md-3 m-2 mx-3">
                        <div class="card d-flex align-items-center border-0">
                            
                            <div class="card-body card_content_size text-white bg-dark">
                                <h3>Transaction Id:{value.transactionid}</h3>
                                <h5>Book ID:{value.bookid}</h5>
                                <h5>Member ID:{value.memberid}</h5>
                                <h5>Transaction Date:{value.transactiondate}</h5>
                                <h5>Due Date:{value.outstandingdept}</h5>
                            <td><button className="btn btn-outline-danger" onClick={()=>{remove(value.transactionid)}}>Delete</button></td>


                            </div>
                        </div>
                    </div>
                </>
            ))
        }
    </div>

</>
);
        
    //     <>
    //             <h1 className="bg-dark text-white text-center"><b>TRANSACTIONS DETAILS</b></h1>
    //     <div className="bookTab d-flex align-items-center justify-content-center">
    //         <table cellpadding="10px" className="text-center table hovertext-white ">
    //             <tr>
    //                 <th>Transaction Id</th>
    //                 <th>Book Id</th>
    //                 <th>Member Id</th>
    //                 <th>Transaction Date</th>
    //                 <th>Due Day</th>
    //             </tr>

    //             {
    //                 transaction.map((value,indes)=>(
    //                     <>
    //                     <tr className="table table-hover">
    //                         <td>{value.transactionid}</td>
    //                         <td>{value.bookid}</td>
    //                         <td>{value.memberid}</td>
    //                         <td>{value.transactiondate}</td>
    //                         <td>{value.dueday}</td>
    //                         <td>{value.outstandingdept}</td>
    
    //                         <td><button className="btn btn-outline-danger" onClick={()=>{remove(value.transactionid)}}>Delete</button></td>
    //                     </tr>
    //                     </>
    //                 ))
    //             }
    //         </table>
    //     </div>
    //     </>

    
}
