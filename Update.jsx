import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");  // ✅ Fixed "fname" to "name"
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  console.log("User ID:", id);

  // ✅ Fetch single user data from correct endpoint
  const getSingleData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${id}`);
      const result = await response.json();

      if (response.ok) {
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Failed to fetch user data");
    }
  };

  // ✅ Update user data
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };  // ✅ Fixed "fname" to "name"

    try {
      const response = await fetch(`http://localhost:5000/api/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Updated user:", result);
        setError("");
        navigate("/read");
      } else {
        setError(result.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    getSingleData();
  }, [id]);  // ✅ Added dependency

  return (
    <div className="container my-2">
      <h1 className="h1 text-center">Edit Data</h1>
      {error && <div className="alert alert-danger"> {error} </div>}
      <form className="form" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-info">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
