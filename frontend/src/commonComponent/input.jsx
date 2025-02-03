import adjustBrightness from "../commonFunction/colorManager/colorFunctions"

const InputBox = ({ icon, id, placeHolder, value, setValue,type }) => {
    
    const color1 = 'rgb(0,0,255)'
    const color2 = 'rgb(0,0,0)'
    const color3 = 'rgb(255,255,255)'

    return (
        <div style={{color:value?adjustBrightness(color1, 90):adjustBrightness(color2,50),borderColor:value?adjustBrightness(color1, 90):adjustBrightness(color2,50),backgroundColor:value?adjustBrightness(color1, 10):adjustBrightness(color3,40) }} className="overflow-hidden border rounded-md border-gray-500 bg-white flex gap-2 items-center h-10 py-1 px-2 text-mdoverflow-hidden w-full">
            <div className="">
                {icon}
            </div>
            <input style={{backgroundColor:adjustBrightness(color1,0)}} className="flex-grow focus:outline-none" value={value} onChange={(e) => setValue(e.target.value)} type={type?type:"text"} placeholder={placeHolder} id={id} />
        </div>
    )
}
export default InputBox