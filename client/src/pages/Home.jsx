import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Home.css";
const Home = () => {
  const [data, setdata] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");

    setdata(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deletecontact = (id)=>{
    if(window.confirm("are you sure wanat to delete this contact ?")){
          axios.delete(`http://localhost:5000/api/remove/${id}`);

         toast.success("Removed contact successfully");
         setTimeout(()=> loadData(),500);
    }
  }
  console.log("data is ", data);
  return (
    <>
      <div style={{ marginTop: "15px" }}>
        <Link to='/addContact'>
        <button className="btn btn-contact">Add Contact</button>
        </Link>
       
        <table className="style-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>NO</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Contact</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.comtact}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button className="btn btn-delete" onClick={()=>deletecontact(item.id)}>Delete</button>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
