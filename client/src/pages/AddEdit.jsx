import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialdata = {
  name: "",
  email: "",
  contact: "",
};
const AddEdit = () => {
  const [state, setstate] = useState(initialdata);

  const { name, email, contact } = state;
  const nevigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    
     if(!name || !email || !contact)
     {
        toast.error("Please provide value into each input")
     }
     else{

        axios.post("http://localhost:5000/api/post",{
             name,
             email,
             contact
        }).then(()=>{
            setstate({name:"",email:"",contact:""})
        }).catch((err)=> toast.error(err.response.data))
        toast.success("Added successfully")
        setTimeout(() => nevigate("/"), 500);
     }

  };

  const uploadfile =(e)=>{
    console.log(e.target.files[0])
  }
  const handleinput = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };

  
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handlesubmit}
        >
          <label htmlFor="name">upload</label>
          <input
            type="file"
            id="name"
            name="name"
            placeholder="Enter your name ..."
            value={name}
            onChange={uploadfile}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email ..."
            value={email}
            onChange={handleinput}
          />
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            placeholder="Enter your contact ..."
            value={contact}
            onChange={handleinput}
          />

          <input type="submit" value="ADD" />
          <Link to="/">
            <input type="button" value="Go Back" />
          </Link>
        </form>
      </div>
    </>
  );
};

export default AddEdit;
