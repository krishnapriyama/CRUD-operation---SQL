import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const [tabledata, setTabledata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => setTabledata(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (value) => {
    navigate(`/edit/${value.id}`);
  };

  const handleDelete = (value) => {
    axios
      .delete(`http://localhost:3000/users/${value.id}`)
      .then(() => {
        generateSuccess("Delete Successful");
        setTabledata((prevData) =>
          prevData.filter((user) => user.id !== value.id)
        );
      })
      .catch((error) => console.error("Error deleting:", error));
  };

  const generateSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  return (
    <div className="container mx-auto p-4 w-full h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl uppercase p-5">
        Details of Candidates
      </h1>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Date of Birth</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tabledata.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center font-bold text-2xl py-4">
                No data available
              </td>
            </tr>
          ) : (
            tabledata.map((value, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
              >
                <td className="border px-4 py-2 text-center">{value.id}</td>
                <td className="border px-4 py-2 text-center">
                  {value.first_name}
                </td>
                <td className="border px-4 py-2 text-center">
                  {value.last_name}
                </td>
                <td className="border px-4 py-2 text-center">{value.dob}</td>
                <td className="border px-4 py-2 text-center">
                  {value.address}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="btn btn-blue px-4 py-1 rounded-md mr-2 border border-yellow-500"
                    onClick={() => handleEdit(value)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-red px-4 py-1 rounded-md mr-2 border border-red-600"
                    onClick={() => handleDelete(value)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-yellow px-4 py-1 rounded-md border border-blue-600"
                    onClick={() => navigate(`/profile/${value.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ToastContainer />
      <Link
        to="/add"
        className="px-4 py-2 mt-4 block w-2/4 text-black uppercase font-bold text-center rounded-md border border-green-600"
      >
        Add Candidate
      </Link>
    </div>
  );
};

export default Home;
