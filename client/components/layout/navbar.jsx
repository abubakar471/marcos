const Navbar = () => {
    return (
        <nav 
        className="w-full bg-blend-darken bg-gradient-to-tr from-[#000E11] via-[#00405E] 
        to-[#00202D] outline-transparent border-collapse">
            <div className="w-[90%] mx-auto py-4 flex items-center justify-between">
                <div className="text-gray flex items-center">
                    <img src="/images/logo.png" alt="logo" loading="lazy" className="w-[30px] h-[30px]" />
                    <span className="ml-1 text-white">marcos</span>
                </div>

                <div className="flex items-center gap-x-2">
                    <a href="/dashboard" className="rounded-full p-2 text-sm 
                    border-2 border-blue-500 text-blue-500">
                       Get Started
                    </a>
                    <a href="/sign-in" className="rounded-full p-2 text-sm 
                    bg-gradient-to-r from-blue-500 to-teal-700 text-white">
                        Join Now
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar