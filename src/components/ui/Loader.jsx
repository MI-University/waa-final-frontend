import React from "react";
import { Empty, LoadingCircle } from "./icons";

const Loader = ({ ...props }) => (
  <div
    className={
      "text-center flex-grow h-100 w-full flex flex-col justify-center items-center" +
      props?.className
    }
  >
    <span className="mb-2">
      <LoadingCircle
        width={60}
        height={60}
        className="anim text-xl text-accent"
      />
    </span>
  </div>
);

export default Loader;
