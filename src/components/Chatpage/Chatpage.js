import React from 'react';
import Sidepage from '../Sidepage/Sidepage';
import './Home.css';
import Chatcontainer from '../Chatcontainer/Chatcontainer';

function Chatpage(props) {
  return (
    <>
        <div className=" home">
            <div className=" home-container">
                <Sidepage currentUser={props.currentUser}  signOut={props.signOut}/>
                <Chatcontainer currentUser={props.currentUser}/>  
            </div>
        </div>
        

    </>
  )
}

export default Chatpage