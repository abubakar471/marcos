import { RxCross1 } from "react-icons/rx";
import { TextField } from "@mui/material";

const ModalContents = ({ open, setOpen,
    title, setTitle, platform, setPlatform, email, setEmail, password, setPassword,
    optional, setOptional, handleSubmit, loading }) => {
    return (
        // <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
        //     <div className="w-[90%] 800px:w-[60%] h-[90vh] 800px:h-[75vh] overflow-y-auto bg-white shadow-sm rounded-md relative p-4 ">
        //         <RxCross1
        //             size={30}
        //             className="absolute right-3 top-3 z-50 cursor-pointer"
        //             onClick={() => setOpen(false)}
        //         />
        //     </div>
        // </div>

        <div>
            <div className="mx-auto my-12 w-[50%] 800px:w-[60%] h-[90vh] 800px:h-[75vh]  overflow-y-auto bg-white shadow-sm rounded-md relative p-4 ">
                <RxCross1
                    size={30}
                    className="absolute right-3 top-3 z-50 cursor-pointer"
                    onClick={() => setOpen(false)}
                />

                <div className="my-4">
                    <h1>Create a new password</h1>
                </div>

                {/* password form */}
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <TextField type="text" id="standard-basic" label="Title" variant="standard" value={title} onChange={e => setTitle(e.target.value)} />
                    <TextField type="text" id="standard-basic" label="Platform Name" variant="standard" value={platform} onChange={e => setPlatform(e.target.value)} />
                    <TextField type="text" id="standard-basic" label="E-mail or Username" variant="standard" value={email} onChange={e => setEmail(e.target.value)} />
                    <TextField type="password" id="standard-basic" label="Password" variant="standard" value={password} onChange={e => setPassword(e.target.value)} />
                    <TextField type="text" id="standard-basic" label="[optional] Backup codes , security code or others" variant="standard" value={optional} onChange={e => setOptional(e.target.value)} />
                    <button disabled={loading ? true : false} className="p-2 my-2 bg-blue-700 text-white shadow-sm rounded w-full">
                        {loading ? "please wait..." : "Add to marcos"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ModalContents