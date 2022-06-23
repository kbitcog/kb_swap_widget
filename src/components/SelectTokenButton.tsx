import { SelectTokenButtonProps } from "../models/PropTypes";

const SelectTokenButton = ({token, className, launchModal}: SelectTokenButtonProps) => {
  return (
    <button className={(className ? className + " " : "") + "h-10 mr-4 mx-2 flex items-center rounded-full font-medium text-lg max-w-xs"} onClick={launchModal}>
      <span className="flex items-center">
        {token.logoURI && <img src={token.logoURI} alt={token.name} className="h-5 mr-2" />}
      </span>
    </button>
  );
};

export default SelectTokenButton;