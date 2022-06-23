import { ReactNode } from "react";
export const Tooltip = ({ 
  message, children 
} : {
  message: string, children: ReactNode 
}) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex group-hover:min-w-max">
        <span className="relative z-10 px-4 py-4 text-xs leading-none  text-main shadow-lg bg-black rounded border-2 border-main">{message}</span>
        {/* <div className="w-3 h-3 -mt-2 rotate-45 bg-main"></div> */}
      </div>
    </div>
  );
};

export default Tooltip;