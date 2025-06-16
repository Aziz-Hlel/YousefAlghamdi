import React from 'react';
import getText from '@src/i18n/data/getText';
import { capitalizePhrase } from '@src/utils/capitalize_decapitalized';
import { useTranslation } from 'react-i18next';


interface CEOWelcomeProps {
  isRTL?: boolean;
  ceoData?: {
    name: string;
    title: string;
    phone: string;
    image: string;
  };
  companyData?: {
    name: string;
    experienceYears: number;
    heroImage: string;
  };
  welcomeMessage?: string;
}

const CEOMobile: React.FC<CEOWelcomeProps> = () => {

  const { t } = useTranslation(['home', 'common']);




  return (
    <div className=" flex flex-col p-5  sm:p-16 md:p-24 justify-center bg-white">

      <div data-theme="teal" className="mx-auto max-w-6xl">
        <section className="font-sans text-black">
          <div className="[ lg:flex lg:items-center ] [ fancy-corners fancy-corners--large fancy-corners--top-left fancy-corners--bottom-right ]">
            <div className="flex-shrink-0 self-stretch sm:flex-basis-40 md:flex-basis-50 xl:flex-basis-60">
              <div className="homec-image-group homec-image-group--v2">
                <div className="homec-image-group__main">
                  <img src="/images/about_img.jpg" alt="#" />
                  <div className="homec-experiences">
                    <h4 className="homec-experiences__title">
                      {capitalizePhrase(t(getText.home.CEO.NumbyearsOfExperience))} <span> {capitalizePhrase(t(getText.home.CEO.ofExperience))}</span>
                    </h4>
                  </div>
                </div>
                <div className="homec-ceo-quote">
                  <div className="homec-ceo-quote__img">
                    <div className="homec-overlay"></div>

                    <img src="/images/ceo_img.jpg" alt="#" />

                  </div>
                  <div className="homec-ceo-quote__title m-0 p-0  px-2 pb-2 text-xs font-extralight">
                    {capitalizePhrase(t(getText.home.CEO.ceoName))}
                    <span><a className=" text-sm font-extralight " href="tel:+971525002822" dir="ltr">+971 525002822</a></span>
                    <span><a className=" text-sm font-extralight " href="mailto:ceo@ygp.ae" dir="ltr">ceo@ygp.ae</a></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 bg-grey">
              <div className="leading-relaxed">
                <div className="leading-tight py-2 lg:text-4xl text-4xl  font-bold">{capitalizePhrase(t(getText.home.CEO.WelcomeMessage))}</div>
                <p className="homec-about-content__text">
                  {capitalizePhrase(t(getText.home.CEO.message))}

                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  );
};

export default CEOMobile;