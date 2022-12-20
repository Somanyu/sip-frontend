import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { BsEye, BsEyeSlash } from 'react-icons/bs'

function Login() {

    const [passwordType, setPasswordType] = useState("password")
    const [passwordInput, setPasswordInput] = useState("")

    const handlePasswordChange = (event) => {
        setPasswordInput(event.target.value)
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return
        } else {
            setPasswordType("password")
        }
    }

    return (
        <>
            <Navbar />
            <section class="bg-gray-50 dark:bg-gray-900 -mt-24">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="font-karla text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <form class="font-inter space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <div class="relative">
                                        <input
                                            onChange={handlePasswordChange}
                                            type={passwordType}
                                            value={passwordInput}
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required
                                        />
                                        <div
                                            onClick={togglePassword}
                                            class="text-black absolute right-2.5 bottom-2 font-medium rounded-lg text-xl px-4 py-1 dark:text-white">
                                            {passwordType === "password" ? <BsEye /> : <BsEyeSlash />}

                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Login;