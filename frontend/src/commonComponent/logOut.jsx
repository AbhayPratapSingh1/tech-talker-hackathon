import React from 'react';
import adjustBrightness from '../commonFunction/colorManager/colorFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize } from '../commonFunction/string';
import { signOut } from '../features/slices/appSlice';

export default function SignOut({setOpenDiv}) {

    const dispatch = useDispatch()
    const color1 = useSelector((state)=>state.app.color1)
    const color2 = useSelector((state)=>state.app.color2)
    const color3 = useSelector((state)=>state.app.color3)
    const data = useSelector((state)=>state.app.data)

    return (
        <div style={{ backgroundColor: adjustBrightness(color2, 50) }} className="z-40 h-screen w-screen absolute top-0 left-0  ">
            <div className=" flex items-center justify-center min-h-screen p-4 ">
                <div style={{ backgroundColor: color3 }} className="  w-full h-auto p-6 flex flex-col justify-center items-center max-w-md relative rounded-3xl shadow-lg">
                    <div style={{ backgroundColor: color2 }} className=" w-full h-20 rounded-t-3xl flex justify-center items-end overflow-hidden relative">
                    </div>
                    <div style={{ backgroundColor: color1 }} className="absolute top-14 left-1/2 transform -translate-x-1/2 h-24 w-24 rounded-full  flex justify-center items-center  shadow-lg" role="img" aria-label="User's profile picture with initial A">
                        <span className="text-white text-4xl">{data?.name?.charAt(0).toUpperCase()}</span>
                    </div>


                    <div className="text-center mt-20">
                        <h2 className="text-2xl font-semibold">{capitalize(data.name)}</h2>
                        <p className="text-gray-600">{data.id}</p>
                        <p className="text-gray-600">{data.phNo}</p>
                    </div>

                    <div className="mt-6 flex space-x-4">
                        <button onClick={()=>dispatch(signOut())} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 active:bg-red-700 transition duration-150" aria-label="Log Out">
                            Log Out
                        </button>
                    </div>
                    <button onClick={()=>setOpenDiv(false)} style={{ backgroundColor: color3, borderColor:adjustBrightness(color2, 50)  }} className='absolute bottom-0 translate-y-1/2 border rounded-full h-10 w-10'>X</button>
                </div>
            </div >
        </div>
    );
}
