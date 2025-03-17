import React, { useEffect, useRef, useState } from 'react'
import { ArabicSvg, EnglishSvg, FrenchSvg } from './languagesSvg';


const languagesOptions = [
    { label: "English", value: "en", icon: EnglishSvg },
    { label: "Arabic", value: "ar", icon: ArabicSvg },
    { label: "French", value: "fr", icon: FrenchSvg },
];

const CustomLanguageOption = () => {

    const [selected, setSelected] = useState(languagesOptions[0]);
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
                    {languagesOptions.map((option) => (
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