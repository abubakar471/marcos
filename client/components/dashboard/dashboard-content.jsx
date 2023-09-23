"use client";

import { useEffect, useState } from "react";
// import Modal from "../modal/modal";
import Modal from "@mui/material/Modal";
import ModalContents from "../modal-contents/modal-contents";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { DataGrid } from "@mui/x-data-grid";

const DashboardContent = ({ active }) => {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [optional, setOptional] = useState("");
  const { userId } = useAuth();
  const [passwords, setPasswords] = useState([{}]);

  //   axios config
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // console.log({
      //     title, platform, email, password, optional
      // });

      const { data } = await axios.post(`/create-password`, {
        userId,
        title,
        platform,
        email,
        password,
        optional,
      });

      console.log(data);

      setError(null);
      setTitle("");
      setPlatform("");
      setEmail("");
      setPassword("");
      setOptional("");
      setOpen(false);
    } catch (err) {
      if (err.response.status === 401) {
        setError(err.response.data.message);
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPasswords = async () => {
    const { data } = await axios.post("/get-passwords", {
      userId,
    });
    console.log(data);
    setPasswords(data);
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  //   function CustomNoRowsOverlay() {
  //     return (
  //       <StyledGridOverlay>
  //         <svg
  //           style={{ flexShrink: 0 }}
  //           width="240"
  //           height="200"
  //           viewBox="0 0 184 152"
  //           aria-hidden
  //           focusable="false"
  //         >
  //           <g fill="none" fillRule="evenodd">
  //             <g transform="translate(24 31.67)">
  //               <ellipse
  //                 className="ant-empty-img-5"
  //                 cx="67.797"
  //                 cy="106.89"
  //                 rx="67.797"
  //                 ry="12.668"
  //               />
  //               <path
  //                 className="ant-empty-img-1"
  //                 d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
  //               />
  //               <path
  //                 className="ant-empty-img-2"
  //                 d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
  //               />
  //               <path
  //                 className="ant-empty-img-3"
  //                 d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
  //               />
  //             </g>
  //             <path
  //               className="ant-empty-img-3"
  //               d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
  //             />
  //             <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
  //               <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
  //               <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
  //             </g>
  //           </g>
  //         </svg>
  //         <Box sx={{ mt: 1 }}>No Rows</Box>
  //       </StyledGridOverlay>
  //     );
  //   }

  const rows = [];

  //   passwords &&
  //     passwords.map((p) => {
  //       rows.push({
  //         id: p._id,
  //         title: p.title,
  //         platform: p.platform,
  //         email: p.email,
  //         password: p.password,
  //         optional: p.optional,
  //       });
  //     });

  return (
    <div className="p-4">
      {active === 1 && (
        <div>
          <h1 className="text-2xl">Password Manager</h1>

          <div className="my-4">
            <button
              onClick={() => setOpen(true)}
              className="sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-1/3 p-2 
                            bg-blue-700 text-white rounded-sm"
            >
              Add New
            </button>
          </div>

          {/* all passwords */}
          <div className="my-2">
            {/* search and filter box */}
            <div></div>

            {/* list of all passwords in data grids */}
            {passwords ? (
              <div>
                <DataGrid
                  columns={[
                    { field: "ID" },
                    { field: "Title" },
                    { field: "Platform" },
                    { field: "E-mail or Username" },
                    { field: "Password" },
                    { field: "Optional" },
                  ]}
                  rows={[{id : 1, title : "first title", platform : "google", email : "abdurjoy", password : "kitcat125", optional : 'option'}]}
                  autoHeight
                  sx={{ "--DataGrid-overlayHeight": "300px" }}
                />
              </div>
            ) : (
              <div>
                <h1>No password has been added</h1>
              </div>
            )}
          </div>
        </div>
      )}

      <Modal open={open} onClose={handleClose}>
        <ModalContents
          open={open}
          setOpen={setOpen}
          title={title}
          setTitle={setTitle}
          platform={platform}
          setPlatform={setPlatform}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          optional={optional}
          setOptional={setOptional}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </Modal>
    </div>
  );
};

export default DashboardContent;
