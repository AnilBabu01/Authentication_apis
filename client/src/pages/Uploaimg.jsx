import React, { useState,useEffect } from "react";
import axios from "axios";
import Login from './Login'
const Uploaimg = () => {
  const [data, setdata] = useState({
    classs: "",
    city: "",
    fathersname: "",
    state: "",
  });

 
  const [profilepic, setprofilepic] = useState("");
  const { classs, city, fathersname, state } = data;
  const handleinput = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
 console.log(info)
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
      formdata.append("classs", classs);
      formdata.append("city", city);
      formdata.append("fathersname", fathersname);
      formdata.append("state", state);
      console.log(formdata);

      const res = await axios.post(
        "http://localhost:8080/api/auth/info",
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
            <label htmlFor="classs">enter your class</label>
            <input
              type="text"
              id="classs"
              name="classs"
              placeholder="Enter your class ..."
              value={classs}
              onChange={handleinput}
            />
            <label htmlFor="city">Enter your city</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter your city ..."
              value={city}
              onChange={handleinput}
            />
            <label htmlFor="phone">Enter father's name</label>
            <input
              type="text"
              id="fathersname"
              name="fathersname"
              placeholder="Enter your father's name..."
              value={fathersname}
              onChange={handleinput}
            />

            <label htmlFor="state">Enter your status</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Enter your password ..."
              value={state}
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
