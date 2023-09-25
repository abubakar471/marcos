import { TbHelpHexagonFilled } from "react-icons/tb"
const Sidebar = ({ active, setActive }) => {
  return (
    <div className="w-full h-[90vh] flex flex-col bg-blue-500 shadow border-r">
      <div className="w-full grow ">
        <div className=" bg-blue-400 text-white p-4">
          <h2>Password Manager</h2>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col mb-2">
          <div className="flex flex-wrap gap-x-2 mb-1">
            <TbHelpHexagonFilled color="white" />
            <span className="text-white text-[12px] hover:underline curspr-pointer">Help</span>
            <span className="text-white text-[12px] hover:underline curspr-pointer">Privacy & Policy</span>
            <span className="text-white text-[12px] hover:underline curspr-pointer">FAQs</span>
          </div>
          <p className="text-white text-[12px] ">&copy; Copyright 2023 | MARCOS | AB DEVS</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar