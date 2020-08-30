import React, {useState} from 'react';
import './AdminToolsContainer.css';
import axios from 'axios';


const AdminToolsContainer = () =>{
    const [txtAreaValue, setTxtAreaValue] = useState("");
    const [postTxt, setPostTxt] = useState("");

    const postClickHandler = () => {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/post',
            data: {"value":postTxt}
        })
            .then(response=> {
                //handle success
                console.log(response);
            })
            .catch(error=> {
                //handle error
                console.log(error);
            });
    };

    const viewClickHandler = () => {
        axios.get('http://127.0.0.1:5000/getAll')
            .then(response => {
                 let responseTXT = "";
                 response.data.rows.forEach(row => responseTXT += row + "\n");
                 setTxtAreaValue(responseTXT);
            })
            .catch(error=>{
                console.log(error);
            });
    };

    const inputValueChangeHandler = (e) => {
        setPostTxt(e.target.value);
    };

    return <>
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
                onClick={postClickHandler}>Post</button>
            <button
                className={"admin-tool-base-item"}
                onClick={viewClickHandler}>View</button>
            <textarea readOnly={true}
                className={"admin-tool-base-item"}
                value={txtAreaValue}/>
        </div>
    </>
};

export default  AdminToolsContainer;

