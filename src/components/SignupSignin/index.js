import React, { useState } from 'react'
import "./style.css"
import Input from '../Input';
import Button from '../Button';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import {auth, db} from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";

function SignupSigninComponent() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [loginForm,setLoginForm]  = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  
  function signWithEmail(){
    setLoading(true);
   console.log("Enter Name:",name);
   console.log("Enter Email:",email);
   console.log("Enter Password:",password);
   console.log("Enter Confirm Password:",confirmPassword);

   //Authenticate the user or basically create a new account using email & pass
   if(name != "" && email != "" && password != "" && confirmPassword != ""){
    if(password==confirmPassword){
   createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
     // Signed in
     const user = userCredential.user;
     console.log("user>>",user);
     toast.success("User Created");
     setLoading(false);
     setName("");
     setEmail("");
     setPassword("");
     setConfirmPassword("");
     createDoc(user);
     navigate('/dashboard');
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     toast.error(errorMessage);
     setLoading(false);
     // ..
   });
  }
  else{
    toast.error("Password and confirm password don't match");
    setLoading(false);
  }}
  else{
    toast.error("All fields are mandatory");
    setLoading(false);
  }
  }
  function LoginWithEmail(){
    console.log("Enter Email:",email);
    console.log("Enter Password:",password);
    
    if(email != "" && password != ""){
      // login with email and password firebase
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      toast.success("User Logged In!");
      console.log("User Logged in",user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
    });
    }else{
       toast.error("All fields are mandatory")
      }
  
  }

  async function createDoc(user){
     // create a document with user id as following id
     // Make sure that the doc with uid doesn't exist
    //  https://firebase.google.com/docs/firestore/manage-data/add-data

     if(!user) return;

     const userRef = doc(db,"users",user.uid);
     const userData = await getDoc(userRef);


     if(!userData.exists()){
      try{
        await setDoc(doc(db, "users",user.uid),{
        name: user.displayName ? user.displayName : name,
      email,
      photoURL: user.photoURL ? user.photoURL : "",
      createAt,
     });
     toast.success("Doc created!");
      }
      catch(e){
        toast.error(e.message)
      }
    }
  }
  return (
    <>
    {loginForm ? (
      <div className='signup-wrapper'>
      <h2 className="title" style={{color:"var(--black)"}}>
        Login to <span style={{color:"var(--chartreuse)"}}>Financely.</span></h2>
    <form>
        <Input label={"Email"}
        state={email} 
        type="email"
        setState={setEmail}
        placeholder={"JohnDoe@gmail.com"}/>

        <Input label={"Password"}
        state={password} 
        type="password"
        setState={setPassword}
        placeholder={"Example@123"}/>

        <Button
        disabled={loading}
         text={loading ? "Loading..." : "Login Using Email and Password"} onClick={LoginWithEmail}/>
        <p className='p-login'>OR</p>
        <Button text={loading ? "Loading..." : "Login Using Google"}
         green={true} style={{color:"var(--white)"}}/>
        <p className='p-login' onClick={()=>setLoginForm(!loginForm)} style={{cursor:'pointer'}}>
          Or Don't Have An Account? Click Here
        </p>
    </form>
    </div>
    ):(
      <div className='signup-wrapper'>
      <h2 className="title" style={{color:"var(--black)"}}>Sign Up on <span style={{color:"var(--chartreuse)"}}>Financely.</span></h2>
    <form>
      <Input label={"Full Name"}
        state={name} 
        setState={setName}
        placeholder={"John Doe"}/>
 
        <Input label={"Email"}
        state={email} 
        type="email"
        setState={setEmail}
        placeholder={"JohnDoe@gmail.com"}/>

        <Input label={"Password"}
        state={password} 
        type="password"
        setState={setPassword}
        placeholder={"Example@123"}/>
        <Input type="password" label={"ConfirmPassword"}
        state={confirmPassword} 
        setState={setConfirmPassword}
        placeholder={"Example@123"}/>

        <Button
        disabled={loading}
         text={loading ? "Loading..." : "Signup Using Email and Password"} onClick={signWithEmail}/>
        <p className='p-login'>OR</p>
        <Button text={loading ? "Loading..." : "Signup Using Google"}
         green={true} style={{color:"var(--white)"}}/>
         <p className='p-login'  onClick={()=>setLoginForm(!loginForm)} style={{cursor:'pointer'}}>
          Or Have An Account Already? Click Here
        </p>
    </form>
    </div>
    )}
    
    </>
  )
}

export default SignupSigninComponent;