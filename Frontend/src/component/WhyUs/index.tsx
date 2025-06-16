import { capitalizePhrase as capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import FeaturesCardV2 from "../Cards/FeaturesCardV2_2";
import Title from "../Title";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";

function WhyUs() {

  const { t } = useTranslation(['home', 'common']);
  { capitalizePhrase(t(getText.common.test)) }
  return (
    <section className="homec-bg-primary-color pd-top-110 pd-btm-110">
      <div
        className="homec-bg homec-bg__opacity"
        style={{ backgroundImage: "url(img/features-list-bg.svg)" }}
      ></div>
      <div className="">
        <div className="">
          <Title
            firstText={""}
            secondText={capitalizePhrase(t(getText.home.Features2.title))}
            marginSize="40"
            styleFirst={{ color: "#ffff" }}
            styleSecond={{ color: "#ffff" }}
          />
        </div>
        <section className="text-gray-600 body-font">
          <div className=" px-5  mx-auto">
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    className="text-[#ffc403] w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span className="title-font font-medium">
                    {capitalizePhrase(t(getText.home.Features2.steps["1"]))}
                  </span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    className="text-[#ffc403] w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span className="title-font font-medium">
                    {capitalizePhrase(t(getText.home.Features2.steps["2"]))}
                  </span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    className="text-[#ffc403] w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span className="title-font font-medium">
                    {capitalizePhrase(t(getText.home.Features2.steps["3"]))}
                  </span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    className="text-[#ffc403] w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span className="title-font font-medium">
                    {capitalizePhrase(t(getText.home.Features2.steps["4"]))}
                  </span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    className="text-[#ffc403] w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span className="title-font font-medium">
                    {capitalizePhrase(t(getText.home.Features2.steps["5"]))}
                  </span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    className="text-[#ffc403] w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span className="title-font font-medium">
                    {capitalizePhrase(t(getText.home.Features2.steps["6"]))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default WhyUs;
