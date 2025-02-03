import FormPart from "./formPart/formPart"
import ImagePart from "./imagePart/imagePart"
const SignInLogInPage = ()=>{
    return(
        <div className="flex flex-wrap lg:flex-nowrap ">
            <ImagePart/>
            <FormPart/>
            
        </div>
    )
}

export default SignInLogInPage