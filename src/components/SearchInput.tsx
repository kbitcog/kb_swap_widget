import { ReactNode } from "react";
import { FaSearch } from "react-icons/fa";
export const SearchInput = ({
  onKeywordChange,
  placeholder,
}: {
  onKeywordChange: (searchKey: string) => void;
  placeholder: string;
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onKeywordChange(e.target.value);
  };
  return (
    <div className="flex flex-row item-center bg-black rounded-md border border-solid border-[#CCCED9]/[0.15] hover:border-gray-400 px-4">
      <FaSearch className={'text-label my-auto'} size={18}></FaSearch>  
      <input
        type="text"
        className="bg-transparent w-full text-white px-4 my-4 mx-1 text-md focus-visible:outline-none"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
