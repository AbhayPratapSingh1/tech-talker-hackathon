import { useEffect, useState } from "react";
import InputBox from "../../../../commonComponent/input"

import { IoPersonSharp } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import adjustBrightness from "../../../../commonFunction/colorManager/colorFunctions";
import { useDispatch, useSelector } from "react-redux";
import { clearError, logInRequest, setIsAuthentic } from "../../../../features/slices/appSlice";
import { useNavigate } from "react-router-dom";
const LogInForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [id, setId] = useState("")
    const [pwd, setPwd] = useState("")

    const color1 = useSelector((state)=>state.app.color1)
    // const color2 = useSelector((state)=>state.app.color2)
    const color3 = useSelector((state)=>state.app.color3)
    
    const loading = useSelector(state=>state.app.loading)
    const errorReq = useSelector(state=>state.app.error)

    const isAuthentic = useSelector(state=>state.app.isAuthentic)

    
    useEffect(()=>{
        if(isAuthentic){
            navigate("/chats")
        }
        if (localStorage.getItem("tokeb")){
            const currentTimestamp = Math.floor(Date.now() / 1000) + 60*60*1000; 
            if (localStorage.getItem('expiryTime')){
                if (localStorage.getItem('expiryTime') < currentTimestamp){
                    navigate("/chats")
                }
            }
            dispatch(setIsAuthentic(true))
            navigate("/chats")
        }
    },[isAuthentic,dispatch,navigate])

    const [error, setError] = useState("")
    
    function logIn(){
        setError("")
        if (id.length<5){
            setError("Invalid Gmail")
            return
        }
        if (pwd.length<7){
            setError("Invalid password")
            return
        }
        if (!id.includes("@gmail.com")){
            setError("Invalid Id use gmail id please")
            return
        }
        let data = {
            id:id,
            pwd:pwd,
        }
        dispatch(logInRequest(data))
    }
    if (errorReq){
        alert(errorReq)
        clearError()
    }
    
    return (
        <div className="w-full flex flex-col justify-center items-center my-10 gap-2">
            <div className="w-3/4 lg:w-1/2 flex flex-col gap-5">
                <InputBox value={id} setValue={setId} icon={<IoPersonSharp />} placeHolder={"Gmail"} id="gmail" type={"gmail"} />
                <InputBox value={pwd} setValue={setPwd} icon={<MdPassword />} placeHolder={"Password"} id="pwd" type={"password"} />
            </div>
            
            <div className="">{error}</div>

            <button onClick={()=>logIn()} style={{ backgroundColor: adjustBrightness(color1, 100), color: color3 }} className="border rounded-md px-6 py-2">{loading?"loading":"Log In"} </button>
        </div>
    )
}
export default LogInForm