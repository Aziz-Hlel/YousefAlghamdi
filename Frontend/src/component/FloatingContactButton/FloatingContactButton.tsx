import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


const FloatingContactButton = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const { t } = useTranslation(['contactUs', 'common']);



    return (
        <div className="floating-whatsapp group">
            <a href={"https://wa.me/+971505884220"} className="whatsapp-button " target="_blank" rel="noopener noreferrer">
                <svg className="whatsapp-icon " viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.576 5.363a14.818 14.818 0 00-10.511-4.354C7.856 1.009 1.2 7.664 1.2 15.874c0 2.732.737 5.291 2.022 7.491l-.038-.07-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h.006c8.209-.003 14.862-6.659 14.862-14.868a14.82 14.82 0 00-4.349-10.507zM16.062 28.228h-.005-.001c-2.319 0-4.489-.64-6.342-1.753l.056.031-.451-.267-4.675 1.227 1.247-4.559-.294-.467a12.23 12.23 0 01-1.889-6.565c0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353-5.53 12.353-12.353 12.353zm6.776-9.251c-.371-.186-2.197-1.083-2.537-1.208-.341-.124-.589-.185-.837.187-.246.371-.958 1.207-1.175 1.455-.216.249-.434.279-.805.094a10.23 10.23 0 01-2.997-1.852l.01.009a11.236 11.236 0 01-2.037-2.521l-.028-.052c-.216-.371-.023-.572.162-.757.167-.166.372-.434.557-.65.146-.179.271-.384.366-.604l.006-.017a.678.678 0 00-.033-.653l.002.003c-.094-.186-.836-2.014-1.145-2.758-.302-.724-.609-.625-.836-.637-.216-.01-.464-.012-.712-.012-.395.01-.746.188-.988.463l-.001.002a4.153 4.153 0 00-1.299 3.102v-.004a7.233 7.233 0 001.527 3.857l-.012-.015a16.693 16.693 0 006.251 5.564l.094.043c.548.248 1.25.513 1.968.74l.149.041a5.103 5.103 0 002.368.143l-.031.004a3.837 3.837 0 002.497-1.749l.009-.017a3.122 3.122 0 00.214-1.784l.003.019c-.092-.155-.34-.247-.712-.434z" />
                </svg>
                <span className="whatsapp-text group-hover:px-2">{t(getText.contactUs.contactNow)}</span>
            </a>
        </div>
    );


}

export default FloatingContactButton