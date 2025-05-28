import SelectiveInput from "../Form/SelectiveInput2";
import RangeInput from "../Form/RangeInput2";
import { useFormContext } from "../Property2/FilterProvider.context";
import { useSearchParams } from "react-router-dom";
import { listing_typesValues } from "@src/types/listing_types.types";
import { categoriesList, categoriesType, ICategory, sub_categories } from "@src/types/categories.subcategories.types";
import { cities, citiesType, delegations } from "@src/types/cities.delegations.types";
import { useEffect } from "react";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { useTranslation } from "react-i18next";

const SideBar22 = () => {

  const { filterObject, updateProperty } = useFormContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation(['data', 'home', 'common']);

  const city = searchParams.get('city');
  const category = searchParams.get('category');
  const listingType = searchParams.get('listingType');
  const listingPeriod = searchParams.get('listingPeriod');

  if (city && !cities[city as citiesType]) {
    searchParams.delete('city')
    setSearchParams(searchParams, { replace: true });
  }

  if (category && !categoriesList.includes(category as any)) {
    searchParams.delete('category')
    setSearchParams(searchParams, { replace: true });
  }


  useEffect(() => {
    searchParams.delete('delegation')
    setSearchParams(searchParams, { replace: true });     // push to URL

  }, [city])


  useEffect(() => {
    searchParams.delete('sub_category')
    setSearchParams(searchParams, { replace: true });     // push to URL

  }, [category])


  useEffect(() => {
    !listingType?.includes("rent") && searchParams.delete('listingPeriod')
    if (listingType?.includes("rent")) {

      searchParams.set('listingPeriod', "monthly");

    }

    setSearchParams(searchParams, { replace: true });     // push to URL

  }, [listingType])

  return (
    <div className="col-lg-4 col-12 mg-top-30">
      <div className="property-sidebar">

        <SelectiveInput
          title={capitalizePhrase(t(getText.common.listingType))}
          options={
            listing_typesValues.map((listingType) => {
              return { id: listingType, name: listingType }
            })
          }
          classes="mg-top-20"
          formkey="listingType"
        />

        {listingType?.includes("rent") && <div className="flex flex-col space-y-2 px-2 pt-2 ">
          <label className="inline-flex items-center space-x-2">
            <input
              type="radio"
              name="listingPeriod"
              value="monthly"
              checked={listingPeriod === "monthly"}
              onChange={() => { searchParams.set('listingPeriod', "monthly"); setSearchParams(searchParams, { replace: true }); }}
              className="form-radio text-blue-600"
            />
            <span>{capitalizePhrase(t(getText.data.monthly))}</span>
          </label>

          <label className="inline-flex items-center space-x-2">
            <input
              type="radio"
              name="listingPeriod"
              value="yearly"
              checked={listingPeriod === "yearly"}
              onChange={() => { searchParams.set('listingPeriod', "yearly"); setSearchParams(searchParams, { replace: true }); }}
              className="form-radio text-blue-600"
            />
            <span>{capitalizePhrase(t(getText.data.yearly))}</span>
          </label>
        </div>}

        <SelectiveInput
          title={capitalizePhrase(t(getText.common.city))}
          options={
            Object.keys(cities).map((city) => {
              return { id: city, name: city };
            })}
          classes="mg-top-20"
          formkey="city"
        />

        <SelectiveInput
          title={capitalizePhrase(t(getText.common.delegation))}
          options={
            searchParams.get('city') ? delegations[(searchParams.get('city') as citiesType)].map((delegation) => {
              return { id: delegation, name: delegation };
            }) : []
          }
          classes="mg-top-20"
          formkey="delegation"
        />

        <SelectiveInput
          title={capitalizePhrase(t(getText.common.category))}
          options={
            Object.keys(categoriesType).map((category) => {
              return { id: category, name: category }
            })
          }
          classes="mg-top-20"
          formkey="category"
        />

        <SelectiveInput
          title={capitalizePhrase(t(getText.common.subCategory))}
          options={
            searchParams.get('category') && categoriesList.includes((searchParams.get('category') as any)) ?
              sub_categories[(searchParams.get('category') as ICategory)].map((estateType) => {
                return { id: estateType, name: estateType }
              }) : []
          }
          classes="mg-top-20"
          formkey="sub_category"
        />




        {/* <RangeInput
          minRange={0}
          maxRange={10}
          minValue={filterObject.minNumberOfRooms}
          maxValue={filterObject.maxNumberOfRooms}
          minKey={"minNumberOfRooms"}
          maxKey={"maxNumberOfRooms"}
          title="Number Of Rooms"
          standard="rooms"
        />

        <RangeInput
          minRange={0}
          maxRange={5}
          minValue={filterObject.minNumberOfBathrooms}
          maxValue={filterObject.maxNumberOfBathrooms}
          minKey={"minNumberOfBathrooms"}
          maxKey={"maxNumberOfBathrooms"}
          title="Number Of Bathrooms"
          standard="bathrooms"
        /> */}

        <RangeInput
          minRange={0}
          maxRange={2000}
          minValue={filterObject.minNumberOfSquareFeet}
          maxValue={filterObject.maxNumberOfSquareFeet}
          minKey={"minNumberOfSquareFeet"}
          maxKey={"maxNumberOfSquareFeet"}
          title={capitalizePhrase(t(getText.common.SquareFeet))}
          standard="sq. ft."
        />

        <RangeInput
          minRange={0}
          maxRange={5000000}
          minValue={filterObject.minPrice}
          maxValue={filterObject.maxPrice}
          minKey={"minPrice"}
          maxKey={"maxPrice"}
          title={capitalizePhrase(t(getText.common.Price))}
          text="Range: "
          symbol="$"
        />

        <div className="w-full flex flex-col justify-center items-center gap-2 pt-4">
          <button className="homec-btn" onClick={() => updateProperty()}>
            {capitalizePhrase(t(getText.common.applyFilter))}
          </button>
          {/* <div className="underline font-extralight hover:cursor-pointer " onClick={() => resetFilter()}>reset filter</div> */}
        </div>
      </div>
      {/* <AgentsSidebarSlider /> */}
    </div>
  );
}

export default SideBar22;
