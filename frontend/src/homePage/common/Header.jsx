
import { IoLogOutOutline } from "react-icons/io5";

import { IoIosArrowBack } from "react-icons/io";
import UserProfileHeader from "../../compnents/UserProfile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Header = () => {
    const color1 = useSelector((state) => state.app.color1)
    const color2 = useSelector((state) => state.app.color2)
    const color3 = useSelector((state) => state.app.color3)
    const isAuthentic = useSelector((state) => state.app.isAuthentic)

    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthentic) {
            navigate("/")
        }
    }, [isAuthentic])

    return (
        <head style={{ backgroundColor: color3 }} className="flex w-[100vw]  justify-between items-center  h-14 lg:h-16  lg:p-5 px-3 border-b z-30 shadow-xl">
            <div className="text-[rgb(0,0,255)] font-extrabold text-5xl md:hidden "><em>T</em></div>
            <div className="hidden md:block"><img className=" h-16" src="logoStraight.png" alt="logo" /></div>
            
            <UserProfileHeader />
        </head>

    )
}

export default Header