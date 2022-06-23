import { ModalFooterProps } from "../../models/PropTypes";

const ModalFooter = ({ className, children }: ModalFooterProps) => {
  return (
    <div className={(className ? className + " " : "") + "py-4"}>
      {children}
    </div>
  );
};

export default ModalFooter;