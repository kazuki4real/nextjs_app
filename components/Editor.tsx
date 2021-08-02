import React from "react";
import { Editor } from "@toast-ui/react-editor";
import "codemirror/lib/codemirror.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import "firebase/storage";
import { firebase } from "../lib/firebase";

const uploadImage = (blob: any, callback: any) => {
  console.log("blob.name", blob.name);
  const storageRef = firebase.storage();
  storageRef
    .ref("images/")
    .put(blob)
    .then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url: string) => {
        // return で url を返す必要がある markdown 表示用の url
        console.log("url is...", url);

        callback(url, "alt text");
      });
    });
};

const EditorComponent = () => (
  <Editor
    initialValue="Hello World"
    previewStyle="vertical"
    height="600px"
    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
    hooks={{
      addImageBlobHook: (blob, callback) => {
        uploadImage(blob, callback);
        return false;
      },
    }}
  />
);

export default EditorComponent;
