import { IoPersonSharp } from "react-icons/io5"
import InputBox from "../../../../commonComponent/input"
import adjustBrightness from "../../../../commonFunction/colorManager/colorFunctions"
import { useState } from "react"
import { FaPhone } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { signInRequest } from "../../../../features/slices/appSlice";
const SignInForm = () => {

    
    const dispatch = useDispatch()
    
    const color1 = useSelector((state)=>state.app.color1)
    const color2 = useSelector((state)=>state.app.color2)
    const color3 = useSelector((state)=>state.app.color3)
    
    const data = useSelector(state=>state.app.data)
    const loading = useSelector(state=>state.app.loading)
    const errorReq = useSelector(state=>state.app.error)
    
    const [error,setError] = useState("")

    const [nm, setNm] = useState("")
    const [gmail, setGmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [phno, setPhno] = useState()
    
    function signIn(){
        setError("")
        if (nm.length<3) {
            setError("Please check the Name")
            return
        }
        if (!gmail.includes("@gmail.com")) {
            setError("Please enter the valid gmail mail")
            return
        }
        if (pwd.length<7) {
            setError("Please enter valid Password")
            return
        }
        if (!phno ||  Math.abs(phno).toString().length!==10) {
            setError("Please enter valid phone no")
            return
        }
        let data = {
            name:nm,
            password:pwd,
            email:gmail,
            phoneNo: phno,
        }
        dispatch(signInRequest(data))

    }

    return (
        <div className="w-full flex flex-col justify-center items-center gap-2 my-10" >
            <div className="w-3/4 lg:w-1/2 flex flex-col gap-5">
                <InputBox icon={<IoPersonSharp />} value={nm} setValue={setNm}  placeHolder={"Name"} id="name" />
                <InputBox icon={<SiGmail />} value={gmail} setValue={setGmail} placeHolder={"Gmail"} id="gmail"  type="gmail" />
                <InputBox icon={<FaPhone />} value={phno} setValue={setPhno} placeHolder={"Phone No"} id="phno"  type="number" />
                <InputBox icon={<MdPassword />} value={pwd} setValue={setPwd} placeHolder={"Password"} id="password"  type="password" />
                <InputBox icon={<MdPassword />} value={pwd} setValue={setPwd} placeHolder={"Password"} id="password"  type="password" />
            </div>
            <div className="text-sm text-red-500">{error}</div>
            <button onClick={()=>signIn()} style={{ backgroundColor: adjustBrightness(color1, 100), color: color3 }} className="border rounded-md px-6 py-2">Sign In</button>
        </div>
    )
}
export default SignInForm