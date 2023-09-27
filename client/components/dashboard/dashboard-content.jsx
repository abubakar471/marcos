"use client";

import { useEffect, useState } from "react";
// import Modal from "../modal/modal";
import Modal from "@mui/material/Modal";
import CreatePasswordModal from "../modal/create-password-modal";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { DataGrid } from "@mui/x-data-grid";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEye } from "react-icons/ai"
import { BiEdit } from "react-icons/bi";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import EditPasswordModal from "../modal/edit-password-modal";
import ShowModal from "../modal/show-modal";
import DashboardHelp from "./dashboard-help";

const DashboardContent = ({ active }) => {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const [showModalOpen, setShowModalOpen] = useState(null);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [optional, setOptional] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { userId } = useAuth();
  const [passwords, setPasswords] = useState([]);
  const [noResultMessage, setNoResultMessage] = useState("");

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

      if (data.success) {
        // rows.unshift({
        //   id: data.newPassword._id,
        //   title: data.newPassword.title,
        //   platform: data.newPassword.platform,
        //   email: data.newPassword.email,
        //   password: data.newPassword.password,
        //   optional: data.newPassword.optional
        // })
        fetchPasswords();
        console.log(data);

        setError(null);
        setTitle("");
        setPlatform("");
        setEmail("");
        setPassword("");
        setOptional("");
        setSearchQuery("");
        setOpen(false);
      }


    } catch (err) {
      if (err?.response?.status === 401) {
        setError(err.response.data.message);
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPasswords = async () => {
    setFetchLoading(true);
    try {
      const { data } = await axios.post("/get-passwords", {
        userId,
      });

      if (data.passwords.length === 0) {
        setNoResultMessage("No password has been added");
      }
      setPasswords(data.passwords);
    } catch (err) {
      console.log("error in fetching passwords", err);
      if (err?.name === "AxiosError") {
        setNoResultMessage("Service Currently Off! Please try again later.");
      }
    } finally {
      setFetchLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure?");
    console.log(id);
    if (confirmation) {
      try {
        setOpenBackdrop(true);
        const { data } = await axios.post("/delete-password", {
          id
        });

        if (data.success) {
          setTitle("");
          setPlatform("");
          setEmail("");
          setPassword("");
          setOptional("");
          setSearchQuery("");
          setOpen(false);
          setOpenEditModal(false);
          setShowModalOpen(false);
          fetchPasswords();
        }
      } catch (err) {
        console.log(err);
      } finally {
        setOpenBackdrop(false);
      }
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setOpenEditModal(false);
    try {
      setLoading(true);

      setOpenBackdrop(true);

      const { data } = await axios.post(`/update-password`, {
        id,
        title,
        platform,
        email,
        password,
        optional,
      });

      if (data.success) {
        fetchPasswords();
        alert(data.message);
      }

      setError(null);
      setId("");
      setTitle("");
      setPlatform("");
      setEmail("");
      setPassword("");
      setOptional("");
      setOpenEditModal(false);
    } catch (err) {
      if (err?.response?.status === 401) {
        setError(err.response.data.message);
      }
      console.log(err);
      setOpenEditModal(true);
    } finally {
      setLoading(false);
      setOpenBackdrop(false);
    }
  }

  const handleShowEditSubmit = async (e) => {
    e.preventDefault();
    setOpenEditModal(false);
    try {
      setLoading(true);

      setOpenBackdrop(true);

      const { data } = await axios.post(`/update-password`, {
        id,
        title,
        platform,
        email,
        password,
        optional,
      });

      if (data.success) {
        fetchPasswords();
        alert(data.message);
      }

      setError(null);
      setId("");
      setTitle("");
      setPlatform("");
      setEmail("");
      setPassword("");
      setOptional("");
      setShowModalOpen(false);
    } catch (err) {
      if (err?.response?.status === 401) {
        setError(err.response.data.message);
      }
      console.log(err);
      setShowModalOpen(true);
    } finally {
      setLoading(false);
      setOpenBackdrop(false);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setOpenBackdrop(true);

    try {
      const { data } = await axios.post(`/search/${searchQuery}/${userId}`);

      if (data.success) {
        if (data.passwords.length === 0) {
          setNoResultMessage("Nothing matched your query");
        }
        setPasswords(data.passwords);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setOpenBackdrop(false);
    }
  }

  const handleEvent = (params) => {
    setShowModalOpen(true);
    setId(params.row.id);
    setTitle(params.row.title);
    setPlatform(params.row.platform);
    setEmail(params.row.email);
    setPassword(params.row.password);
    setOptional(params.row.optional);
  }

  useEffect(() => {
    fetchPasswords();
  }, []);

  useEffect(() => {
    if (searchQuery.length === 0) {
      fetchPasswords();
    }
  }, [searchQuery])


  const rows = [];

  passwords.length > 0 && passwords.forEach((p) => {
    rows.unshift({
      id: p._id,
      title: p.title,
      platform: p.platform,
      email: p.email,
      password: p.password,
      optional: p.optional,
    });
  });

  return (
    <div className="p-4 max-h-[90vh] overflow-y-auto">
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
            <form onSubmit={handleSearch} className="my-2 flex items-center w-full">
              <TextField
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                id="standard-basic" label="search" variant="standard" className="grow" />
              <Button type="submit" variant="outlined" color="primary" className="px-2">Search</Button>
            </form>

            {/* list of all passwords in data grids */}
            {fetchLoading ? (
              <div className="w-full flex items-center justify-center">
                <CircularProgress color="primary" />
              </div>
            ) : (
              passwords.length > 0 ? (
                <div>
                  <DataGrid
                    columns={[
                      { field: "id", headerName: "ID" },
                      { field: "title", headerName: "Title" },
                      { field: "platform", headerName: "Platform" },
                      { field: "email", headerName: "E-mail or Username" },
                      { field: "password", headerName: "Password" },
                      { field: "optional", headerName: "Optional" },
                      {
                        field: "edit",
                        headerName: "Edit",
                        sortable: false,
                        renderCell: (params) => {
                          return (
                            <>
                              <Button onClick={() => {
                                setOpenEditModal(true);
                                setId(params.row.id);
                                setTitle(params.row.title);
                                setPlatform(params.row.platform);
                                setEmail(params.row.email);
                                setPassword(params.row.password);
                                setOptional(params.row.optional);
                              }}>
                                {/* <DriveFileRenameOutlineIcon fontSize="20" color="primary" /> */}
                                <BiEdit size={20} />
                              </Button>
                            </>
                          );
                        },
                      },
                      {
                        field: "delete",
                        headerName: "Delete",
                        sortable: false,
                        renderCell: (params) => {
                          return (
                            <>
                              <Button onClick={() => handleDelete(params.id)}>
                                <MdDeleteForever size={20} />
                              </Button>
                            </>
                          );
                        },
                      },
                      {
                        field: "show",
                        headerName: "Show",
                        sortable: false,
                        renderCell: (params) => {
                          return (
                            <>
                              <Button onClick={() => {
                                setOpenEditModal(true);
                                setId(params.row.id);
                                setTitle(params.row.title);
                                setPlatform(params.row.platform);
                                setEmail(params.row.email);
                                setPassword(params.row.password);
                                setOptional(params.row.optional);
                              }}>
                                <AiFillEye size={20} />
                              </Button>
                            </>
                          );
                        },
                      }
                    ]}
                    rows={rows}
                    autoHeight
                    onRowDoubleClick={handleEvent}
                  />
                </div>
              ) : (
                <div>
                  <h1>{noResultMessage}</h1>
                </div>
              )
            )
            }

          </div>
        </div>
      )}

      {active === 4 && (
        <DashboardHelp />
      )}

      <Modal open={open} onClose={handleClose}>
        <CreatePasswordModal
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

      <Modal open={openEditModal} onClose={() => {
        setError(null);
        setId("");
        setTitle("");
        setPlatform("");
        setEmail("");
        setPassword("");
        setOptional("");
        setOpenEditModal(false);
      }}>
        <EditPasswordModal
          open={openEditModal}
          setOpen={setOpenEditModal}
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
          editModalData={editModalData}
          setEditModalData={setEditModalData}
          handleEditSubmit={handleEditSubmit}
          loading={loading}
          error={error}
          handleDelete={handleDelete}
          id={id}
          setId={setId}
        />
      </Modal>

      <Modal open={showModalOpen} onClose={() => {
        setError(null);
        setId("");
        setTitle("");
        setPlatform("");
        setEmail("");
        setPassword("");
        setOptional("");
        setShowModalOpen(false);
      }
      }>
        <ShowModal
          open={showModalOpen}
          setOpen={setShowModalOpen}
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
          editModalData={editModalData}
          setEditModalData={setEditModalData}
          handleEditSubmit={handleShowEditSubmit}
          loading={loading}
          error={error}
          handleDelete={handleDelete}
          id={id}
          setId={setId}
        />
      </Modal>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 9999 }}
        open={openBackdrop}
        onClick={() => setOpenBackdrop(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div >
  );
};

export default DashboardContent;
