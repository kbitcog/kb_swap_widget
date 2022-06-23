import { ModalContainerProps } from "../../models/PropTypes";

const ModalContainer = ({ className, children, width }: ModalContainerProps) => {
    return (
      <div className={(className ? className + " " : "") + "z-30 bg-black absolute left-0 right-0 top-0 bottom-0 w-screen h-screen flex flex-col justify-center items-center"}>
        <div className="w-[28rem] bg-gradient-to-b from-[rgba(19,26,20,1)] to-[rgba(8,8,8,0)] rounded-md p-10">{ children }</div>
      </div>
  );
};

export default ModalContainer;