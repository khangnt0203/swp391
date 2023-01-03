import React from "react";
import "antd/dist/antd.css";
import "../JobCategoryPage/style-main.css";
import "../Utils/Styleguide.css";
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate} from "react-router-dom";

export default function () {
    const navigate = useNavigate();
    return (
        <div className="job-category-page screen">
            <div className="row"  style={{paddingTop: "10px"}}>
                <div className="col-lg-4">
                    <h2><a href="#" className="findwork">Findwork</a></h2>
                </div>
                <div className="col-lg-4">

                </div>
                <div className="col-lg-1">
                    <button type="button" className="login btn btn-white" onClick={(e) => navigate('/login')} style={{paddingTop: "10px",  minHeight: "35px",
                        width: "160px", fontSize:"20px"}}>Log in</button>
                </div>
                <div className="col-lg-1">
                    <button type="button" className="signUp btn btn-success" onClick={(e) => navigate('/signup')} style={{alignItems:"center", minHeight: "35px",
                        width: "160px", fontSize:"20px"}}>Sign up</button>
                </div>
            </div>
            <div style={{border: "solid 1px black"}}>
            </div>

            <div className="col-lg-4">
                <h2 style={{color: "green", paddingTop: "50px", fontWeight:"bold"}}>Job category</h2>
            </div>

            <div style={{border: "solid 1px black", width: "80%", height:"750px", marginLeft: "10%", marginBottom:"50px"}}>
                <div className="row">
                    <div className="col-lg-2">
                        <a href={"#"} style={{color: "green", paddingTop:"10px", fontSize:"30px", fontWeight:"bold", paddingLeft:"30px"}}>Job</a>
                    </div>

                    <div className="col-lg-3">
                        <a href={"#"} style={{color: "green", paddingTop:"10px", fontSize:"30px", fontWeight:"bold"}}>Freelancer</a>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-2">
                        <ul>
                            <li style={{paddingTop:"15px"}}><a href={"#"} style={{color:"black",fontSize:"20px", fontWeight:"bold"}}>Front-end</a></li>
                            <li style={{paddingTop:"15px"}}><a href={"#"} style={{color:"black",fontSize:"20px", fontWeight:"bold"}}>Back-end</a></li>
                            <li style={{paddingTop:"15px"}}><a href={"#"} style={{color:"black",fontSize:"20px", fontWeight:"bold"}}>DevOps</a></li>
                            <li style={{paddingTop:"15px"}}><a href={"#"} style={{color:"black",fontSize:"20px", fontWeight:"bold"}}>Mobile</a></li>
                            <li style={{paddingTop:"15px"}}><a href={"#"} style={{color:"black",fontSize:"20px", fontWeight:"bold"}}>QC Engineer</a></li>
                            <li style={{paddingTop:"15px"}}><a href={"#"} style={{color:"black",fontSize:"20px", fontWeight:"bold"}}>Data Analys</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-9" style={{borderLeft: "solid 1px black", marginTop:"15px"}}>
                        <ul>
                            <li style={{border: "solid 1px black", marginTop:"5px", backgroundColor:"#F2FFDF"}}>
                                <div style={{float:"left", paddingLeft:"10px"}}><a href={"#"} style={{color:"green",fontSize:"20px", fontWeight:"bold"}}>Simple Base UI</a></div><br/>
                                <div style={{float:"left"}}>Description</div><br/><br/>
                            </li>
                            <li style={{border: "solid 1px black", marginTop:"5px", backgroundColor:"#F2FFDF"}}>
                                <div style={{float:"left", paddingLeft:"10px"}}><a href={"#"} style={{color:"green",fontSize:"20px", fontWeight:"bold"}}>Simple Base UI</a></div><br/>
                                <div style={{float:"left"}}>Description</div><br/><br/>
                            </li>
                            <li style={{border: "solid 1px black", marginTop:"5px", backgroundColor:"#F2FFDF"}}>
                                <div style={{float:"left", paddingLeft:"10px"}}><a href={"#"} style={{color:"green",fontSize:"20px", fontWeight:"bold"}}>Simple Base UI</a></div><br/>
                                <div style={{float:"left"}}>Description</div><br/><br/>
                            </li>
                            <li style={{border: "solid 1px black", marginTop:"5px", backgroundColor:"#F2FFDF"}}>
                                <div style={{float:"left", paddingLeft:"10px"}}><a href={"#"} style={{color:"green",fontSize:"20px", fontWeight:"bold"}}>Simple Base UI</a></div><br/>
                                <div style={{float:"left"}}>Description</div><br/><br/>
                            </li>
                            <li style={{border: "solid 1px black", marginTop:"5px", backgroundColor:"#F2FFDF"}}>
                                <div style={{float:"left", paddingLeft:"10px"}}><a href={"#"} style={{color:"green",fontSize:"20px", fontWeight:"bold"}}>Simple Base UI</a></div><br/>
                                <div style={{float:"left"}}>Description</div><br/><br/>
                            </li>
                            <li style={{border: "solid 1px black", marginTop:"5px", backgroundColor:"#F2FFDF"}}>
                                <div style={{float:"left", paddingLeft:"10px"}}><a href={"#"} style={{color:"green",fontSize:"20px", fontWeight:"bold"}}>Simple Base UI</a></div><br/>
                                <div style={{float:"left"}}>Description</div><br/><br/>
                            </li>
                            <li style={{border: "solid 1px black", marginTop:"5px", backgroundColor:"#F2FFDF"}}>
                                <div style={{float:"left", paddingLeft:"10px"}}><a href={"#"} style={{color:"green",fontSize:"20px", fontWeight:"bold"}}>Simple Base UI</a></div><br/>
                                <div style={{float:"left"}}>Description</div><br/><br/>
                            </li>
                            <li style={{marginTop:"5px", float:"right"}}>
                                <h4>Phan trang</h4><br/>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-1">

                    </div>
                </div>
            </div>

        </div>
    );
}



