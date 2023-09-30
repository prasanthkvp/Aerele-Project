import React from "react";
import { Link } from "react-router-dom";
import Typewriter  from "typewriter-effect";
export function LibrarianDashboard() {
    return (
        <>
            <div className="container-fluid dashboard">
                <div className="d-flex justify-content-center"><h2>
                <Typewriter options={{ strings: ['Welcome to Library Management'], autoStart: true, loop: true }} /></h2></div>
                <div className="button_dash">
                <Link to="/Members"> <div className="d-flex justify-content-center"><button className="form-control border-0 w-50"><b>Members</b></button><br/></div></Link>
                <Link to="/Transaction"><br/><br/> <div className="d-flex justify-content-center"><button className="form-control border-0 w-50"><b>Transaction</b></button><br /></div></Link>
                <Link to="/Books"><br/> <br/><div className="d-flex justify-content-center"><button className="form-control border-0 w-50"><b>Books</b></button><br /></div></Link>
                <Link to="/IssueBook"><br/><br/> <div className="d-flex justify-content-center"><button className="form-control border-0 w-50"><b>IssueBook</b></button><br /></div></Link>
                <Link to="/AddMember"> <br/><br/> <div className="d-flex justify-content-center"><button className="form-control border-0 w-50"><b>AddMember</b></button><br /></div></Link>
                <Link to="/AddBook"><br/><br/> <div className="d-flex justify-content-center"><button className="form-control border-0 w-50"><b>AddBook</b></button><br /></div></Link>

                </div>
               <div className=" dashPara text-white"><h4>A library is a collection of books, journals, multimedia, and other objects, and its successful administration is critical to ensuring that these resources are organised, accessible, and valuable to the community it serves.</h4></div>
                <Link to="/Library"><div className="d-flex justify-content-end"><button className="bg-danger px-3 p-2 text-white rounded button_button">LogOut</button></div></Link>
            </div>


        </>
    );
}