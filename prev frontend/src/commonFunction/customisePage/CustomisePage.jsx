import { useDispatch, useSelector } from "react-redux"
import { setCustom } from "../../features/slices/appSlice"
import CustomiseColor from "./CustomiseColor"
import adjustBrightness from "../colorManager/colorFunctions"

const CustomisePage = () => {
    const color2 = useSelector((state) => state.app.color2)
    const color3 = useSelector((state) => state.app.color3)

    const dispatch = useDispatch()

    return (
        
        <>
            <div style={{ backgroundColor: adjustBrightness(color3, 95), color: color2 }} className="  transition-all duration-1000 pb-10 p-2 lg:p-10 absolute z-[100] top-1 left-1 lg:top-10 lg:left-10 right-1 bottom-6 lg:right-10 lg:bottom-10 overflow-scroll lg:overflow-auto border border-gray-500 rounded-xl">
                <CustomiseColor />
                <hr className="my-10 h-1 bg-gray-200" />
            </div>
            <button style={{ backgroundColor: adjustBrightness(color3, 100), color: color2, borderColor: color2 }} onClick={() => dispatch(setCustom(false))} className="z-[120] absolute bottom-1 lg:bottom-4 left-1/2 -translate-x-1/2 border rounded-full h-12 w-12 lg:h-16 lg:w-16 text-xl shadow-2xl shadow-inherit">X</button>
        </>


    )
}

export default CustomisePage