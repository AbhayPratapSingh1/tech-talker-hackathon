
import { useEffect, useRef, useState } from "react";
import Header from "./common/Header";
import SideBar from "./common/sideBar";
import adjustBrightness from "../commonFunction/colorManager/colorFunctions";

import AddUser from "./addPage/addPage";
import UsersPage from "./userPage/userPage";
import ChatPage from "./chatPage/chatPage";
import { useSelector } from "react-redux";

import { io } from 'socket.io-client';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate()

    const [page, setPage] = useState("Users");
    const [currentId, setCurrentId] = useState("")


    const [allUserData, setAllUserData] = useState([])

    const color1 = useSelector((state) => state.app.color1)
    // const color2 = useSelector((state) => state.app.color2)
    // const color3 = useSelector((state) => state.app.color3)

    const userData = useSelector((state) => state.app.data)

    const [users, setUser] = useState([])

    const socketRef = useRef(null); 
    
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) {
            navigate("/")
        }
        if (!socketRef.current) {
            socketRef.current = io('http://127.0.0.1:5000', {
                query: { userId: userData?.id },
            });

            socketRef.current.on('message', (data) => {
                if (data.type === "users") {
                    setAllUserData(data.data)
                    setUser(data.data)
                }
                if (data.type === "newMessage"){
                    let sender = data.sender
                    let message = data.data.message
                    let time = data.data.time
                    setAllUserData((prev)=>{
                        let index = prev.findIndex(each=>{
                            return each.id===sender
                        })
                        let data = [...prev.filter(each=>each.id !== sender)]
                        let temp = [...prev[index].message]
                        temp.push({message, type:"receive",time})
                        data = [{id:prev[index].id, name:prev[index].name, phNo:prev[index].phNo, message:temp}, ...data]
                        return data
                    })
                }

                if (data.type === "delieverMessage"){
                    let receive = data.receiver
                    let message = data.data.message
                    let time = data.data.time
                    setAllUserData((prev)=>{
                        let index = prev.findIndex(each=>{
                            return each.id===receive
                        })
                        let data = [...prev.filter(each=>each.id !== receive)]
                        let temp = prev[index].message
                        temp.push({message, type:"send",time})
                        data = [{id:prev[index].id, name:prev[index].name, phNo:prev[index].phNo, message:temp}, ...data]
                        
                        return data
                    })
                }
            });

            socketRef.current.on('disconnect', () => {
                console.log('Disconnected from server');
            });
        }
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [])
    
    const setSingleUserFunction = (user) => {
        setPage("Chats")
        setCurrentId(user[0].id)
    }
    const setPageFunction = (word) => {
        if (word === "Users") {
            setCurrentId("")
            setPage("Users")
        }
        if (word === "Add User") {
            setCurrentId("")
            setPage("Add User")
        }
    }
    return (
        <>
            <Header />
                <SideBar page={page} setPage={setPageFunction} />
            <main style={{ backgroundColor: adjustBrightness(color1, 10) }} className="flex h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] overflow-hidden pl-14">
                
                <div className="flex  w-[calc(100vw-56px)] ">
                    <div className={`relative flex shrink-0 ${(page === "Chats") ? "-translate-x-[100%] lg:translate-x-0 lg:flex" : "lg:flex translate-x-0"} duration-500   w-[calc(100vw-56px)] lg:w-[400px]  h-full overflow-hidden`}>
                        <AddUser socketRef={socketRef} page={page} />
                        <UsersPage page={page} users={allUserData} setSingleUser={setSingleUserFunction} />
                    </div>
                    <ChatPage socketRef={socketRef} page={page} user={allUserData} selectedId={currentId} />
                </div>
            </main>
        </>
    )
}


export default HomePage





// import { useEffect, useRef, useState } from "react";
// import Header from "./common/Header";
// import SideBar from "./common/sideBar";
// import adjustBrightness from "../commonFunction/colorManager/colorFunctions";

// import AddUser from "./addPage/addPage";
// import UsersPage from "./userPage/userPage";
// import ChatPage from "./chatPage/chatPage";
// import { useSelector } from "react-redux";

// import { io } from 'socket.io-client';
// import { useNavigate } from "react-router-dom";

// const HomePage = () => {
//     const navigate = useNavigate()

//     const [page, setPage] = useState("Users");
//     const [currentId, setCurrentId] = useState("")


//     const [allUserData, setAllUserData] = useState([])

//     const color1 = useSelector((state) => state.app.color1)
//     // const color2 = useSelector((state) => state.app.color2)
//     // const color3 = useSelector((state) => state.app.color3)

//     const userData = useSelector((state) => state.app.data)

//     const [users, setUser] = useState([])

//     const socketRef = useRef(null); 
//     const repeatFunction = () => {
//         socketRef.current.emit('message', {"type":"",id:userData.id});
//       };
    
//       useEffect(() => {
//         const intervalId = setInterval(repeatFunction, 1000);
//         return () => clearInterval(intervalId);
//       }, []); 

//     useEffect(() => {
//         let token = localStorage.getItem('token')
//         if (!token) {
//             navigate("/")
//         }
//         if (!socketRef.current) {
//             socketRef.current = io('http://127.0.0.1:5000', {
//                 query: { userId: userData?.id },
//             });

//             socketRef.current.on('message', (data) => {

//                 if (data.type === "users") {
//                     setAllUserData(data.data)
//                     setUser(data.data)
//                 }
//             });

//             socketRef.current.on('disconnect', () => {
//                 console.log('Disconnected from server');
//             });
//         }
//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.disconnect();
//                 socketRef.current = null;
//             }
//         };
//     }, [])
    
//     const setSingleUserFunction = (user) => {
//         setPage("Chats")
//         setCurrentId(user[0].id)
//     }
//     const setPageFunction = (word) => {
//         if (word === "Users") {
//             setCurrentId("")
//             setPage("Users")
//         }
//         if (word === "Add User") {
//             setCurrentId("")
//             setPage("Add User")
//         }
//     }
//     return (
//         <>
//             <Header />
//                 <SideBar page={page} setPage={setPageFunction} />
//             <main style={{ backgroundColor: adjustBrightness(color1, 10) }} className="flex h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] overflow-hidden pl-14">
                
//                 <div className="flex  w-[calc(100vw-56px)] ">
//                     <div className={`relative flex shrink-0 ${(page === "Chats") ? "-translate-x-[100%] lg:translate-x-0 lg:flex" : "lg:flex translate-x-0"} duration-500   w-[calc(100vw-56px)] lg:w-[400px]  h-full overflow-hidden`}>
//                         <AddUser socketRef={socketRef} page={page} />
//                         <UsersPage page={page} users={allUserData} setSingleUser={setSingleUserFunction} />
//                     </div>
//                     <ChatPage socketRef={socketRef} page={page} user={users} selectedId={currentId} />
//                 </div>
//             </main>
//         </>
//     )
// }


// export default HomePage

