import React, { createRef, useRef, useEffect, useState } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "firebase/storage";
import { firebase } from "../lib/firebase";
import { db } from "../lib/firebase";
import Button from "@material-ui/core/Button";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import TextField from "@material-ui/core/TextField";
import { MdQuestionAnswer } from "react-icons/md";

const uploadImage = (blob: any, callback: any) => {
  const storageRef = firebase.storage();
  storageRef
    .ref("images/")
    .put(blob)
    .then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url: string) => {
        callback(url, "alt text");
      });
    });
};

const EditorComponent = () => {
  const [data, setData] = useState<any>([]);
  const [markdowns, setMarkdown] = useState<any>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    getPost();
  }, [markdowns]);

  const getPost = async () => {
    db.collection("forum")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap: any) => {
        const dataSet = snap.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(dataSet);
      });
  };

  const editorRef: any = React.createRef();
  const getMarkdown = async () => {
    let markdown = editorRef.current.getInstance().getMarkdown();
    setMarkdown(markdown);

    const markdownRef = await db.collection("forum").doc();
    markdownRef
      .set(
        {
          markdown: markdown,
          title: title,
          createdAt: new Date(),
        },
        { merge: true }
      )
      .then(function () {
        location.reload();
      });
  };

  return (
    <div className="container">
      <TextField
        value={title}
        variant="outlined"
        label="タイトル"
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "50%" }}
      />

      <Editor
        ref={editorRef}
        previewStyle="vertical"
        height="500px"
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }], colorSyntax]}
        hooks={{
          addImageBlobHook: (blob, callback) => {
            uploadImage(blob, callback);
            return false;
          },
        }}
      />
      <div>
        <Button variant="contained" color="primary" onClick={getMarkdown}>
          POST
        </Button>
      </div>
      <br />
      <h2>
        All Potsts <span>({data.length})</span>
      </h2>
      <div className="post">
        {data.map((each: any) => (
          <li
            className="indivisual"
            key={each.id}
            style={{ listStyle: "none" }}
          >
            <h3 className="title">
              <MdQuestionAnswer /> {each.title}
            </h3>
            <hr />
            <Viewer
              initialValue={each.markdown}
              plugins={[
                [codeSyntaxHighlight, { highlighter: Prism }],
                colorSyntax,
              ]}
            />
          </li>
        ))}
      </div>
    </div>
  );
};

export default EditorComponent;
