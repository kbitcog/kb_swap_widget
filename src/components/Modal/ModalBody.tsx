import { ModalBodyProps } from "../../models/PropTypes";

const ModalBody = ({className, children}: ModalBodyProps) => {
  return (
    <div className={(className ? className + " " : "") + "overflow-x-hidden my-8 container-snap"}>
      <div className="max-h-[40vh]">
        {children}
      </div>
    </div>
  );
};

export default ModalBody;