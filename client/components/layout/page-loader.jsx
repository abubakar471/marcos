import {CircularProgress} from "@mui/material";

const PageLoader = () => {
    return (
        <div className='w-full h-screen bg-[#00000e]'>
            <div className="flex items-center justify-center h-screen">
                <div className="w-[50%] min-h-[300px] mx-auto flex flex-col items-center justify-center">
                    <img src="/images/logo.png" alt="logo" className="w-[70px] h-[70px]" />
                    <h1 className="text-lg text-white">marcos</h1>
                    <div>
                        <CircularProgress className="text-[16px]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageLoader