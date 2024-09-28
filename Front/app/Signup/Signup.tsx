"use client";

import { useState, useEffect } from "react";
import SignupDark from "../Assets/Images/SignupDark.png";
import SignupLight from "../Assets/Images/SignupLight.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import TranslationPair from "../Lib/Types";
import { UserService } from "../Services/UserService";
import Users from "../AdminPanel/Users/Users";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { METHODS } from "http";
import CustomGoogleLoginButton from '../Components/GoogleLogin';


export default function Signup() {

    const userService = new UserService();
    const [language, setLanguage] = useState<string>("ar");
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedLanguage = localStorage.getItem("language") || "ar";
            const storedDir = localStorage.getItem("dir") || "rtl";
            const storedFont = localStorage.getItem("font") || "ArabicFont";

            setLanguage(storedLanguage);
            document.documentElement.dir = storedDir;
            document.body.className = storedFont;

            const handleCustomEvent = (event: Event) => {
                const customEvent = event as CustomEvent<{
                    language: string;
                    dir: string;
                    font: string;
                }>;
                const { language, dir, font } = customEvent.detail;

                setTimeout(() => {
                    setLanguage(language);
                    document.documentElement.dir = dir;
                    document.body.className = font;
                }, 0);
            };

            window.addEventListener("languageChange", handleCustomEvent);

            return () => {
                window.removeEventListener("languageChange", handleCustomEvent);
            };
        }
    }, []);
    
    const SignupTitle: TranslationPair = {
        en: "Join Us !",
        ar: "انضم الينا !"
    };

    const Name: TranslationPair = {
        en: "Full Name",
        ar: "الاسم الكامل"
    };

    const NamePlaceholder: TranslationPair = {
        en: "Enter Your Full Name",
        ar: "ادخل اسمك الكامل"
    }

    const Email: TranslationPair = {
        en: "Email",
        ar: "البريد الالكتروني"
    };

    const EmailPlaceholder: TranslationPair = {
        en: "Enter Your Email",
        ar: "ادخل بريدك الالكتروني"
    };

    const PasswordPlaceholder: TranslationPair = {
        en: "Enter Your Password",
        ar: "ادخل كلمة المرور"
    };

    const Password: TranslationPair = {
        en: "Password",
        ar: "كلمة المرور"
    };

    const SignupButton: TranslationPair = {
        en: "Sign Up",
        ar: "تسجيل"
    };

    const GoogleButton: TranslationPair = {
        en: "Sign Up With Google",
        ar: "تسجيل بواسطة جوجل"
    }
    
    const onSubmitSignup = () => {
        console.log("Signup form submitted !");
        const dto : RegisterRequest = {
            studentName: fullName,
            userName: fullName,
            email: email,
            password: password
        }
        userService.register(dto).then(() =>{
            window.location.href = '/EmailSentSU'
        }).catch((error) => {
            console.log(error)
        });
    };

    async function HandleGoogleSignin(creds: any) {
        // Change it to HTTPS
        var response = await fetch(`http://localhost:5035/api/Auth/Sign-with-Google/`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(creds)
        }
        );
        var token = await response.text()
        if(response.status == 200){
            localStorage.setItem("token" , token);
            window.location.href= "/";
            return ;
        }else{
            alert("Failed to login")
        }
    }

    if(userService.isAuthenicated()){
        window.location.href = '/'
        return;
    }
    return (
        <>
        <GoogleOAuthProvider clientId="106892308567-vgskffcqbqfgdvg58ehfkm62i2a3jvhh.apps.googleusercontent.com">
            <div className="mt-24 w-full flex justify-center dark:bg-[#021526] bg-[#EEEEEE] text-[#03045e] dark:text-[#6EACDA]">
                <div className="w-[90%] flex gap-10 justify-center md:justify-between items-center">
                    <div className="w-[50%] hidden md:flex md:justify-center">
                        <img src={SignupDark.src} alt="Login Dark" className="w-full hidden dark:block" />
                        <img src={SignupLight.src} alt="Login Light" className="w-full block dark:hidden" />
                    </div>
                    <div className="flex flex-col items-center w-[50%]">
                        <div  className="flex flex-col gap-5" >
                            <h1 className="text-2xl md:text-4xl text-center">{SignupTitle[language]}</h1>
                            <div className="mt-5 flex flex-col gap-2">  
                                <label htmlFor="name" className="text-xl md:text-2xl">
                                    {Name[language]}
                                </label>
                                <div className="relative">
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className={`absolute top-3 ${language === "ar" ? "right-3" : "left-3"} text-white dark:text-gray-500`}
                                    />
                                    <input
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder={NamePlaceholder[language]}
                                        className={`w-[300px] md:w-[400px] p-2 ${
                                            language === "ar" ? "pr-10" : "pl-10"
                                        } rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500`}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-xl md:text-2xl">
                                    {Email[language]}
                                </label>
                                <div className="relative">
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className={`absolute top-3 ${language === "ar" ? "right-3" : "left-3"} text-white dark:text-gray-500`}
                                    />
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder={EmailPlaceholder[language]}
                                        className={`w-[300px] md:w-[400px] p-2 ${
                                            language === "ar" ? "pr-10" : "pl-10"
                                        } rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500`}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="text-xl md:text-2xl">
                                    {Password[language]}
                                </label>
                                <div className="relative">
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder={PasswordPlaceholder[language]}
                                        className={`w-[300px] md:w-[400px] p-2 rounded-lg outline-none bg-[#03045e] dark:bg-white text-white dark:text-black placeholder:text-slate-200 dark:placeholder:text-slate-500`}
                                    />
                                    <FontAwesomeIcon
                                        icon={passwordVisible ? faEyeSlash : faEye}
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        className={`absolute top-3 ${language === "ar" ? "left-3" : "right-3"}  text-white dark:text-gray-500 cursor-pointer`}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button onClick={onSubmitSignup} className="mt-10 font-semibold bg-[#03045e] dark:bg-white hover:bg-[#030447] dark:hover:bg-slate-200 text-white dark:text-black p-2 rounded-lg w-[200px] md:w-[300px]">
                                    {SignupButton[language]}
                                </button>
                            </div>
                        </div>
                        <div className="mt-10 relative w-[300px] md:w-[400px] flex items-center">
                            <hr className="flex-grow border-t border-2 border-black dark:border-white" />
                            <span className="mx-4 text-lg font-semibold text-black dark:text-white">or</span>
                            <hr className="flex-grow border-t border-2 border-black dark:border-white" />
                        </div>
                        
                        <GoogleLogin
                            onSuccess={(credentialResponse)=>{
                                var creds = credentialResponse.credential;
                                HandleGoogleSignin(creds)
                            }}
                        >

                        </GoogleLogin>

                    </div>
                </div>
            </div>
            </GoogleOAuthProvider>
        </>
    );
}
