import React from "react";
import dynamic from "next/dynamic";

const EditorComponent = dynamic(() => import("../../components/Editor"), {
  ssr: false,
});
const ViewerComponent = dynamic(() => import("../../components/Viewer"), {
  ssr: false,
});

const Editor_test = () => (
  <div>
    <EditorComponent />
    <ViewerComponent />
  </div>
);

export default Editor_test;
