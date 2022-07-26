import React, { useState, useEffect } from "react";
import axios from "axios";
const Login = () => {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const [info, setinfo] = useState("");
  const { email, password } = data;
  const handleinput = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  axios.defaults.headers.get["Authorization"] = `Bearer ${localStorage.getItem(
    "authtoken"
  )}`;

  const getuserinfo = async () => {
    try {
       const res = await axios.get("http://localhost:8080/api/auth/getuserinfo");
      console.log("data user loggr sr", res.data);
      setinfo(res.data);
    } catch (error) {}
  };
  
  useEffect(() => {
    getuserinfo();
  }, []);
  const onsubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email: email,
        password: password,
      });
      console.log(res.data.authtoken);
      localStorage.setItem("authtoken", res.data.authtoken);
    } catch (error) {}
  };

  const logout = () => {
    localStorage.removeItem("authtoken");

    console.log("logout successfully");
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
          <h2>login here</h2>

          <form style={{ width: "200px" }} onSubmit={onsubmit}>
            <label htmlFor="classs">enter your email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email ..."
              value={email}
              onChange={handleinput}
            />
            <label htmlFor="city">Enter your city</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password ..."
              value={password}
              onChange={handleinput}
            />

            <input type="submit" value="login" />
          </form>
        </div>
        <div>
          {info && (
            <>
              {info &&
                info.map((item) => {
                  return (
                    <>
                      <p>this is your city name</p>
                      <p>{item.city}</p>
                      <p>this is your course name</p>
                      <p>{item.classs}</p>
                      <p>this is your fathers name</p>
                      <p>{item.fathersname}</p>
                      <p>this is your state name</p>
                      <p>{item.state}</p>
                    </>
                  );
                })}
            </>
          )}

          <button onClick={logout}>logout</button>
        </div>
      </div>
    </>
  );
};

export default Login;
