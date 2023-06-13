import { SVGProps } from "react";
import { Empty } from "./icons";

const EmptyPanel = ({ ...props }) => (
  <div className={"text-center" + props?.className}>
    <span className="mb-2">
      <Empty />
    </span>
    <h4>Nothing found</h4>
  </div>
);

export default EmptyPanel;
