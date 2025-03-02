import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CustomisePage from "../commonFunction/customisePage/CustomisePage"
import { setCustom } from "../features/slices/appSlice"

const Cover=({children})=>{
    const dispatch = useDispatch()
    const open = useSelector(state=>state.app.openCustom)
    const color1 = useSelector((state) => state.app.color1)
    const color2 = useSelector((state) => state.app.color2)
    const color3 = useSelector((state) => state.app.color3)
    
    return(
        <div className="">
            {open && <CustomisePage/>}
            {children}
            <button style={{color:color3, backgroundColor:color1 }} className="  fixed rounded-full left-2 bottom-2 z-[50]    h-14 md:h-20 w-14 md:w-20" onClick={()=>dispatch(setCustom(true))}>
                Custom
            </button>
        </div>
    )
}

export default Cover