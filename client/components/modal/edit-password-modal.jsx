import { RxCross1 } from "react-icons/rx";
import { TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/base";

const EditPasswordModal = ({ open, setOpen,
    title, setTitle, platform, setPlatform, email, setEmail, password, setPassword,
    optional, setOptional, handleEditSubmit, editModalData, loading, error, handleDelete, id, setId }) => {
    return (
        <div>
            <div className="mx-auto my-12 w-[90%] md:w-[50%] lg:w-[50%] xl:w-[50%] 
            800px:w-[60%] h-[90vh] 800px:h-[75vh]  overflow-y-auto bg-white shadow-sm rounded-md relative p-4 ">
                <RxCross1
                    size={30}
                    className="absolute right-3 top-3 z-50 cursor-pointer"
                    onClick={() => {
                        setTitle("");
                        setPlatform("");
                        setEmail("");
                        setPassword("");
                        setOptional("");
                        setOpen(false);
                    }}
                />

                <div className="my-4">
                    <h1>Edit password</h1>
                    {error ? (
                        <h2 className="my-2 text-sm text-red-500">{error}</h2>
                    ) : null}
                </div>

                {/* password form */}
                <form onSubmit={handleEditSubmit} className="flex flex-col">
                    <TextField type="text" id="title" label="Title" variant="standard" value={title} onChange={e => setTitle(e.target.value)} />
                    <TextField type="text" id="platform" label="Platform Name" variant="standard" value={platform} onChange={e => setPlatform(e.target.value)} />
                    <TextField type="text" id="standard-basic" label="E-mail or Username" variant="standard" value={email} onChange={e => setEmail(e.target.value)} />
                    <TextField type="text" id="standard-basic" label="Password" variant="standard" value={password} onChange={e => setPassword(e.target.value)} />
                    <TextareaAutosize minRows={3} placeholder="[optional] Backup codes, Security Keys, etc... " value={optional} onChange={e => setOptional(e.target.value)} className="mt-4 outline-none border-b border-gray-700" />
                    <button disabled={loading ? true : false} className="p-2 my-2 bg-blue-700 text-white shadow-sm rounded w-full">
                        {loading ? "please wait..." : "Update"}
                    </button>
                </form>

                <button onClick={() => handleDelete(id)} disabled={loading ? true : false} className="p-2 my-2 bg-red-700 text-white shadow-sm rounded w-full">
                    {loading ? "please wait..." : "Delete"}
                </button>
            </div>
        </div>
    )
}

export default EditPasswordModal