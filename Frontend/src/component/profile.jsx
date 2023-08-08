import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [userdata, setUserData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`).then((response) => {
      setUserData(response.data);
    });
  }, [id]);

  return (
    <div className="w-full h-screen flex flex-col justify-center  items-center bg-gray-100">
      <div className="w-[75%] flex justify-center items-center">
        <form className="w-full max-w-lg">
          <h1 className="font-bold text-4xl text-center mb-8 uppercase">
            Candidate Details
          </h1>
          <div className="grid grid-cols-1 gap-5 px-3 mb-6">
            <div className="flex items-center">
              <label className="block font-semibold text-gray-700">
                First Name:
              </label>
              <input
                className="input-field text-2xl ml-3 font-bold uppercase"               id="firstname"
                type="text"
                name="firstname"
                placeholder="Name"
                disabled
                value={userdata.first_name}
              />
            </div>
            <div className="flex items-center">
              <label className="block font-semibold text-gray-700">
                Last Name:
              </label>
              <input
                className="input-field text-2xl ml-3 font-bold uppercase"
                disabled
                id="grid-last-name"
                type="text"
                name="lastname"
                value={userdata.last_name}
              />
            </div>
          </div>
          <div className="flex px-3 mb-6 items-center">
            <label className="block font-semibold text-gray-700">
              Date of Birth:
            </label>
            <input
              className="input-field text-2xl ml-3 font-bold uppercase"
              disabled
              id="grid-password"
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={userdata.dob}
            />
          </div>
          <div className="flex px-3 items-center">
            <label className="block font-semibold text-gray-700">
              Address:
            </label>
            <input
              className="input-field text-2xl ml-3 font-bold uppercase"
              disabled
              id="grid-password"
              type="text"
              name="address"
              placeholder="Address"
              value={userdata.address}
            />
          </div>
        </form>
      </div>
      <Link
        className="border border-blue-600 text-black py-1 px-6 rounded-lg font-semibold mt-4"
        to={"/"}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Profile;
