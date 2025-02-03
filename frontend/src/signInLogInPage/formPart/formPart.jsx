import { useState } from "react"
import LogInForm from "./formPart/logInForm/logIn"
import SignInForm from "./formPart/signIn/signIn"

const FormPart = () => {
    const [formType, setFormType] = useState("Log In")

    return (
        <div className="flex flex-col w-full lg:w-[50%] items-center" >
            <div className=" mt-10 lg:mt-40 2xl:mt-40">
                <div className="h-12 w-60">
                    <div className="relative bg-opacity-85 bg-gray-400 border border-gray-500 flex justify-center items-center rounded-full h-full w-full ">
                        <button onClick={()=>setFormType("Log In")} className="w-20 h-full flex-grow rounded-r-full z-20">Log In</button>
                        <button onClick={()=>setFormType("Sign In")} className="w-20 h-full flex-grow rounded-l-full z-20">Sign In</button>
                        <div className={`  absolute top-[2px] transition-all duration-700 ${formType === "Log In" ?"left-[2px]":"left-[calc(100%-2px)] -translate-x-[100%]"} w-[calc(50%-4px)] h-[calc(100%-4px)] bg-white z-10 rounded-full`}></div>
                    </div>
                </div>  
            </div>
            {formType === 'Log In' ? <LogInForm /> : <SignInForm />}
        </div>
    )
}
export default FormPart