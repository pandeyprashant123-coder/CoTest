import ImportRepo from "@/components/ImportRepo";
import React from "react";
import Head from "next/head";

const Check = () => {
  return (
    <>
      <Head>
        <title>check page</title>
        <meta property="og:description" content="a good chack page" />
      </Head>
      <div className="font-[Inter]">
        <div>
          <ImportRepo />
        </div>
      </div>
    </>
  );
};

export default Check;
