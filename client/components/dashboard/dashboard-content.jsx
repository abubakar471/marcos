"use client"

import { useState } from "react"
// import Modal from "../modal/modal";
import Modal from '@mui/material/Modal';
import ModalContents from "../modal-contents/modal-contents";

const DashboardContent = ({ active }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [optional, setOptional] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            console.log({
                title, platform, email, password, optional
            });
            setTitle("");
            setPlatform("");
            setEmail("");
            setPassword("");
            setOptional("");
        } catch(err){
            console.log(err);
        } finally{
            setLoading(false);
        }
    }
    
    return (
        <div className="p-4">
            {active === 1 && (
                <div>
                    <h1 className="text-2xl">Password Manager</h1>
                    <div className="my-4">
                        <button onClick={() => setOpen(true)} className="sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-1/3 p-2 
                            bg-blue-700 text-white rounded-sm">Add New</button>
                    </div>
                </div>
            )}

            <Modal open={open} onClose={handleClose}>
                <ModalContents open={open} setOpen={setOpen}
                    title={title} setTitle={setTitle} platform={platform} setPlatform={setPlatform}
                    email={email} setEmail={setEmail} password={password} setPassword={setPassword}
                    optional={optional} setOptional={setOptional} 
                    handleSubmit={handleSubmit} loading={loading}
                />
            </Modal>
        </div>
    )
}



export default DashboardContent