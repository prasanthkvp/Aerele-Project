import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export function MemberManagement(){
  const [member, setMember] = useState([])
  useEffect(() => {
      fetch("http://localhost:3007/getallmember")
          .then(res => res.json())
          .then(details => setMember(details))
  })
  function handledelete(memberid) {
      alert()
      let deletedata = { memberid:memberid }
      axios.post("http://localhost:3007/deletemember", deletedata)
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
                  member.map((value, index) => (
                      <>
                          <div className="col-10 col-sm-5 col-md-3 m-2 mx-3">
                              <div class="card d-flex align-items-center border-0">
                                  {/* <div className="image-container">
                                      <img src={value.productimage} className="card_img_size" />
                                  </div> */}
                                  <div class="card-body card_content_size text-white bg-dark">
                                      <h3 >{value.firstname}</h3>
                                      <h5>{value.lastname}</h5>
                                      <h5>{value.gmail}</h5>
                                      <h5>{value.phonenumber}</h5>
                                       <Link to={`/update/${value.memberid}`} className="btn btn-success">update</Link>
                                      <a href="#" class="btn btn-danger rounded border-0 ms-5" onClick={() => { handledelete(value.memberid) }}>Remove</a>
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