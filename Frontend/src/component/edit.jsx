import { useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"

const Edit = () => {
    const tosthandile = (msg)=>{
        toast.success(msg,{
            position:"bottom-right"
        })
    }
     
  const { id } = useParams();
  const [userdata, SetuserData] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`).then((response) => {
      SetuserData(response.data);
      
    });
  }, [id, userdata]);
  console.log(userdata);
  const formik = useFormik({
    initialValues: {
        firstname: userdata.first_name || "",
        lastname: userdata.last_name || "",
        dob: userdata.dob || "",
        address: userdata.address || "",
    },
    enableReinitialize: true,
    validate: (values) => {
        const errors = {};
      
        if (!values.firstname.trim()) {
          errors.firstname = "Name is required.";
        } else if (values.firstname.length < 2) {
          errors.firstname = "Name should be at least 2 characters long.";
        }
      
        if (!values.lastname.trim()) {
          errors.lastname = "Last Name is required.";
        } else if (values.lastname.length < 2) {
          errors.lastname = "Last Name should be at least 2 characters long.";
        }
      
        if (!values.dob) {
          errors.dob = "Date of Birth is required.";
        }
      
        if (!values.address.trim()) {
          errors.address = "Address is required.";
        } else if (values.address.length < 5) {
          errors.address = "Address should be at least 5 characters long.";
        }
      
        return errors;
      },
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.put(
          `http://localhost:3000/users/${id}`,
          {
            ...values,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.message) {
            tosthandile("Success")
            setTimeout(()=>{
                navigate('/')
            },1000)

        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log(error, "Error from ClientAxios");
      }
    },
  });
  return (
    <>
     <div className="w-full h-screen flex justify-center items-center bg-gray-100">
  <div className="w-[75%] bg-white rounded-lg shadow-lg p-20">
    <form className="max-w-lg mx-auto" onSubmit={formik.handleSubmit}>
      <h1 className="font-bold text-3xl text-center uppercase mb-5">Add Candidate</h1>
      <div className="mb-6">
        <label
          htmlFor="firstname"
          className="block text-black text-sm font-semibold mb-2"
        >
          First Name
        </label>
        <input
          {...formik.getFieldProps("firstname")}
          id="firstname"
          type="text"
          className="w-full h-12 px-4 border rounded focus:outline-none focus:ring focus:border-blue-500"
          placeholder="First Name"
        />
        {formik.touched.firstname && formik.errors.firstname && (
          <div className="text-red-500 text-sm">{formik.errors.firstname}</div>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="lastname"
          className="block text-black text-sm font-semibold mb-2"
        >
          Last Name
        </label>
        <input
          {...formik.getFieldProps("lastname")}
          id="lastname"
          type="text"
          className="w-full h-12 px-4 border rounded focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Last Name"
        />
        {formik.touched.lastname && formik.errors.lastname && (
          <div className="text-red-500 text-sm">{formik.errors.lastname}</div>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="dob"
          className="block text-black text-sm font-semibold"
        >
          Date of Birth
        </label>
        <input
          {...formik.getFieldProps("dob")}
          id="dob"
          type="date"
          className="w-full h-12 px-4 border rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        {formik.touched.dob && formik.errors.dob && (
          <div className="text-red-500 text-sm">{formik.errors.dob}</div>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="address"
          className="block text-black text-sm font-semibold mb-2"
        >
          Address
        </label>
        <input
          {...formik.getFieldProps("address")}
          id="address"
          type="text"
          className="w-full h-12 px-4 border rounded focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Address"
        />
        {formik.touched.address && formik.errors.address && (
          <div className="text-red-500 text-sm">{formik.errors.address}</div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="border border-blue-600 text-black py-2 px-6 rounded-lg font-semibold"
        >
          Update
        </button>
      </div>
    </form>
  </div>
  <ToastContainer />
</div>

    </>
  );
};

export default Edit;
