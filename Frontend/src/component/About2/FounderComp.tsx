import React from 'react'
import founderImg from "@img/about/founder.jpg"

const FounderComp = () => {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="   flex  justify-center lg:w-5/6 py-24 lg:mx-auto px-6">
                <div className="lg:w-4/5  flex flex-wrap">
                    <img
                        alt="ecommerce"
                        className="lg:w-6/12 w-full lg:h-auto h-64 object-cover object-center border  border-2 rounded-xl "
                        src={founderImg}
                    />
                    <div className="lg:w-6/12 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 lg:flex flex-col justify-center">
                        <h3 className="text-sm title-font text-gray-500 tracking-widest">
                            Founder’s Brief

                        </h3>
                        <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">
                            Dr. Yousef Alghamdi
                        </h2>
                        <a href="">
                            <div className=' flex items-center'>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=' w-5 h-5'>
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
                                <span className=' mx-1' >
                                    +971 505884220
                                </span>

                            </div>
                        </a>
                        <div
                            className="homec-about-content__inner mg-top-20"
                            data-aos="fade-in"
                            data-aos-delay="500"
                        >
                            <p className="homec-about-content__text">
                                YGP Real Estate was founded with a clear purpose: to reshape the real estate experience in the UAE by combining innovation, market intelligence, and a passion for service.
                                The Founder envisioned a company that puts people first — delivering exceptional property solutions while maintaining the highest standards of ethics and professionalism.
                                Today, that vision continues to drive our growth, positioning YGP as a leading name in Dubai’s competitive real estate market.
                            </p>


                        </div>


                    </div>
                </div>
            </div>
        </section>

    )
}

export default FounderComp