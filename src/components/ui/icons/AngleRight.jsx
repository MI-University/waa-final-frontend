import React, { Component } from "react";

const AngleRight = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 14 28"
      fill="none"
      {...props}
    >
      <path
        d="M0.849976 27.2L11.7166 16.3333C13 15.05 13 12.95 11.7166 11.6667L0.849976 0.799988"
        stroke={props?.color || "#BEBEBE"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AngleRight;
