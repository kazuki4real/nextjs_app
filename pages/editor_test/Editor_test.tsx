import React from "react";
import dynamic from "next/dynamic";

const EditorComponent = dynamic(() => import("../../components/Editor"), {
  ssr: false,
});

const Editor_test = () => (
  <div>
    <EditorComponent />
  </div>
);

export default Editor_test;
