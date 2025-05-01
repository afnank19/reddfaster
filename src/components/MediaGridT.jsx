import React from "react";
import Image from "next/image";
import PrefetchLink from "./PrefetchLink";

const MediaGridT = ({ data, nextUrl}) => {
  return (
    <>
      <div className=" gap-4 p-4 items-center md:columns-2 columns-1">
        {data.map((childData, index) => {

          return "image" == "image" ? (
            <div key={index} className="">
              <Image 
                  alt="image from reddit"
                  key={index} 
                  loading="lazy" 
                  src={childData.proxiedUrl.replace(/&amp;/g, '&')} 
                  width="640" 
                  height="640" 
                  className="w-full object-cover rounded-lg m-1 mt-4"
                  quality={80}
              />
              {/* <img
                key={index}
                loading="lazy"
                width="640"
                height="331"
                src={childData.proxiedUrl.replace(/&amp;/g, '&')}
                className="w-full object-cover border border-[#b997db] m-1"
              ></img> */}
            </div>
          ) : null;
        })}
      </div>
      <div className="flex gap-5 py-8 mb-8">
        {/* <Link href={nextUrl} className="text-xl" prefetch={true}>Next</Link> */}
        <PrefetchLink href={nextUrl}>Next</PrefetchLink>
      </div>
    </>
  );
};

export default MediaGridT;