import { useDispatch, useSelector } from "react-redux"

import { setSideBarPosition } from "../slices/customizeSlice"
import { toggleSideBarWidth } from "../slices/customizeSlice"




const CustomiseSidebar = () => {
    const sideBarPosition = useSelector((state) => state.customize.sideBarPosition)
    const color1 = useSelector((state) => state.customize.color1)
    const color3 = useSelector((state) => state.customize.color3)

    const sideBarFull = useSelector((state) => state.customize.sideBarWidth)
console.log("wid , ",sideBarFull, "pos , ",sideBarPosition)
    const dispatch = useDispatch()


    return (
        <div className="">
            <div className="flex my-4 mx-2 items-center">
                <div className="text-lg flex-grow">
                    Customise your SideBar
                </div>
            </div>

            <div className="flex gap-5 flex-col">
                <hr />
                <div className="w-[290px] flex flex-col gap-5">
                    <div className=" flex w-full justify-between items-center">
                        <p>Position</p>
                        <button onClick={() => dispatch(setSideBarPosition())} style={{ backgroundColor: color3 }} className="border border-gray-500 w-20 h-12 rounded-full p-1">
                            <div style={{ backgroundColor: color1 }} className={`h-full aspect-square rounded-full transition-all duration-1000 ${sideBarPosition ? "" : "translate-x-[88%]"} `}></div>
                        </button>
                    </div>
                    <hr />
                    <div className="hidden md:flex w-full justify-between items-center">
                        <p>Dashboard Width</p>
                        <button onClick={() => {dispatch(toggleSideBarWidth()); console.log("tess");
                        }} style={{ backgroundColor: color3 }} className="border border-gray-500 w-20 h-12 rounded-full p-1">
                            <div style={{ backgroundColor: color1 }} className={`h-full aspect-square rounded-full transition-all duration-1000 ${sideBarFull ? "translate-x-[88%]" : ""} `}></div>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default CustomiseSidebar