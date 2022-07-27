import React, { useState,useEffect } from "react";
import axios from "axios";
import Login from './Login'
const Uploaimg = () => {
  const [data, setdata] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

 
  const [profilepic, setprofilepic] = useState("");
  const { name,email,phone,password } = data;
  const handleinput = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const uploadimg = (e) => {
    console.log("aaaaa", e.target.files[0]);
    setprofilepic(e.target.files[0]);
  };

  

  axios.defaults.headers.post["Authorization"] = `Bearer ${localStorage.getItem(
    "authtoken"
  )}`;


  const onsubmit = async (e) => {
    e.preventDefault();
    console.log("pro", profilepic);

    try {
      const formdata = new FormData();
      formdata.append("myFile", profilepic, profilepic.name);
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("phone", phone);
      formdata.append("password", password);
      console.log(formdata);

      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        formdata
      );
      console.log(res);
    } catch (error) {}
  };
  return (
    <>
      <Login/>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h2>uxpload your profile image using multer</h2>

          <form style={{ width: "200px" }} onSubmit={onsubmit}>
            <label htmlFor="classs">enter your name</label>
            <input
              type="text"
              id="classs"
              name="name"
              placeholder="Enter your name ..."
              value={name}
              onChange={handleinput}
            />
            <label htmlFor="city">Enter your email</label>
            <input
              type="text"
              id="city"
              name="email"
              placeholder="Enter your email ..."
              value={email}
              onChange={handleinput}
            />
            <label htmlFor="phone">Enter your phone</label>
            <input
              type="text"
              id="fathersname"
              name="phone"
              placeholder="Enter your phone..."
              value={phone}
              onChange={handleinput}
            />

            <label htmlFor="state">Enter your password</label>
            <input
              type="text"
              id="state"
              name="password"
              placeholder="Enter your password ..."
              value={password}
              onChange={handleinput}
            />

            <label htmlFor="number">select your profile photo</label>

            <input
              type="file"
              id="file"
              multiple
              accept="images/*"
              name="file"
              onChange={uploadimg}
            />
            <input type="submit" value="register" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Uploaimg;
