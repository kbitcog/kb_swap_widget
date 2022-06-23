import { useState } from "react";
import { SwitchProps } from "../models/PropTypes";


const Switch = ({ className, toggled, label }: SwitchProps) => {

    const [toggle, setToggle] = useState(true);
    const toggleClass = " transform translate-x-6";

    return (
        <div  className={(className ? className + " " : "") + "flex flex-row items-center"}>
                {label && <p className="text-label text-sm mr-3">{label}</p> }
                <div
                    className={(className ? className + " " : "") + "md:w-12 md:h-7 w-10 h-5 flex items-center bg-main rounded-full p-1 cursor-pointer"}
                    onClick={() => {
                        toggled(!toggle);
                        setToggle(!toggle);

                    }}
                >
                    {/* Switch */}
                
                    <div
                        className={
                            "bg-white md:w-4 md:h-4 h-3 w-3 rounded-full shadow-md transform duration-300 ease-in-out" +
                            (toggle ? null : toggleClass)
                        }
                    ></div>
                    </div>
            </div>
            );
};

export default Switch;
