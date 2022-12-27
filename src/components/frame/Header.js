import Icon from './images/logo.png'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {pages} from "../../constants";
import {NavLink} from "react-router-dom";
import AuthStatusWidget from "../oauth/AuthStatusWidget";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

const navigation = [
    { name: 'Home', to: pages.HOME},
    { name: 'Upload', to: pages.UPLOAD},
    // { name: 'Profile', to: pages.PROFILE},
]

const baseClasses = "ml-5 "
const activeClassName = baseClasses + " text-red-800 border-b-2 border-red-800"

function Header() {
    const auth = useContext(AuthContext);
    const mobileNav = <div className="mt-3 space-y-1">
        {navigation.map((item) => (
            <Disclosure.Button
                key={item.name}
                as="a"
                href={item.to}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
                {item.name}
            </Disclosure.Button>
        ))}
    </div>
    const desktopNav = <ul className={"ml-5 hidden sm:inline"}>
        { navigation.map(e => <NavLink
            key={e.name}
            element={"li"} to={e.to}
            className={({ isActive }) =>
                isActive ? activeClassName : baseClasses
            }
        >
            {e.name}
        </NavLink>)}
    </ul>;

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="border-b border-gray-200 bg-white">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 justify-between">
                                    <div className="flex">
                                        <div className="flex flex-shrink-0 items-center">
                                            <img
                                                className="block h-8 w-auto"
                                                src={Icon}
                                                alt="Captionator 5000"
                                            />
                                            <span className={"text-sm md:text-lg ml-5"}>
                                                Captionator 5000
                                            </span>
                                            {auth.user ? desktopNav : ""}
                                        </div>
                                    </div>
                                    <AuthStatusWidget/>
                                    <div className="-mr-2 flex items-center sm:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="sm:hidden">

                                <div className="border-t border-gray-200 pt-4 pb-3">
                                    <div className="flex items-center px-4">
                                        <AuthStatusWidget isMobile={true}/>
                                    </div>
                                    {auth.user ? mobileNav : ""}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    )
}


export default Header;