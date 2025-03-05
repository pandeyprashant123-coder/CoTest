import React from "react";
import TopLetter from "../TopLetter";

const DemoVideo = () => {
  //   const iframeUrl = `https://www.youtube.com/embed/${videoId}`
  const iframeUrl = "";
  return (
    // <div className="flex flex-col items-center justify-center w-[70%] mx-auto gap-10">
    //   <div>Demo Video</div>
    //   <div className="relative pb-9/16 overflow-hidden rounded-lg shadow-lg">
    //     {/* <iframe
    //       className="absolute top-0 left-0 w-full h-full"
    //       src={iframeUrl}
    //       frameBorder="0"
    //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //       allowFullScreen
    //       title="YouTube Video"></iframe> */}

    //     <iframe
    //       width="560"
    //       height="315"
    //       src="https://www.youtube.com/embed/FrhCAn76f_c?si=bKRCVnUyq4-gXtqe"
    //       title="CoTest Demo Video"
    //       frameborder="0"
    //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //       referrerpolicy="strict-origin-when-cross-origin"
    //       allowfullscreen></iframe>
    //   </div>
    // </div>
    <div className="flex flex-col mx-auto md:w-[80%] w-[90%] xl:w-[60%] gap-9">
      <div className="container mx-auto px-4 md:px-0">
        <TopLetter content={"Demo"} />
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold  mb-4">
            CoTest Demo Video
          </h2>
          {/* <p className="text-gray-100 max-w-2xl mx-auto">
            Everything you need to manage and grow your business in one powerful
            platform.
          </p> */}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/1A6hgnekZ1k?si=iwv5NY0Jm04aCFj0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DemoVideo;
