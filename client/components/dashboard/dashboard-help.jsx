import { TbHelpHexagonFilled } from "react-icons/tb"

const DashboardHelp = () => {
    return (
        <div className="p-4 max-h-[90vh]">
            <div className="flex items-center mb-4">
                <TbHelpHexagonFilled size={30} />
                <h1 className="text-3xl ml-2">Help</h1>
            </div>

            <div>
                <div className="mt-4">
                    <h2 className="text-lg my-2">Creating a password</h2>
                    <p>
                        Click on the "Add New Password" button from the "Password Manager" menu
                        in sidebar. Now, when the modal pops up fill your credentials and click the
                        "Add To Marcos" button. Now your password has been successfully saved. You
                        can now see your password in the list of password manager menu.
                    </p>
                </div>

                <div className="mt-4">
                    <h2 className="text-lg my-2">Editing a password</h2>
                    <p>
                        Double click on a single password row from the data table in password manager
                        menu or simply click on the edit icon from the password row. Now when the edit modal pops up , you can see your content here. Edit
                        your credentials and click on the "Update" button to update your edited
                        credentials.
                    </p>
                </div>

                <div className="mt-4">
                    <h2 className="text-lg my-2">Deleting a password a password</h2>
                    <p>
                        Click on the bin icon from the password row, than it will ask for your
                        confirmation about deleting that password. Click ok if you want to delete it
                        or click cancel if you want to cancel the delete action.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DashboardHelp