"use client"

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
                backgroundImage: `url("/images/hero1.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }} className="w-full min-h-screen max-h-[100%]">

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
                            placeholder:text-gray-600 rounded-full" />
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
            {/* <section>
                <div className="w-1/2">
                    image
                </div>
                <div className="w-1/2">
                    <h1>About Us</h1>
                    <div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Rem eius reiciendis libero expedita deleniti quas blanditiis
                            voluptate tempora labore, illum voluptatum pariatur veritatis
                            odit unde officiis. Libero numquam veritatis quod?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Rem eius reiciendis libero expedita deleniti quas blanditiis
                            voluptate tempora labore, illum voluptatum pariatur veritatis
                            odit unde officiis. Libero numquam veritatis quod?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Rem eius reiciendis libero expedita deleniti quas blanditiis
                            voluptate tempora labore, illum voluptatum pariatur veritatis
                            odit unde officiis. Libero numquam veritatis quod?
                        </p>
                    </div>
                </div>
            </section> */}
        </div>
    )
}

export default Home