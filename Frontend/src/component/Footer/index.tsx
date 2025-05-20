import FooterList from "./FooterList";
import SubscribeForm from "../Subscribe2";
import { Link } from "react-router-dom";
import logo_img from "@img/logo.png"
import companyInfo from "@src/data/companyInfo";
import companySocials from "@src/data/companySocials";
import logo2 from "@img/logo2.png"
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { useTranslation } from "react-i18next";


function Footer() {

  const { t } = useTranslation(['home', 'common']);
  { capitalizePhrase(t(getText.common.test)) }


  return (
    <footer className="footer-area p-relative">
      <div className="homec-shape">
        <div className="homec-shape-single homec-shape-10">
          <img src="/img/anim-shape-6.svg" alt="#" />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Subscribe Form   */}
            {/* End Subscribe Form   */}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="footer-top-inner pd-top-30 pd-btm-100">
              <div className="row">
                <div className="col-lg-4 col-md-3 col-12">
                  {/* Footer Widget  */}
                  <div className="footer-about-widget">
                    <div className="">
                      <Link className="logo" to={"/"}>
                        <img src={logo2} alt="#" className=" w-72 h-64" />
                      </Link>
                    </div>
                    <p className="footer-about-text">
                      {capitalizePhrase(t(getText.home.Footer.description))}

                    </p>
                    {/* Social   */}
                    <ul className="homec-social homec-social__v2">


                      <li>
                        <a href={companySocials.youtube} target="_blank"  >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_2)">
                              <path d="M15.6942 10.9214L10.392 8.02027C10.0871 7.85346 9.72675 7.85968 9.42792 8.03675C9.12891 8.21399 8.95056 8.5271 8.95056 8.87464V14.6271C8.95056 14.973 9.12781 15.2855 9.4248 15.463C9.57989 15.5556 9.75183 15.6021 9.92413 15.6021C10.082 15.6021 10.2402 15.5631 10.3857 15.4847L15.6881 12.6336C16.0029 12.4642 16.1993 12.137 16.2008 11.7794C16.2021 11.4218 16.008 11.0931 15.6942 10.9214ZM10.357 13.9034V9.60413L14.3198 11.7725L10.357 13.9034Z" />
                              <path d="M23.8235 7.19659L23.8224 7.18561C23.8021 6.99243 23.5997 5.27417 22.7644 4.40021C21.7989 3.37225 20.7043 3.24738 20.1779 3.1875C20.1343 3.18256 20.0944 3.17798 20.0587 3.17322L20.0167 3.16882C16.8439 2.93811 12.0522 2.90662 12.0042 2.90643L12 2.90625L11.9958 2.90643C11.9478 2.90662 7.15613 2.93811 3.95471 3.16882L3.91241 3.17322C3.87836 3.1778 3.84082 3.18201 3.79999 3.18677C3.2796 3.24683 2.19672 3.37189 1.22845 4.43701C0.432861 5.30164 0.202881 6.98309 0.17926 7.17206L0.176514 7.19659C0.169373 7.27698 0 9.19061 0 11.1118V12.9077C0 14.8288 0.169373 16.7424 0.176514 16.823L0.177795 16.8351C0.19812 17.0251 0.400269 18.7119 1.23175 19.5862C2.13959 20.5798 3.28748 20.7112 3.90491 20.7819C4.0025 20.7931 4.08655 20.8026 4.14386 20.8127L4.19934 20.8204C6.03131 20.9947 11.7751 21.0806 12.0187 21.084L12.026 21.0842L12.0333 21.084C12.0813 21.0839 16.8728 21.0524 20.0457 20.8217L20.0876 20.8173C20.1277 20.812 20.1727 20.8072 20.2222 20.8021C20.7396 20.7471 21.8167 20.6331 22.7715 19.5824C23.5671 18.7176 23.7973 17.0361 23.8207 16.8474L23.8235 16.8228C23.8306 16.7422 24.0002 14.8288 24.0002 12.9077V11.1118C24 9.19061 23.8306 7.27716 23.8235 7.19659ZM22.5936 12.9077C22.5936 14.6858 22.4383 16.517 22.4236 16.6851C22.364 17.1482 22.1213 18.212 21.7337 18.6334C21.136 19.2909 20.5221 19.3561 20.0739 19.4035C20.0197 19.4092 19.9695 19.4147 19.9241 19.4203C16.8552 19.6423 12.2444 19.6763 12.032 19.6776C11.7938 19.6741 6.13403 19.5875 4.35791 19.4225C4.26691 19.4077 4.16858 19.3964 4.06494 19.3846C3.53925 19.3244 2.81964 19.242 2.2663 18.6334L2.2533 18.6194C1.87244 18.2227 1.63678 17.2278 1.5769 16.6906C1.56573 16.5635 1.40643 14.7107 1.40643 12.9077V11.1118C1.40643 9.33563 1.56134 7.50641 1.57635 7.33484C1.64758 6.78937 1.89478 5.78998 2.2663 5.38605C2.88226 4.70856 3.53174 4.63348 3.9613 4.58386C4.00232 4.5791 4.04059 4.57471 4.07593 4.57013C7.18945 4.34711 11.8334 4.31396 12 4.31268C12.1666 4.31378 16.8089 4.34711 19.8948 4.57013C19.9327 4.57489 19.9741 4.57965 20.0186 4.58478C20.4604 4.63513 21.1282 4.7113 21.741 5.36499L21.7467 5.37103C22.1276 5.76782 22.3632 6.78003 22.4231 7.32806C22.4337 7.448 22.5936 9.30487 22.5936 11.1118V12.9077Z" />
                            </g>
                            <defs>
                              <clipPath id="clip0_2">
                                <rect width="24.0001" height="24" />
                              </clipPath>
                            </defs>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href={companySocials.facebook} target="_blank" >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_3)">
                              <path d="M13.5938 23.9531H9.75037C9.1084 23.9531 8.58618 23.4309 8.58618 22.7889V14.12H6.34387C5.7019 14.12 5.17969 13.5976 5.17969 12.9558V9.24115C5.17969 8.59918 5.7019 8.07697 6.34387 8.07697H8.58618V6.2168C8.58618 4.37238 9.16534 2.80316 10.2609 1.67908C11.3613 0.549866 12.8992 -0.046875 14.7083 -0.046875L17.6395 -0.0421143C18.2803 -0.0410156 18.8016 0.481201 18.8016 1.12207V4.57105C18.8016 5.21301 18.2796 5.73523 17.6378 5.73523L15.6643 5.73596C15.0624 5.73596 14.9092 5.85663 14.8764 5.89362C14.8224 5.95496 14.7581 6.12836 14.7581 6.60718V8.07678H17.4895C17.6951 8.07678 17.8944 8.1275 18.0656 8.22308C18.4349 8.42944 18.6645 8.81964 18.6645 9.24133L18.663 12.956C18.663 13.5976 18.1408 14.1198 17.4988 14.1198H14.7581V22.7889C14.7581 23.4309 14.2357 23.9531 13.5938 23.9531ZM9.99316 22.5461H13.351V13.4901C13.351 13.0615 13.6998 12.7128 14.1282 12.7128H17.256L17.2573 9.48395H14.1281C13.6996 9.48395 13.351 9.13532 13.351 8.70667V6.60718C13.351 6.0575 13.4068 5.43237 13.8217 4.96252C14.3231 4.39453 15.1132 4.32898 15.6639 4.32898L17.3947 4.32825V1.3645L14.7072 1.36011C11.7999 1.36011 9.99316 3.22119 9.99316 6.2168V8.70667C9.99316 9.13513 9.64453 9.48395 9.21607 9.48395H6.58667V12.7128H9.21607C9.64453 12.7128 9.99316 13.0615 9.99316 13.4901V22.5461Z" />
                            </g>
                            <defs>
                              <clipPath id="clip0_3">
                                <rect width="23.9531" height="24" />
                              </clipPath>
                            </defs>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href={companySocials.snapchat} target="_blank" >
                          <svg
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"

                            className="stroke-[#7065F0] stroke-3 hover:stroke-white "
                          >
                            <path
                              d="M24.012 42.27c3.827-.003 4.967-1.607 7.486-2.724 2.25-.998 5.469.509 6.137-2.162h0c.086-1.38 2.513-1.158 3.874-2.1 1.242-.858 1.366-2.235.09-2.777-2.887-1.227-5.923-3.915-6.657-6.797-.459-1.797 5.278-2.35 4.084-5.74-.705-2-3.238-1.296-4.616-.848C35.328 12.014 31.868 5.73 24 5.73s-11.328 6.284-10.41 13.392c-1.378-.448-3.911-1.152-4.616.848-1.195 3.39 4.542 3.943 4.084 5.74-.734 2.882-3.77 5.57-6.658 6.797-1.275.542-1.151 1.919.09 2.778 1.362.942 3.788.72 3.875 2.1h0c.668 2.67 3.887 1.163 6.137 2.161 2.52 1.117 3.659 2.721 7.486 2.724h.023z"
                              fill="none"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className=" "
                            />
                            <defs>
                              <clipPath id="clip0_3">
                                <rect width="23.9531" height="24" />
                              </clipPath>
                            </defs>
                          </svg>
                        </a>
                      </li>


                      <li>
                        <a href={companySocials.facebook} target="_blank" >
                          <svg
                            width="26px"
                            height="26px"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <title>instagram</title>{" "}
                              <g id="Layer_2" data-name="Layer 2">
                                {" "}
                                <g id="invisible_box" data-name="invisible box">
                                  {" "}
                                  <rect width={26} height={26} fill="none" />{" "}
                                  <rect width={26} height={26} fill="none" />{" "}
                                </g>{" "}
                                <g id="icons_Q2" data-name="icons Q2">
                                  {" "}
                                  <path d="M24,7.6h8.1a10.8,10.8,0,0,1,3.7.7,6.7,6.7,0,0,1,3.8,3.8,10.8,10.8,0,0,1,.7,3.7c.1,2.1.1,2.8.1,8.1s0,6-.1,8.1a10.8,10.8,0,0,1-.7,3.7,6.7,6.7,0,0,1-3.8,3.8,10.8,10.8,0,0,1-3.7.7H15.9a10.8,10.8,0,0,1-3.7-.7,6.7,6.7,0,0,1-3.8-3.8,10.8,10.8,0,0,1-.7-3.7c-.1-2.1-.1-2.8-.1-8.1s0-6,.1-8.1a10.8,10.8,0,0,1,.7-3.7,6.7,6.7,0,0,1,3.8-3.8,10.8,10.8,0,0,1,3.7-.7H24M24,4H15.8a17.9,17.9,0,0,0-4.9.9A10,10,0,0,0,7.4,7.4a8.5,8.5,0,0,0-2.3,3.5,14.5,14.5,0,0,0-1,4.9C4,17.9,4,18.6,4,24s0,6.1.1,8.2a14.5,14.5,0,0,0,1,4.9,8.5,8.5,0,0,0,2.3,3.5,8.5,8.5,0,0,0,3.5,2.3,14.5,14.5,0,0,0,4.9,1H32.2a14.5,14.5,0,0,0,4.9-1,8.5,8.5,0,0,0,3.5-2.3A10,10,0,0,0,43,37.1a17.9,17.9,0,0,0,.9-4.9c.1-2.1.1-2.8.1-8.2s0-6.1-.1-8.2a17.9,17.9,0,0,0-.9-4.9,10,10,0,0,0-2.4-3.5A10,10,0,0,0,37.1,5a17.9,17.9,0,0,0-4.9-.9H24" />{" "}
                                  <path d="M24,13.7A10.3,10.3,0,1,0,34.3,24,10.3,10.3,0,0,0,24,13.7m0,17A6.7,6.7,0,1,1,30.7,24,6.7,6.7,0,0,1,24,30.7" />{" "}
                                  <path d="M37.1,13.3a2.4,2.4,0,1,1-2.4-2.4,2.4,2.4,0,0,1,2.4,2.4" />{" "}
                                </g>{" "}
                              </g>{" "}
                            </g>
                          </svg>
                        </a>
                      </li>


                      <li>
                        <a href={companySocials.twitter} target="_blank" >
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            width="24px"
                            height="24px"
                          >
                            <g>
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </g>
                          </svg>

                        </a>
                      </li>


                    </ul>
                    {/* End Social  */}
                  </div>
                  {/*  End Footer Widget  */}
                </div>
                <div className="col-lg-8 col-md-9">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-12">
                      {/* Footer Widget   */}
                      <div className="single-widget footer-useful-links">
                        <h3 className="widget-title ">{capitalizePhrase(t(getText.home.Footer.listing.listing))}</h3>
                        <ul className="f-useful-links-inner list-none">
                          <FooterList link="/property" title={capitalizePhrase(t(getText.home.Footer.listing.properties))} />
                          <FooterList link="/add-property" title={capitalizePhrase(t(getText.home.Footer.listing.addProperty))} />
                          <FooterList link="/login" title={capitalizePhrase(t(getText.home.Footer.listing.login))} />
                          <FooterList link="/signup" title={capitalizePhrase(t(getText.home.Footer.listing.signup))} />
                        </ul>
                      </div>
                      {/* End Footer Widget  */}
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                      {/* Footer Widget  */}
                      <div className="single-widget footer-need-helps">
                        <h3 className="widget-title">{capitalizePhrase(t(getText.home.Footer.important.title))}</h3>
                        <ul className="f-need-helps-inner list-none">
                          <FooterList link="/about" title={capitalizePhrase(t(getText.home.Footer.important.aboutUs))} />
                          <FooterList link="/our-agents" title={capitalizePhrase(t(getText.home.Footer.important.ourAgents))} />
                          <FooterList link="/contact" title={capitalizePhrase(t(getText.home.Footer.important.contact))} />
                        </ul>
                      </div>
                      {/* End Footer Widget  */}
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                      {/* Footer Widget   */}
                      <div className="single-widget footer-contact">
                        <h3 className="widget-title">{capitalizePhrase(t(getText.home.Footer.copyright.contactUs))} </h3>
                        <div className="f-contact__form-top">
                          <ul className="f-contact-list list-none">
                            <li>
                              <img src="/img/footer-phone.svg" alt="#" />
                              <Link to={`tel:${companyInfo.phone}`} dir="ltr">{companyInfo.phone}</Link>
                            </li>
                            <li>
                              <img src="/img/footer-message.png" alt="#" />
                              <a href={`mailto:${companyInfo.email}`}>
                                {companyInfo.email}
                              </a>
                            </li>
                            <li>
                              <img src="/img/footer-location.png" alt="#" />
                              <p>{companyInfo.address}</p>
                            </li>

                          </ul>
                        </div>
                      </div>
                      {/* End Footer Widget   */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright   */}
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12">
              {/* Copyright Text   */}
              <p className="copyright-text">
                {capitalizePhrase(t(getText.home.Footer.copyright.allRightsReserved))}
                <a href="https://technoshark.org/" target="_blank" className="mx-1">
                  TechnoShark
                </a>
              </p>
            </div>
            <div className="col-lg-6 col-12">
              {/* Footer Page List   */}
              <ul className="footer-pages list-none">
                <li>
                  <Link to={"/about"}>{capitalizePhrase(t(getText.home.Footer.copyright.aboutCompany))}</Link>
                </li>
                <li>
                  <Link to={"/contact"}>{capitalizePhrase(t(getText.home.Footer.copyright.contactUs))}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End Copyright  */}
    </footer>
  );
}

export default Footer;
