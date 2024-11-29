import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setdata] = useState([]);
  const [modelbool, setmodelbool] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);


  const [fname, setfName] = useState("");
  const [lname, setLname] = useState("");
  const [email, setemail] = useState("");
  const [job, setjob] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:1000/");
      if (response.data) {
        setdata(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1000/adduser", {
        firstName: fname,
        lastName: lname,
        email: email,
        job: job,
      });
      if (response) {
        alert("User added successfully");
        setmodelbool(false);
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1000/updateUser", {
        id:editingUserId,
        firstName: fname,
        lastName: lname,
        email: email,
        job: job,
      });
      if (response) {
        alert("User updated successfully");
        setmodelbool(false);
        setIsEditing(false);
        setEditingUserId(null);
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:1000/deleteuser/${id}`);
      if (response) {
        alert("User deleted successfully");
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (user) => {
    setIsEditing(true);
    setEditingUserId(user._id);
    setfName(user.firstName);
    setLname(user.lastName);
    setemail(user.email);
    setjob(user.job);
    setmodelbool(true);
  };

  const closeModal = () => {
    setmodelbool(false);
    setIsEditing(false);
    setEditingUserId(null);
    setfName("");
    setLname("");
    setemail("");
    setjob("");
  };

  return (
    <div className="bg-[#E7E7F1]" style={{ margin: 0, height: "100%", minHeight: "100%", width: "100%" }}>
      <h3 style={{ color: "white", fontSize: 25, textAlign: "center", padding: 10, backgroundColor: "#36454F" }}>Node - MongoDB - React - Task</h3>
      <button
        onClick={() => setmodelbool(true)}
        style={{
          marginLeft: 20,
          color: "gray",
          marginTop: 20,
          justifySelf: "center",
          backgroundColor: "white",
          padding: 10,
          borderColor: "green",
          borderWidth: 1,
        }}
      >
        Add New User
      </button>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          margin: 20,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.map((item) => (
          <div key={item._id} style={{ height: 400, backgroundColor: "white", width: 300, margin: 10 }}>
            <img src={"/profile.png"} style={{ height: 100, width: 100, justifySelf: "center" }} />
            <h3 style={{ color: "gray", fontWeight: "bold", textAlign: "center", padding: 10 }}>
              {item.firstName + " " + item.lastName}
            </h3>
            <div style={{ paddingLeft: 10 }}>
              <h4 style={{ color: "gray", fontWeight: "500" }}>Email:</h4>
              <h4
                style={{
                  color: "white",
                  fontWeight: "400",
                  padding: 10,
                  backgroundColor: "#36454F",
                  borderColor: "white",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
              >
                {item.email}
              </h4>
            </div>
            <div style={{ paddingLeft: 10 }}>
              <h4 style={{ color: "gray", fontWeight: "500", marginTop: 10 }}>Job:</h4>
              <h4
                style={{
                  color: "white",
                  fontWeight: "400",
                  padding: 10,
                  backgroundColor: "#36454F",
                  borderColor: "white",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
              >
                {item.job}
              </h4>
            </div>

            <div style={{ margin: 10 }}>
              <button
                onClick={() => openEditModal(item)}
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: 35,
                  borderColor: "gray",
                  borderWidth: 1,
                  color: "black",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(item._id)}
                style={{
                  color: "#FF5B61",
                  backgroundColor: "white",
                  width: "100%",
                  height: 35,
                  marginTop: 5,
                  borderColor: "#FFC1C3",
                  borderWidth: 1,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modelbool && (
        <div
          style={{
            position: "absolute",
            top: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            height: "100%",
            width: "100%",
          }}
        >
          <div style={{ background: "#36454F", padding: 10, flexDirection: "column", position: "relative" }}>
            <form onSubmit={isEditing ? editUser : addUser}>
              <button
                onClick={closeModal}
                style={{
                  color: "white",
                  marginTop: 20,
                  marginLeft: 20,
                  position: "absolute",
                  right: 10,
                  top: 0,
                  backgroundColor: "gray",
                  padding: 10,
                }}
              >
                Close
              </button>
              <h1 style={{ textAlign: "center", padding: 10, color: "white", fontWeight: "500", marginTop: 50 }}>
                {isEditing ? "Edit User" : "Add New User"}
              </h1>
              <label style={{ color: "white", marginTop: 10 }}>First Name</label>
              <br />
              <input
                value={fname}
                onChange={(e) => setfName(e.target.value)}
                required
                type="text"
                placeholder="First Name"
                style={{ height: 40, width: 400, paddingLeft: 10, marginTop: 10 }}
              />
              <br />
              <label style={{ color: "white", marginTop: 10 }}>Last Name</label>
              <br />
              <input
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                required
                type="text"
                placeholder="Last Name"
                style={{ height: 40, width: 400, paddingLeft: 10, marginTop: 10 }}
              />
              <br />
              <label style={{ color: "white", marginTop: 10 }}>Email</label>
              <br />
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                type="text"
                placeholder="email"
                style={{ height: 40, width: 400, paddingLeft: 10, marginTop: 10 }}
              />
              <br />
              <label style={{ color: "white", marginTop: 10 }}>Job</label>
              <br />
              <input
                value={job}
                onChange={(e) => setjob(e.target.value)}
                required
                type="text"
                placeholder="job title"
                style={{ height: 40, width: 400, paddingLeft: 10, marginTop: 10 }}
              />
              <br />
              <button
                style={{
                  color: "white",
                  marginTop: 20,
                  justifySelf: "center",
                  backgroundColor: "green",
                  padding: 10,
                }}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
