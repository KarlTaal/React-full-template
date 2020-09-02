import React, {useState} from 'react';
import './AdminToolsContainer.css';
import axios from 'axios';
import {useHistory} from "react-router-dom";


const AdminToolsContainer = (props) => {
    const [txtAreaValue, setTxtAreaValue] = useState("");
    const [postTxt, setPostTxt] = useState("");

    const history = useHistory();

    const logoutHandler = () => {
        history.push('/');
        props.setIsAuthorized(false);
        localStorage.removeItem('identity');
        axios.get('http://127.0.0.1:5000/logout',
            {
                headers: {"Authorization": `Bearer ${localStorage.getItem('usertoken')}`}
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    };

    const postClickHandler = () => {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/post',
            data: {"value": postTxt},
            headers: {"Authorization": `Bearer ${localStorage.getItem('usertoken')}`}
        })
            .then(response => {
                //handle success
                console.log(response);
            })
            .catch(error => {
                //handle error
                console.log(error);
            });
    };

    const viewClickHandler = () => {
        //console.log({"Authorization": `Bearer ${localStorage.getItem('usertoken')}`})
        axios.get('http://127.0.0.1:5000/getAll',
            {
                headers: {"Authorization": `Bearer ${localStorage.getItem('usertoken')}`}
            })
            .then(response => {
                let responseTXT = "Id\t\tDescription\n\n";
                response.data.rows.forEach(row => responseTXT += row[0] + "\t\t" + row[1] + "\n");
                setTxtAreaValue(responseTXT);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const inputValueChangeHandler = (e) => {
        setPostTxt(e.target.value);
    };

    console.log("admin", props.isAuthorized);
    return (<>
            {
                props.isAuthorized ?
                    <>
                        {
                            props.isAuthorized ?
                                <div style={{
                                    position: "absolute",
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "center",
                                    gap: "50px",
                                    height:"20%",
                                    alignItems:"center"
                                }}>
                                    <div>{`Logged in as ${localStorage.getItem('identity')}`}</div>
                                    <button onClick={logoutHandler}>Logout</button>
                                </div>
                                :
                                <div style={{
                                    position: "absolute",
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "center",
                                    height:"20%",
                                    alignItems:"center"
                                }}
                                ><div>Logged out</div></div>
                        }
                        <div id={"admin-tools-header-container"}>
                            Administrator page
                        </div>
                        <div id={"admin-tools-base-container"}>
                            <input
                                placeholder={"Value to add to db"}
                                className={"admin-tool-base-item"}
                                onChange={inputValueChangeHandler}/>
                            <button
                                className={"admin-tool-base-item"}
                                onClick={postClickHandler}>Post
                            </button>
                            <button
                                className={"admin-tool-base-item"}
                                onClick={viewClickHandler}>View
                            </button>
                            <textarea readOnly={true}
                                      className={"admin-tool-base-item"}
                                      value={txtAreaValue}/>
                        </div>

                    </>
                    : <div id={"admin-container-login-msg"}>
                        <div>You have to be logged in</div>
                        <button onClick={() => {
                            history.push('/')
                        }}>Back to home</button>
                    </div>
            }
        </>
    )
};

export default AdminToolsContainer;

