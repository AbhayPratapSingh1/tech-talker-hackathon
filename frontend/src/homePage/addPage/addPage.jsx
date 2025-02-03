import { useDispatch, useSelector } from "react-redux"
import InputBox from "../../commonComponent/input"
import adjustBrightness from "../../commonFunction/colorManager/colorFunctions"
import { useState } from "react"
import { addFriendRequest} from "../../features/slices/appSlice"

const AddUser = ({ page ,socketRef}) => {
    const dispatch = useDispatch()
    const [frId, setFrId] = useState("")

    const color1 = useSelector((state) => state.app.color1)
    const color2 = useSelector((state) => state.app.color2)
    const color3 = useSelector((state) => state.app.color3)

    const user = useSelector(state=>state.app.data)
    const find = useSelector((state) => state.app.find)
    const loading = useSelector((state) => state.app.loading)

    async function findFriend() {
        if (frId===""){
            return
        }
        let data = {
            "id":frId
        }
        dispatch(findFriend(data))    
    }
    
    function addFriend() {
        if (frId===""){
            return
        }
        if(frId === user.id){
            alert("Same User cannt be friend")
            return
        }
        let data = {
            id: user.id,
            fid:frId
        }
        dispatch(addFriendRequest(data))
        console.log("send req");
    }

    return (
        <div style={{ color: color2, backgroundColor: color2 }} className={`z-30 absolute shrink-0 ${(page === "Add User") ? "translate-x-0 lg:translate-x-0 lg:flex" : "lg:flex -translate-x-[100%]"} duration-1000  w-[calc(100vw-56px)] lg:w-[400px]  h-full`}>
            <div style={{ backgroundColor: adjustBrightness(color1, 20) }} className="w-full h-full flex flex-col items-center">
                <div className="text-[100px] mt-8 lg:mt-14">🤝</div>
                <div className="w-3/4 border mt-5 mb-3">
                    <InputBox id="friend Id" placeHolder="Enter the friend ID" value={frId} setValue={setFrId} />
                </div>
                <div style={{ gridTemplateColumns: "1fr auto auto" }} className={`h-auto ${(find && find.find) ? "grid" : "hidden"} grid-col-3 gap-2 my-4`}>
                    <div className="">Name</div>
                    <div className="">:</div>
                    <div className="">{find?.data?.name}</div>

                    <div className="">Email</div>
                    <div className="">:</div>
                    <div className="">{find?.data?.id}</div>

                    <div className="">Phone No</div>
                    <div className="">:</div>

                    <div className="">{find?.data?.phNo}</div>
                </div>
                {find && find.find === 0
                    &&
                    <div className="">
                        Not Found
                    </div>
                }
                <div className="flex gap-4">
                        <button onClick={() => { addFriend()}} style={{ backgroundColor: adjustBrightness(color1, 100), color: color3 }} className={`border rounded-md px-6 py-2 }`}>Add Friend</button>
                </div>
            </div>
        </div>
    )
}


export default AddUser