import React from "react";
import Loader from "react-loader-spinner";
import style from "./Loader.module.css";

const Spinner = () => {
  return (
    <>
      <div className={style.spinnerWrapper}>
        <Loader type="BallTriangle" color="#0a121634" height={100} weidht={100} timeout={15000} />
      </div>
    </>
  );
};

export default Spinner;
