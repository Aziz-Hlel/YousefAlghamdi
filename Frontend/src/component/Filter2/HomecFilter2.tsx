import FromField from "./FromField2";
import { categoriesType, CommercialProperties, LandAndPlots, ResidentialProperties } from "@src/types/categories.subcategories.types";
import { AbuDhabiEmirate, cities } from "@src/types/cities.delegations.types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { listing_types } from "@src/types/listing_types.types";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";





function HomecFilter({ rentOrSale }: { rentOrSale: string }) {

  const commercialOrNot = ["Non commercial", "Commercial"]
  const [commercial, setCommercial] = useState(commercialOrNot[0]);
  const [category, setCategory] = useState<string>(categoriesType[LandAndPlots]);
  const [city, setCity] = useState(cities[AbuDhabiEmirate]);
  const { t } = useTranslation(["common", "home"]);
  const navigate = useNavigate();

  const navigateToProperties = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    let listing_type: string = ""

    if (rentOrSale == "Rent" && commercial === commercialOrNot[1]) listing_type = listing_types.commercialRent
    if (rentOrSale == "Rent" && commercial === commercialOrNot[0]) listing_type = listing_types.rent
    if (rentOrSale == "Sale" && commercial === commercialOrNot[1]) listing_type = listing_types.commercialSale
    if (rentOrSale == "Sale" && commercial === commercialOrNot[0]) listing_type = listing_types.sale




    const query = new URLSearchParams({
      listingType: listing_type,
      city: city,
      category: category,

    });
    if (rentOrSale == "Rent") query.set("listingPeriod", "monthly");

    const url = `/property?listingType=${listing_type}&city=${city}&category=${category}`
    console.log(url);

    navigate(`/property?${query.toString()}`)

  }

  const setCommercialWrapper = (e: any) => {
    e === commercialOrNot[0] && category === categoriesType[CommercialProperties] && setCategory(categoriesType[ResidentialProperties]);
    e === commercialOrNot[1] && category === categoriesType[ResidentialProperties] && setCategory(categoriesType[CommercialProperties]);

    setCommercial(e);
  }

  const setCategoryWrapper = (e: any) => {
    setCategory(e)
  }

  const setCityWrapper = (e: any) => {
    setCity(e)
  }
  const categories = Object.keys(categoriesType).filter((category) => {
    if (commercial === commercialOrNot[1])
      return category !== categoriesType[ResidentialProperties] && category
    else
      return category !== categoriesType[CommercialProperties] && category
  });

  return (
    <div className="tab-pane fade show active " id="homec-tab1" role="tabpanel">
      <div className="homec-filters homec-filters__margin">
        <form action="#">
          <div className="homec-filter-group lg:justify-center">

            {/* Form Group   */}
            <FromField
              name={capitalizePhrase(t(getText.common.listingType))}
              options={commercialOrNot}
              state={commercial}
              setState={setCommercialWrapper}
            />

            <FromField
              name={capitalizePhrase(t(getText.common.category))}
              options={categories}
              state={category}
              setState={setCategoryWrapper}
            />

            <FromField
              name={capitalizePhrase(t(getText.common.city))}
              options={Object.keys(cities)}
              state={city}
              setState={setCityWrapper}
            />



            {/* Button  */}
            <button className="homec-btn homec-btn__second mx-0 px-0" onClick={navigateToProperties}>
              <span className="homec-btn__inside">
                <span>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.45185 16.8948C10.3289 16.8949 12.1522 16.2686 13.633 15.1152L19.2197 20.7019C19.637 21.105 20.3021 21.0934 20.7051 20.6761C21.0983 20.269 21.0983 19.6236 20.7051 19.2165L15.1184 13.6298C17.9805 9.9456 17.314 4.63881 13.6298 1.77676C9.94555 -1.08529 4.63881 -0.418815 1.77676 3.26541C-1.08529 6.94964 -0.418815 12.2564 3.26541 15.1185C4.74865 16.2707 6.57361 16.8958 8.45185 16.8948ZM3.96301 3.95978C6.44215 1.48059 10.4616 1.48054 12.9408 3.95969C15.42 6.43883 15.4201 10.4583 12.9409 12.9375C10.4618 15.4167 6.44229 15.4167 3.9631 12.9376C3.96305 12.9376 3.96305 12.9376 3.96301 12.9375C1.48386 10.4764 1.46926 6.47159 3.93034 3.99245C3.94121 3.98153 3.95209 3.97065 3.96301 3.95978Z"
                      fill="#111111"
                    />
                  </svg>
                </span>
                <span>{capitalizePhrase(t(getText.common.search))}</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomecFilter;
