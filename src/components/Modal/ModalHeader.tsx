import { IoMdClose } from "react-icons/io";
import { ModalHeaderProps } from "../../models/PropTypes";
import Logo from "../../assets/images/logo.svg";
const ModalHeader = ({
  className,
  closeModal,
  children,
}: ModalHeaderProps) => {
  return (
    <div
      className={
        (className ? className + " " : "") +
        "flex flex-col rounded-t-xl"
      }
    >
      <div className="flex flex-row justify-between items-center">
        <div className="inline-block text-center text-primary">
          {/* <img src={Logo} className="h-[2rem] w-auto m-auto"></img> */}
        </div>
        <IoMdClose
          className="cursor-pointer font-bold text-2xl text-white"
          onClick={closeModal}
        />
      </div>
      {children}
    </div>
  );
};

export default ModalHeader;
