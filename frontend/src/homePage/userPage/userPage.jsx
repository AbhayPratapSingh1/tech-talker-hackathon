import { FaSearch } from "react-icons/fa"
import adjustBrightness from "../../commonFunction/colorManager/colorFunctions"
import { useState } from "react"
import { capitalize } from "../../commonFunction/string"

const UsersPage = ({ page, users, setSingleUser }) => {
    const [searchUser, setSearchUser] = useState("")
    const color1 = 'rgb(0,0,255)'
    const color2 = 'rgb(0,0,0)'
    const color3 = 'rgb(255,255,255)'
    function openChatsOf(userName) {
        let single = users?.filter(each => each.id === userName.id)
        setSingleUser(single)
    }

    const filterUser = users?.filter(each => each?.name?.toLowerCase()?.includes(searchUser?.toLowerCase()))
    return (
        <div style={{ color: color2, backgroundColor: color3 }} className={`px-2 shrink-0 ${(page === "Users") ? "translate-x-0 lg:translate-x-0 lg:flex" : "lg:flex translate-x-0"} duration-500 w-[calc(100vw-56px)] lg:w-[400px]  h-full flex flex-col overflow-scroll `}>
            <div style={{ borderColor: searchUser ? adjustBrightness(color1, 70) : adjustBrightness(color2, 40), backgroundColor: searchUser ? adjustBrightness(color1, 20) : adjustBrightness(color3, 0) }} className="shrink-0 border rounded-full m-2 h-10  flex justify-center items-center overflow-hidden px-4">
                <input style={{ backgroundColor: adjustBrightness(color1, 0) }} className=" focus:outline-none flex-grow" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} type="text" placeholder="Search User" />
                <div style={{ color: adjustBrightness(color2, 40) }} className="w-4 text-xl"><FaSearch /></div>
            </div>
            <div className="">
                {filterUser && filterUser.length > 0 && filterUser.map((each, index) => {
                    let mess = each.message.length === 0 ? "..." : each.message[each.message.length - 1].message

                    let time = each.message.length === 0 ? "" : each.message[each.message.length - 1].time
                    if (each.message.length != 0) {
                        time = new Date(time);
                        const hours = time.getHours().toString().padStart(2, '0');
                        const minutes = time.getMinutes().toString().padStart(2, '0');
                        time = `${hours}:${minutes}`;
                    }

                    return (
                        <div onClick={() => { openChatsOf(each) }} key={index} className=" cursor-pointer border-b  flex gap-4 justify-between p-1 ">
                            <div className="flex justify-center items-center gap-2">
                                <div style={{ backgroundColor: adjustBrightness(color2, 50), borderColor: color2 }} className="border h-10 w-10 rounded-full flex justify-center items-center ">
                                    <div style={{ color: color3 }} className=" font-extrabold text-xl">{each.name.charAt(0).toUpperCase()}</div>
                                </div>
                                <div className="flex flex-col gap-0.5  ">
                                    <div className="font-semibold leading-tight">{capitalize(each.name)}</div>
                                    <div style={{ color: adjustBrightness(color2, 85) }} className=" text-[14px] ">{mess}</div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-end justify-between">
                                {/* <div className={`rounded-full h-5 w-5  justify-center ${each.noOfText != 0 ? "bg-green-500" : ""} flex  items-center text-[11px]`}>{each.noOfText ? each.noOfText : ""}</div> */}
                                <div className="text-[12px]">{time}</div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
export default UsersPage