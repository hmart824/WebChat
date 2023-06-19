import React ,{useState , useEffect , useRef } from 'react';
import './Sidepage.css';
import Userprofile from './Userprofile';
import Settingpage from './Settingpage';
import { CgMoreVertical } from "react-icons/cg";
import db from '../firebase'


function Sidepage(props) {

    const [allUser, setAllUser] = useState([]);
    const [searchInput, setSearchInput] = useState("")
    const [friendList, setFriendList] = useState([]);

    useEffect(()=>{
        const getAllUser = async ()=>{
            await db.collection('users').onSnapshot((snapshot)=>{
                setAllUser(snapshot.docs.filter((doc)=> doc.data().email !== props.currentUser.email))
            })
        }

        getAllUser();

        const getAllFriends = async ()=>{
            await db.collection('friendList').doc(props.currentUser.email).collection('list').onSnapshot((snapshot)=>{
                setFriendList(snapshot.docs);
            })
        }
        getAllFriends();
    },[props.currentUser.email])
    const searchedUser = allUser.filter((user) =>{
        let users;
        if(searchInput && user.data().fullname.toLowerCase().includes(searchInput.toLocaleLowerCase())){
          users =  user;
        }
        return users;
    }) ;
    const [openMoreMenu, setopenMoreMenu] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const openMore = ()=>{
        setopenMoreMenu(!openMoreMenu)
    };
    const setting = ()=>{
        console.log("setting is open")
        setOpenSetting(!openSetting);
    };
    const handlClick = (event)=>{
        if(!menuref.current.contains(event.target)){
            setopenMoreMenu(false);
        }
        
    }
    const menuref = useRef();
    useEffect(()=>{
        document.addEventListener("click",handlClick);
        return ()=>{
            document.removeEventListener("click",handlClick);
        }
    },[]);

    const searchItem = searchedUser.map((user) =>{
        return (
            <Userprofile 
            name={user.data().fullname} 
            photoURL={user.data().photoURL} 
            email={user.data().email}
            userId={user.data().userId}
            key={user.id}
            />
            )
    });

  return (
    <>
        <div className="side-page ">
            <div className="side-page-header">
                <div className="side-page-profile">
                    {props.currentUser.photoURL ? <img src={props.currentUser.photoURL} alt="" />
                    : <img src='/user.png' alt="" />} 
                    <p>{props.currentUser.fullname}</p>  
                </div>
                
                    <div className="menu" onClick={openMore} ref={menuref}>
                        <div className="menu-icon">
                            <CgMoreVertical/>
                        </div>
                        { openMoreMenu && <div className="more-menu">
                            <span>New Group</span>
                            <span>Starred messages</span>
                            <span onClick={setting}>Settings</span>
                            <span onClick={props.signOut}>Logout</span>
                        </div>}   
                    </div>
            </div>
            <div className="search">            
                <div className="search-box">
                    <i className="bi bi-search"></i>
                    <input type="text" name="search" id="search" placeholder='Search here' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                </div>
            </div>
            <div className="side-page-user-profile">
                {
                    searchItem.length > 0 ? (searchItem) : (
                        friendList.map((friend , key) =>
                            <Userprofile  
                            name={friend.data().fullname} 
                            photoURL={friend.data().photoURL}
                            userId={friend.data().userId}
                            lastMessage={friend.data().lastMessage} 
                            email={friend.data().email}
                            key={key}
                            />
                        )
                    )
                }
                
                             
                           
            </div>
            { openSetting && <Settingpage setOpenSetting={setOpenSetting} currentUser={props.currentUser}/>}
        </div>
    </>
  )
}

export default Sidepage;