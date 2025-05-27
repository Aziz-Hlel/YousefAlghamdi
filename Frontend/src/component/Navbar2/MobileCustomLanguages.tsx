

import { changeLanguage, languages } from '@src/i18n/i18n';


const MobileCustomLanguages = ({ handleSidebar }: { handleSidebar: () => void }) => {


    const handleLanguageChange = async (newLang: string) => {

        await changeLanguage(newLang as any);
    };


    return (
        <div className=' flex flex-row'>
            {Object.entries(languages).map(([code, { nativeName, icon }]) => (
                <div
                    key={code}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer w-14"
                    onClick={() => {
                        handleLanguageChange(code);
                        handleSidebar();
                    }}
                >
                    {/* <img src={option.icon} alt={option.label} className="w-5 h-5" /> */}
                    {icon}
                </div>
            ))}
        </div>
    )
}

export default MobileCustomLanguages