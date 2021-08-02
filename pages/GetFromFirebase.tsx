import { link } from "fs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import firebase from "firebase";

export async function getStaticProps() {
  const task: any[] = [];
  await db.collection("users").onSnapshot((snapshot: any) => {
    const dataSet = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    task.push(dataSet);
    console.log("task", task);
  });
  return {
    props: {
      task,
    },
  };
}

const GetFromFirebase = ({ task }: any) => {
  const [images, setImages] = useState<any>("/default-user.png");

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
        <Image src={images} alt={images} width={300} height={300} />
        <input type="file" name="" onChange={(e) => handleImageUpload(e)} />
      </div>
      <ul>
        {task ? (
          task.map((data: any, index: number) => <li key={index}>{data.id}</li>)
        ) : (
          <p>nothing</p>
        )}
      </ul>
    </div>
  );
};

export default GetFromFirebase;
