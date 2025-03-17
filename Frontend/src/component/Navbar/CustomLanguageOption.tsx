import React, { useEffect, useRef, useState } from 'react'


const options = [
    {
        value: "en", label: "English", icon:
            <svg
                xmlns="http://www.w3.org/2000/svg"
                 className=' h-full w-full '
                viewBox="0 0 32 32"
            >
                <rect x={1} y={4} width={30} height={24} rx={4} ry={4} fill="#071b65" />
                <path
                    d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z"
                    fill="#fff"
                />
                <path
                    d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z"
                    fill="#b92932"
                />
                <path
                    d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z"
                    fill="#b92932"
                />
                <path
                    d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z"
                    fill="#fff"
                />
                <rect x={13} y={4} width={6} height={24} fill="#fff" />
                <rect x={1} y={13} width={30} height={6} fill="#fff" />
                <rect x={14} y={4} width={4} height={24} fill="#b92932" />
                <rect
                    x={14}
                    y={1}
                    width={4}
                    height={30}
                    transform="translate(32) rotate(90)"
                    fill="#b92932"
                />
                <path
                    d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z"
                    fill="#b92932"
                />
                <path
                    d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z"
                    fill="#b92932"
                />
                <path
                    d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                    opacity=".15"
                />
                <path
                    d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                    fill="#fff"
                    opacity=".2"
                />
            </svg>
    },
    {
        value: "fr", label: "Français", icon:
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                viewBox="0 0 32 32"
            >
                <rect x={1} y={4} width={30} height={24} rx={4} ry={4} fill="#071b65" />
                <path
                    d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z"
                    fill="#fff"
                />
                <path
                    d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z"
                    fill="#b92932"
                />
                <path
                    d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z"
                    fill="#b92932"
                />
                <path
                    d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z"
                    fill="#fff"
                />
                <rect x={13} y={4} width={6} height={24} fill="#fff" />
                <rect x={1} y={13} width={30} height={6} fill="#fff" />
                <rect x={14} y={4} width={4} height={24} fill="#b92932" />
                <rect
                    x={14}
                    y={1}
                    width={4}
                    height={30}
                    transform="translate(32) rotate(90)"
                    fill="#b92932"
                />
                <path
                    d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z"
                    fill="#b92932"
                />
                <path
                    d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z"
                    fill="#b92932"
                />
                <path
                    d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                    opacity=".15"
                />
                <path
                    d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                    fill="#fff"
                    opacity=".2"
                />
            </svg>

    }
];

const CustomLanguageOption = () => {

    const [selected, setSelected] = useState(options[0]);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // ✅ Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-fit h-full" ref={dropdownRef}>
            {/* Selected Option */}
            <button
                className="flex items-center justify-between w-16 h-16 px-2 py-3 border rounded-lg bg-white shadow cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-2">
                    {/* <img src={selected.icon} alt={selected.label} className="w-5 h-5" /> */}
                    {selected.icon}
                </div>
                {/* <span className="text-gray-600">{open ? "▲" : "▼"}</span> */}
            </button>

            {/* Dropdown Menu (Floating, Prevents Parent Expansion) */}
            {open && (
                <div
                    className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-50"
                    style={{ position: "absolute", minWidth: "100%" }}
                >
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setSelected(option);
                                setOpen(false);
                            }}
                        >
                            {/* <img src={option.icon} alt={option.label} className="w-5 h-5" /> */}
                            {option.icon}
                        </div>
                    ))}
                </div>
            )}
        </div>


    );

}

export default CustomLanguageOption