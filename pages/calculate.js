import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend)

const Calculate = () => {

    const [formData, setFormData] = useState({
        principal: 0,
        time: 0,
        rate: 0,
        intervals: 0,
    })
    const [sip, setSip] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        async function calculateSIP() {
            try {
                const res = await fetch('http://localhost:3001/users/calculate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                })
                const data = await res.json();
                // setSip(data.sip)
                // setError(null);

                setChartData({
                    labels: data.map((d) => d.label),
                    datasets: [
                        {
                            data: data.map((d) => d.value),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)'
                            ],
                            borderWidth: 1,
                        }
                    ]
                })

                if (res.ok) {
                    setSip(data);
                }
            } catch (error) {
                setError(error)
            }
        }
        calculateSIP()
    }


    return (
        <>
            <Navbar authLink={'/logout'} authType={'Log Out'} />

            <div id="defaultModal" class="bg-white dark:bg-gray-800 overflow-y-auto overflow-x-hidden flex justify-center content-center w-full md:inset-0 md:h-full p-16">
                <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div class="relative p-4 bg-slate-100 rounded-lg shadow dark:bg-gray-900 sm:p-5">
                        {/* <!-- Modal header --> */}
                        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 class="font-karla text-lg font-semibold text-gray-900 dark:text-white">
                                Calculate SIP
                            </h3>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form onSubmit={handleSubmit}>
                            <div class="grid gap-4 mb-4 sm:grid-cols-2 font-inter">
                                <div>
                                    <label for="principal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Principal</label>
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        name="principal"
                                        id="principal"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Type amount you'll invest"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label for="rate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rate</label>
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        name="rate"
                                        id="rate"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Expected rate of return"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        name="time"
                                        id="time"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Investment duration in months"
                                        required=""
                                    />
                                </div>
                            </div>
                            <button type="submit" class="font-inter text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Calculate
                            </button>
                        </form>
                    </div>
                    <div class="flex justify-center content-center m-10 font-karla">
                        <div class="block max-w-sm p-6 bg-slate-100 rounded-lg shadow-md dark:bg-gray-900">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Systematic Investment Plan</h5>
                            {chartData && (
                                <Doughnut class="mt-8" data={chartData} />
                            )}
                        </div>
                    </div>
                </div>
            </div>




            <Footer />

        </>
    )
}

export default Calculate;