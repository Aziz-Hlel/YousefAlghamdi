import founderImg from "@img/about/founder2.jpg"
import getText from '@src/i18n/data/getText';
import { capitalizePhrase } from '@src/utils/capitalize_decapitalized';
import { useTranslation } from 'react-i18next';

const FounderComp = () => {

    const { t } = useTranslation(['aboutUs', 'common']);
    { capitalizePhrase(t(getText.common.test)) }



    const handleCall = (phoneNumber: string) => {
        window.location.href = `tel:${phoneNumber}`;
    };

    const handleWhatsApp = (phoneNumber: string) => {
        const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}`;
        window.open(whatsappUrl, '_blank');
    };



    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="   flex  justify-center lg:w-5/6 py-24 lg:mx-auto ">
                <div className="lg:w-4/5  flex flex-wrap">
                    <img
                        alt="ecommerce"
                        className="lg:w-6/12 w-full lg:h-auto h-64 object-cover object-center border rounded-xl "
                        src={founderImg}
                    />
                    <div className="lg:w-6/12 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 lg:flex flex-col justify-center px-5">
                        <h3 className="text-sm title-font text-gray-500 tracking-widest">
                            {capitalizePhrase(t(getText.aboutUs.founder.founderBiref))}

                        </h3>
                        <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">
                            {capitalizePhrase(t(getText.aboutUs.founder.yousefAlghamdi))}
                        </h2>

                        <div >
                            <div className=' flex items-center'>

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className=' w-5 h-5 cursor-pointer'
                                    onClick={() => handleWhatsApp("+971505884220")}
                                >
                                    <g fill="#0F0F0F">
                                        <path d="M6.014 8.006c.114-.904 1.289-2.132 2.22-1.996V6.01c.907.172 1.625 1.734 2.03 2.436.286.509.1 1.025-.167 1.243-.361.29-.926.692-.808 1.095C9.5 11.5 12 14 13.23 14.711c.466.269.804-.44 1.092-.804.21-.28.726-.447 1.234-.171.759.442 1.474.956 2.135 1.534.33.276.408.684.179 1.115-.403.76-1.569 1.76-2.415 1.557C13.976 17.587 8 15.27 6.08 8.558c-.108-.318-.08-.438-.066-.552z" />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 23c-1.224 0-1.9-.131-3-.5l-2.106 1.053A2 2 0 014 21.763V19.5c-2.153-2.008-3-4.323-3-7.5C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm-6-4.37l-.636-.593C3.691 16.477 3 14.733 3 12a9 9 0 119 9c-.986 0-1.448-.089-2.364-.396l-.788-.264L6 21.764V18.63z"
                                        />
                                    </g>
                                </svg>

                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=' w-5 h-5 cursor-pointer'
                                    onClick={() => handleCall("+971505884220")}
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z"
                                            fill="#1C274C"
                                        />{" "}
                                    </g>
                                </svg>

                                <span className=' mx-1 cursor-pointer' onClick={() => handleWhatsApp("+971505884220")} dir='ltr'>
                                    +971 505884220
                                </span>

                            </div>

                        </div>
                        <div >
                            <div className=' flex items-center' >

                                <svg

                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className=' w-5 h-5 cursor-pointer'
                                    onClick={() => handleWhatsApp("+966558344770")}
                                >
                                    <g fill="#0F0F0F">
                                        <path d="M6.014 8.006c.114-.904 1.289-2.132 2.22-1.996V6.01c.907.172 1.625 1.734 2.03 2.436.286.509.1 1.025-.167 1.243-.361.29-.926.692-.808 1.095C9.5 11.5 12 14 13.23 14.711c.466.269.804-.44 1.092-.804.21-.28.726-.447 1.234-.171.759.442 1.474.956 2.135 1.534.33.276.408.684.179 1.115-.403.76-1.569 1.76-2.415 1.557C13.976 17.587 8 15.27 6.08 8.558c-.108-.318-.08-.438-.066-.552z" />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 23c-1.224 0-1.9-.131-3-.5l-2.106 1.053A2 2 0 014 21.763V19.5c-2.153-2.008-3-4.323-3-7.5C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm-6-4.37l-.636-.593C3.691 16.477 3 14.733 3 12a9 9 0 119 9c-.986 0-1.448-.089-2.364-.396l-.788-.264L6 21.764V18.63z"
                                        />
                                    </g>
                                </svg>

                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=' w-5 h-5 cursor-pointer'
                                    onClick={() => handleCall("+966558344770")}
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z"
                                            fill="#1C274C"
                                        />{" "}
                                    </g>
                                </svg>

                                <span className=' mx-1 cursor-pointer' onClick={() => handleWhatsApp("+966558344770")} dir='ltr' >
                                    +966 558344770
                                </span>

                            </div>
                            <div className=' flex items-center  gap-2' >

                                <svg viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" className=' w-5 h-5 cursor-pointer' >
                                    <path
                                        d="M0 1694.235h1920V226H0v1468.235zM112.941 376.664V338.94H1807.06v37.723L960 1111.233l-847.059-734.57zM1807.06 526.198v950.513l-351.134-438.89-88.32 70.475 378.353 472.998H174.042l378.353-472.998-88.32-70.475-351.134 438.89V526.198L960 1260.768l847.059-734.57z"
                                        fillRule="evenodd"
                                    />
                                </svg>
                                <a href='mailto:yousef@ygp.ae'>yousef@ygp.ae</a>
                            </div>

                        </div>
                        <div
                            className="homec-about-content__inner mg-top-20"
                            data-aos="fade-in"
                            data-aos-delay="500"
                        >
                            <p className="homec-about-content__text">
                                {capitalizePhrase(t(getText.aboutUs.founder.message))}
                            </p>


                        </div>


                    </div>
                </div>
            </div >
        </section >

    )
}

export default FounderComp