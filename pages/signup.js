import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Router from "next/router";

const SignUp = () => {
    // const [passwordType, setPasswordType] = useState("password")
    // const [passwordInput, setPasswordInput] = useState("")

    // const handlePasswordChange = (event) => {
    //     setPasswordInput(event.target.value)
    // }
    // const togglePassword = () => {
    //     if (passwordType === "password") {
    //         setPasswordType("text")
    //         return
    //     } else {
    //         setPasswordType("password")
    //     }
    // }

    const [formData, setFormData] = useState({});
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        async function fetchData() {
            const res = await fetch('http://localhost:3001/users/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const json = await res.json();

            if (res.ok) {
                setData(json);
                if (json.successMsg) {
                    Router.push('/signup');
                } else {
                    Router.push('/signup');
                }
            } else {
                setError(json.errorMsg)
            }
        }
        fetchData()
    }

    return (
        <>
            <Navbar authLink={"/signin"} authType={'Sign In'} />
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    {data ? (
                        <div class="font-inter p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                            <span class="font-bold">{data.successMsg}</span> You can now sign in.
                        </div>
                    ) : error ? (
                        <div class="font-inter p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            <span class="font-bold">{error}</span> Change a few things up and try submitting again.
                        </div>
                    ) : null}
                    <a href="#" class="font-karla flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"> */}
                        SIP Calculator
                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8 font-inter">
                            <h1 class="font-karla text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onChange={handleChange} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <div class="relative">
                                        <input
                                            onChange={handleChange}
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required
                                        />
                                        {/* <div
                                            onClick={togglePassword}
                                            class="dark:text-white text-black absolute right-2.5 bottom-2 font-medium rounded-lg text-lg px-4 py-1">
                                            {passwordType === "password" ? <BsEye /> : <BsEyeSlash />}

                                        </div> */}
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link href="/signin" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default SignUp;