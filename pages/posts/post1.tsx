import React from "react";
import { useRouter } from "next/router";

const post1 = (): JSX.Element => {
  const router = useRouter();
  const path = router.asPath;
  return <div>このページのパスは{path}です。</div>;
};

export default post1;
