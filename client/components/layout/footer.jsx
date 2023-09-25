const Footer = () => {
    return (
        <div className="bg-[#00000e] w-full">
            <div className="w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] mx-auto py-8 flex 
            flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap justify-between">
                <div className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 md:mb-0 lg:mb-0 xl:mb-0">
                    <div className="flex items-center">
                        <img src="/images/logo.png" alt="footer-logo" className="w-[80px] h-[80px]" />
                        <h1 className="text-xl text-white ml-2">marcos</h1>
                    </div>
                    <div>
                        <p className="text-white text-sm mt-2">
                            Trusted partner for authentication and authorize purpose. More than a
                            decade in tech industry made us the best reliable source of information and
                            value.
                        </p>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex flex-col w-1/4">
                        <a className="text-white">Home</a>
                        <a className="text-white">About Us</a>
                        <a className="text-white">Blog</a>
                        <a className="text-white">Services</a>
                        <a className="text-white">Contact</a>
                    </div>

                    <div className="flex flex-col w-1/4">
                        <a className="text-white">Terms & Condition</a>
                        <a className="text-white">Privacy & Policy</a>
                        <a className="text-white">FAQs</a>
                    </div>

                    <div className="flex flex-col w-1/4">
                        <a className="text-white">Developers</a>
                        <a className="text-white">Team & Founders</a>
                        <a className="text-white">AB Devs</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer