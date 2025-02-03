import { useDispatch, useSelector } from "react-redux"
import SelectColor from "./SelectColor"
import { setColor1, setColor2, setColor3 } from "../../features/slices/appSlice"


const colors = ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)", "rgb(255,255,0)", "rgb(0,255,255)", "rgb(255,0,255)", "rgb(0,153,153)", "rgb(50,50,50)", "rgb(175,175,175)"]



const CustomiseColor = () => {
    
    
    const color1 = useSelector((state) => state.app.color1)
    const color2 = useSelector((state) => state.app.color2)
    const color3 = useSelector((state) => state.app.color3)

    const dispatch = useDispatch()
    
    function setDefault() {
        dispatch(setColor1("rgb(0,0,255)"))
        dispatch(setColor2("rgb(0,0,0)"))
        dispatch(setColor3("rgb(255,255,255)"))
    }

    return (
        <div className="">
            <div className="flex my-4 mx-2 items-center">
                <div className="text-lg flex-grow">
                    Customise your colors
                </div>
                <button onClick={() => setDefault()} style={{ backgroundColor: color1, color: color3 }} className=" border-2 border-gray-500 px-4 py-2 h-fit rounded-lg">default</button>
            </div>

            <div className="flex gap-5 flex-col">
                <hr />
                <div className="">
                    Main Color
                    <SelectColor func={setColor1} colors={colors} id="customColor1" />
                </div>
                <hr />
                <div className="">
                    Text Color
                    <SelectColor func={setColor2} colors={colors} id="customColor2" />
                </div>
                <hr />
                <div className="">
                    Background Color
                    
                    <SelectColor func={setColor3} colors={colors} id="customColor3" />
                </div>
            </div>
        </div>
    )
}
export default CustomiseColor