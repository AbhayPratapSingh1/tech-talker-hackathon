import { useDispatch, useSelector } from "react-redux"
import { setCustomPage } from "../slices/customizeSlice"
import CustomPage from "./CustomisePage"
import CycleLoader from "../../loaders/cycle"

const CustomButtonOpen = () => {
    const color1 = useSelector((state) => state.customize.color1)
    // const color2 = useSelector((state) => state.customize.color2)
    const color3 = useSelector((state) => state.customize.color3)
    const open = useSelector((state) => state.customize.customPage)

    const checking = useSelector((state) => state.app.checking)
    console.log("Check", checking);

    const dispatch = useDispatch()
    return (
        <>
            {checking && <div className="z-50 h-screen w-screen bg-white absolute flex justify-center items-center"><CycleLoader /></div>}
            {open && <CustomPage />}
            {open || <button onClick={() => dispatch(setCustomPage(true))} style={{ backgroundColor: color1, color: color3 }} className="  transition-all duration-1000 absolute bottom-2 lg:bottom-12 right-2 lg:right-12  rounded-full z-50 shadow-inner shadow-black h-12 w-12 md:h-20 md:w-20 hover:opacity-90 text-[12px] lg:text-[16px]">Custom</button>}
        </>
    )
}
export default CustomButtonOpen