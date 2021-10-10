import React from "react";
import image404 from "../../images/bluegg.jpg";
import style from "./404Page.module.css";

const Page404 = () => {
  return (
    <div className={style.imgWrapper}>
      <img src={`${image404}`} alt="404" />
    </div>
  );
};

export default Page404;
