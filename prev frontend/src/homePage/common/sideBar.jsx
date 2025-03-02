
import { RiUserAddLine } from "react-icons/ri";

import { FiUsers } from "react-icons/fi";
import { BsChatSquareDots } from "react-icons/bs";
import adjustBrightness from "../../commonFunction/colorManager/colorFunctions";


const SideBar = ({ page, setPage }) => {

    
    const color1 = 'rgb(0,0,255)'
    const color2 = 'rgb(0,0,0)'
    const color3 = 'rgb(255,255,255)'
    return (
        <div style={{ boxShadow: "10px 0 20px rgba(0, 0, 0, 0.25)", backgroundColor: color3 }} className="absolute top-[64px] bg-white z-50 shadow-xl  h-[calc(100vh-64px)] w-14 border-r border-r-gray-500">
            <button onClick={() => setPage("Add User")} style={{ color: page === "Add User" ? color3 : adjustBrightness(color2, 80), borderColor: page === "Add User" ? color3 : adjustBrightness(color2, 80), backgroundColor: page === "Add User" ? adjustBrightness(color1, 70) : "" }} className="  transition-all duration-700 w-10 h-10 m-2 border  rounded-md flex justify-center items-center"><RiUserAddLine className="text-2xl" /></button>
            <button onClick={() => setPage("Users")} style={{ color: page === "Users" ? color3 : adjustBrightness(color2, 80), borderColor: page === "Users" ? color3 : adjustBrightness(color2, 80), backgroundColor: page === "Users" ? adjustBrightness(color1, 70) : "" }} className=" transition-all duration-700 w-10 h-10 m-2 border  rounded-md flex justify-center items-center"><FiUsers className="text-2xl" /></button>
            <button style={{ color: page === "Chats" ? color3 : adjustBrightness(color2, 80), borderColor: page === "Chats" ? color3 : adjustBrightness(color2, 80), backgroundColor: page === "Chats" ? adjustBrightness(color1, 70) : "" }} className=" transition-all duration-700 w-10 h-10 m-2 border  rounded-md flex justify-center items-center"><BsChatSquareDots className="text-2xl" /></button>
        </div>
    )
}

export default SideBar