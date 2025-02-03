import { useEffect } from "react"
import { useDispatch } from "react-redux"
import hexToRgb from "../hexToRgb"

const SelectColor = ({ func, colors, id }) => {
    

    const dispatch = useDispatch()
    function setCustom(){
        let color = document.getElementById(id).value
        color = hexToRgb(color)
        dispatch(func(color))
    }
    return (
        <div className="flex gap-2 flex-wrap lg:max-w-[90%] items-center">
            {colors && colors.length > 0 && colors.map((each, index) => {
                return (
                    <button onClick={() => dispatch(func(each))} key={index} style={{ backgroundColor: each }} className="h-10 w-10 rounded-full border-gray-200 border-2"></button>
                )
            })}
            <div className="flex-grow"/>
            <div className=" flex items-center gap-3 ">
                <button onClick={()=>{setCustom()}} className="border-gray-500 border-2 p-1 rounded-md">Set Custom</button>
                <div className="h-10 w-10 rounded-full border-gray-200 border-2 overflow-hidden"><input className="h-20 w-20 -translate-x-1/2 -translate-y-1/2" type="color" id={id} /> </div>
            </div>
        </div>
    )
}
export default SelectColor