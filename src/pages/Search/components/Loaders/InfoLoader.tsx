import React from "react";
import ContentLoader from "react-content-loader";

const InfoLoader = () => (
  <ContentLoader 
    speed={2}
    width={870}
    height={350}
    viewBox="0 0 870 350"
    backgroundColor="#dedede"
    foregroundColor="#f5f5f5"
  >
    <rect x="0" y="0" rx="2" ry="2" width="870" height="350" />
  </ContentLoader>
)

export default InfoLoader;