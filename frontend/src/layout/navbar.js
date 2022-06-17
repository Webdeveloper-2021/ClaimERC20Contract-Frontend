import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { smoothScroll } from '../utils';
import Scrollspy from 'react-scrollspy';
import { Collapse } from 'react-collapse';

import { WalletContext } from '../WalletContext';

export const Navbar = () => {
    const history = useHistory();
    const { getValue, connectWallet } = React.useContext(WalletContext);

    const [posedId, setPosedId] = useState("")
    const clickHandler = async (id) => {
        if (!window.location.pathname.endsWith('/')) {
            await history.push("/")
            smoothScroll(`#${id}`)
        } else {
            smoothScroll(`#${id}`)
        }
        setPosedId(id)
    }
    const menu = (param) => (
        <Scrollspy onUpdate={e => {
            if (window.location.pathname === '/' && e && e.id) {
                setPosedId(e.id)}
            }
        } 
            items={ ['banner', 'info', 'roadmap', 'puzzle'] } currentClassName="text-gray-800"
        >
           
            <a href="#banner" onClick={(e) => {e.preventDefault();clickHandler('banner')}} className={`${posedId === "banner" ? "" : "text-gray-300"} ${param} hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-xl font-medium`}>
                Home
            </a>
          
        </Scrollspy>
    )

    const [openMenu, setOpenMenu] = useState(false);
    const toggleMenu = () => setOpenMenu(!openMenu);

    return (
        <div className="spec1">
            {/* <nav className="fixed w-screen dark:bg-gray-800 shadow z-50"> */}
            <nav className="fixed w-screen dark:bg-gray-800 z-50">
                {/* <div className="w-full px-8 bg-white"> */}
                <div className="w-full px-8">
                    <div className="container mx-auto flex items-center justify-between h-16">
                        <div className="w-full justify-between flex items-center">
                            <Link className="flex-shrink-0 text-2xl lg:text-5xl" to="/">
                                {/* Claim */}
                            </Link>
                            <div className="hidden lg:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                {menu("")}
                                </div>
                            </div>
                        </div>
                        <div className="mr-6 flex lg:hidden">
                            <button onClick={toggleMenu} className="text-gray-800 dark:text-white hover:text-gray-800 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                                <svg width="20" height="20" fill="currentColor" className="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <Collapse isOpened={openMenu} theme={{collapse: 'ReactCollapse--collapse', content: 'ReactCollapse--content'}}>
                <div className="lg:hidden h-screen flex flex-col">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
                            {menu("block")}
                        </div>
                        <div onClick={toggleMenu} className="w-full bg-tranparent h-full flex-shrink-1"></div>
                </div>
                </Collapse>
            </nav>
        </div>
    )
}