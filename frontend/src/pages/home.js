import React from "react";
import Typing from 'react-typing-animation';
import { ConnectButton } from '../components/connectButton';
import { Navbar } from "../layout/navbar";
const Banner = () => {
    return (
        <>
        <Navbar />
        <div id="banner" style={{
            backgroundImage: "url(/imgs/banner_back.jpg)",
            backgroundSize: "cover",
        }} className=" p-4 lg:p-16">
            <div className="bg-white dark:bg-gray-800 bg-opacity-50 h-screen -m-4 lg:-m-16">
                <div className="container mx-auto flex h-full items-center justify-center ">
                    <div className="text-start py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20 flex items-center flex-col">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                                <Typing loop={true}>
                                    Hello Human ...
                                    <Typing.Delay ms={2000} />
                                    <Typing.Reset delay={5000} />
                                </Typing>
                            </h2>
                        </div>
                        <div className="lg:mt-0 lg:flex-shrink-0">
                            <div className="mt-12 inline-flex">
                                <ConnectButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


export const Home = () => {
    return (
        <main className="spec1">
            <Banner />
        </main>
    )
}