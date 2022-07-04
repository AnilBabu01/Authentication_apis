import React, { useState } from "react";
import axios from "axios";
const Uploaimg = () => {
  const [data, setdata] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  
  });

  const [profilepic, setprofilepic] = useState("")
  const { name, email, phone, password, } = data;
  const handleinput = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const uploadimg = (e) => {
    console.log("aaaaa", e.target.files[0]);
    setprofilepic(e.target.files[0] );
   
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    console.log("pro", profilepic);
   
    try {
      const formdata = new FormData();
      formdata.append('myFile',profilepic,profilepic.name)
      formdata.append('name',name)
      formdata.append('email',email)
      formdata.append('phone',phone)
      formdata.append('password',password)
      console.log(formdata )
      
      const res = await axios.post("http://localhost:8080/api/auth/register",formdata);
      console.log(res)
    } catch (error) {}
  };
  return (
    <>
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
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name ..."
              value={name}
              onChange={handleinput}
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
            <label htmlFor="phone">phone number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone ..."
              value={phone}
              onChange={handleinput}
            />

            <label htmlFor="number">select your file</label>

            <input
              type="file"
              id="file"
              multiple
              accept="images/*"
              name="file"
              onChange={uploadimg}
            />

            <label htmlFor="password">password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter your password ..."
              value={password}
              onChange={handleinput}
            />
            <input type="submit" value="register" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Uploaimg;
