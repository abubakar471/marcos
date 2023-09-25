"use client"

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { SignIn } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

const Home = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    //   axios config
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post("/subscribe-newsletter", {
                email
            })

            if (data.success) {
                setEmail("");
                alert(data.message);
            }
        } catch (err) {
            if (err?.response?.status === 401) {
                alert(err.response.data.message);
            } else {
                console.log(err);
                alert("Something went wrong! Please try again later.");
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />

            <header style={{
                background: `#00405E url("/images/hero1.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundBlendMode: "darken"
            }} className="w-full min-h-screen max-h-[100%] before:bg-[#00405E]">

                <div className="w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] mx-auto pt-8 flex justify-end">
                    <div className="w-[100%] md:w-[50%] lg:w-[50%] xl:w-[50%]">
                        <h1 className="text-white text-4xl my-4 flex items-center justify-between">Marcos <span className="p-2 text-sm bg-gradient-to-r from-blue-500 to-teal-700">Your guide in privacy</span></h1>
                        <h1 className="text-2xl text-white">We Help You To Securely Save
                            Your <span className="text-teal-600">Password & Time</span>
                        </h1>
                        <h1 className="text-lg text-white">
                            We save your credentials through hashed algorithm , so there is no chance of data breach.
                            We provide outlook on various possible opportunities around tech industries. Feel free to
                            subscribe to our newsletter for regular updates and check out
                            marcos <Link href="/blog"
                                className="text-teal-500 transition-all duration-300 
                            ease-in hover:underline">blog</Link> to receive lateset tech industry news.
                        </h1>

                        <form onSubmit={handleSubscribe} className="w-full mt-4 relative">
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                type="email"
                                placeholder="Enter email to subscribe to newsletter"
                                className="p-2 outline-none border-none indent-1 w-full
                            placeholder:text-gray-600 placeholder:text-[12px] rounded-full" />
                            <BsFillSendFill size={20} className="text-blue-600 
                            absolute top-1/2 transform -translate-y-1/2 right-3" />
                        </form>

                        <div className="py-2 pb-2 text-sm mt-6">
                            <h3 className="text-white text-sm border-white border-b-white border-1">Social Partners Sponsored By</h3>
                            <div className="flex items-center gap-x-1">
                                <img src="/images/social1.png" alt="" loading="lazy" className="w-[30px] h-[30px]" />
                                <img src="/images/social2.png" alt="" loading="lazy" className="w-[30px] h-[30px]" />
                                <img src="/images/social3.png" alt="" loading="lazy" className="w-[30px] h-[30px]" />
                                <img src="/images/social4.png" alt="" loading="lazy" className="w-[30px] h-[30px]" />
                                <img src="/images/social5.png" alt="" loading="lazy" className="w-[30px] h-[30px]" />
                                <img src="/images/social7.png" alt="" loading="lazy" className="w-[30px] h-[30px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* about us */}
            <section className="my-8">
                <div className="w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] mx-auto">
                    <div className="flex items-center justify-center mb-4">
                        <h1 className="text-black text-3xl">
                            About <span className="border-b border-gray-500 text-gray-600">Us</span>
                        </h1>
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap
                     items-center justify-center md:justify-between lg: xl:justify-between">
                        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mx-auto md:mx-0 lg:mx-0 xl:mx-0">
                            <img src="/images/logo4.png" alt="" className="w-[400px] h-[380px]" />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mx-auto md:mx-0 lg:mx-0 xl:mx-0">
                            <div>
                                <p>
                                    Welcome to Marcos, where your digital security is our top priority.
                                    We employ advanced hashed algorithms to safeguard your passwords,
                                    making them impenetrable even to us. Our multi-factor authentication
                                    (MFA) adds an extra layer of protection, ensuring your data remains
                                    safe from intentional breaches. Your privacy and security are our
                                    utmost concern. Choose Marcos and take control of your online
                                    protection today.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* developer */}
            <section>
                <div className="w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] mx-auto py-12">
                    <h1 className="text-3xl">Developer <span className="text-gray-500">-ab devs</span></h1>

                    <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap justify-between mt-12">
                        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                            <img src="/images/developer.jpg" className="w-full h-[300px] rounded-md" />
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                            <div className="px-4 flex flex-col gap-y-2">
                                 <h1 className="text-2xl">Muhammad Abu Bakar Siddique</h1>   
                                 <h2 className="text-xl">Founder & CEO - Marcos</h2>
                                 <h3 className="text-lg">Website : <a href="https://ab-devs.vercel.app/" target="_blank" rel="noopener noreferrer">https://ab-devs.vercel.app/</a> </h3>
                                 <h3 className="text-lg">E-mail : <a href="mailto:abubakar.devs@gmail.com">abubakar.devs@gmail.com</a> </h3>
                                 <h3 className="text-lg break-words">LinkedIn : <a href="https://www.linkedin.com/in/abubakar471/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/abubakar471/</a></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Home