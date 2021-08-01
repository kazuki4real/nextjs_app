import { link } from "fs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import firebase from "firebase";

const GetFromFirebase = () => {
  const [datas, setDatas] = useState([]);
  const [images, setImages] = useState<any>("/default-user.png");

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot: any) => {
      const dataSet = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDatas(dataSet);
    });
  }, []);

  const handleImageUpload = (e: any) => {
    // console.log("value", e.target.value.substr(12));
    const filename = e.target.value.substr(12);
    const storage = firebase.storage();
    const storageRef = storage.ref();
    // console.log("storage ref", storageRef);
    const spaceRef = storageRef.child(`images/${filename}`);
    console.log("spaceRef", spaceRef);

    spaceRef
      .getDownloadURL()
      .then((downloadURL: any) => {
        setImages(downloadURL);
      })
      .catch(function (error: any) {
        console.log(error);
      });
    console.log("images", images);
  };

  return (
    <div>
      <div className="image-upload">
        <img
          src={images}
          alt={images}
          style={{ width: "300px", height: "300px" }}
        />
        <input type="file" name="" onChange={(e) => handleImageUpload(e)} />
      </div>
      <ul>
        {datas.map((data: any, index: number) => (
          <li key={index}>{data.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetFromFirebase;
