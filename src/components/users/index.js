import React, { useState } from "react";
import { firestore } from "../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useUser } from "../../hooks";
const UserCol = collection(firestore, "Users");
const Users = () => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newIsGraduated, setNewIsGraduated] = useState(Boolean);
  const [selectedId, setSelectedId] = useState(null);
  const [updateButton, setUpdateButton] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { users } = useUser(refresh);
  // console.log("users", users);

  const deleteHandler = async (userId) => {
    await deleteDoc(doc(firestore, "Users", userId));
    setRefresh(!refresh);
  };
  const addUserHandler = async () => {
    const data = {
      name: newName,
      age: Number(newAge),
      email: newEmail,
      isGraduated: newIsGraduated === "true" ? true : false,
    };
    await addDoc(UserCol, data);
    setRefresh(!refresh);
  };
  const editHandler = (userId, userData) => {
    setSelectedId(userId);
    setUpdateButton(true);
    setNewName(userData.name);
    setNewEmail(userData.email);
    setNewAge(userData.age);
    setNewIsGraduated(userData.isGraduated);
    console.log("userData graduated = ", userData.isGraduated);
    console.log("new is graduated = ", newIsGraduated);
  };
  const updateUserHandler = async () => {
    const userDoc = doc(firestore, "Users", selectedId);
    const newFields = {
      name: newName,
      email: newEmail,
      age: newAge,
      isGraduated: newIsGraduated === "true" ? true : false,
    };
    setNewName("");
    setNewEmail("");
    setNewAge("");
    setNewIsGraduated(Boolean);
    await updateDoc(userDoc, newFields);
    setSelectedId(null);
    setUpdateButton(false);
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Users</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedId) {
            updateUserHandler();
          } else {
            addUserHandler();
          }
        }}
      >
        <div>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div>
          <input
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
            placeholder="Age"
          />
        </div>
        <div>
          <label>Is Graduated: </label>
          <select
            defaultValue={newIsGraduated}
            onChange={(e) => setNewIsGraduated(e.target.value)}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div>
          <button type="submit">{updateButton ? "Update" : "Add"}</button>
          {/* <button type="submit">Submit</button> */}
        </div>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Age</td>
              <td>Graduated</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {users.map((doc) => {
              const userId = doc.id;
              const userData = doc.data();
              return (
                <tr key={userId}>
                  <td>{userData.name}</td>
                  <td>{userData.email}</td>
                  <td>{userData.age}</td>
                  <td>{userData.isGraduated == true ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => editHandler(userId, userData)}>
                      Edit
                    </button>
                    <button onClick={() => deleteHandler(userId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
