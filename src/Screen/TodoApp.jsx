import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../Config/Firebase";

import '../App.css'

const TodoApp = () => {
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const addData = async () => {
    try {
      console.log(input);

      let userObj = {
        input,
      };

      const postData = await addDoc(collection(database, "users"), userObj);

      console.log("postData", postData);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  //   Data get from firebase Firestore Database

  const getData = async () => {
    try {
      const arr = [];
      const getData = await getDocs(collection(database, "users"));

      getData.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });

      setUserData(arr);
    } catch (error) {
      console.log(error);
    }
  };

  //   Data update from firebase Firestore Database

  const EditData = async (id) => {
    console.log("id", id);

    let updateVal = prompt("Enter edit item");

    let updateObj = {
      name: updateVal,
    };

    const updateData = await updateDoc(doc(database, "users", id), updateObj);

    console.log("updateData", updateData);
    setRefresh(!refresh);
  };

  //  Single Data delete from firebase Firestore Database

  const DeleteData = async (id) => {
    const deleteUser = await deleteDoc(doc(database, "users", id));

    setRefresh(!refresh);
  };

  return (
    <div className="container">
      <h1 className="todo">Todo App</h1>

      <input
      className="input"
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Enter items"
      />
      <br />


      <button className="add" onClick={addData} variant="contained">
        Add
      </button>

      {userData.map((e, i) => {
        return (

            <div>
          <h2 className="name" key={i}>
            {e.input} </h2>
            <button className="edit" onClick={() => EditData(e.id)}>Edit</button>
            <button className="dlt" onClick={() => DeleteData(e.id)}>Delete</button>
            </div>
         
        );
      })}
    </div>
  );
};

export default TodoApp;
