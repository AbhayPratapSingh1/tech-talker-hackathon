import { useSelector } from "react-redux"
import adjustBrightness from "../../commonFunction/colorManager/colorFunctions"

const ImagePart = () => {
    const color1 = useSelector(state => state.app.color1)
    return (
        <div style={{backgroundColor:adjustBrightness(color1,20)}} className="bgChats h-[40vh] lg:h-screen lg:w-[50vw] flex justify-center items-center  w-full">
            <img className="h-[100%]" src="logo.png" alt="Logo" />
        </div>
    )
}

export default ImagePart