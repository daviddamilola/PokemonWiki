import React from "react";
import Image from "next/image";

const sanityIoImageLoader = (props) => {
  const { src, quality, width } = props;
  return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
};

const ImageWithLoader = (props: any) => {
  return <Image {...props} loader={sanityIoImageLoader} />;
};

export default ImageWithLoader;
