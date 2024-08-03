import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

  const [user, setUser] = useState({
    email: "",
    discordId: "",
    password: "",
    confirmPassword: ""
  })

  const navigate = useNavigate();

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/v1/owner/signup", user);
      alert(response.data.msg);

      if(response.status === 201){
        navigate("/home");
      }

    } catch (error) {
      console.error("Error:", error.response.data.msg); 
    }
  }

  return (
    <div className="h-screen flex justify-center">
      <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 border shadow-lg">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox placeholder="" label={"Email"} onChange={onChange} name={"email"}/>
          <InputBox placeholder="" label={"Discord ID"} onChange={onChange} name={"discordId"}/>
          <InputBox placeholder="" label={"Password"} onChange={onChange} name={"password"}/>
          <InputBox placeholder="" label={"Confirm Password"} onChange={onChange} name={"confirmPassword"}/>
          <div className="pt-4">
            <Button label={"Sign up"} onClick={onClick}/>
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
}
 export default Signup;