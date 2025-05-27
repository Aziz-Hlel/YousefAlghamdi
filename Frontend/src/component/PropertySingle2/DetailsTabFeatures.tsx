import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import ProtoTypes from "prop-types";
import { useTranslation } from "react-i18next";

function DetailsTabFeatures({ title, property }: { title: string, property: any }) {

  const { t } = useTranslation(['data', 'propertySingle']);


  return (

    <div className="bg-white rounded-xl p-4 m-4">
      <div className="homec-ptdetails-features ">
        <h4 className="homec-ptdetails-features__title">{title}</h4>
        <div className=" flex flex-wrap  gap-y-2 lg:px-10  gap-x-20 ">

          {property?.map((item: any, index: number) =>


            <div key={index + Object.keys(item)[0]}>
              <span className="  mr-5 " style={{ fontWeight: "400px", fontSize: "14px" }}>{capitalizePhrase(t(getText.data[Object.keys(item)[0] as keyof typeof getText.data]))}:</span>
              <span style={{ color: "#7e8ba0" }} className=" px-1">{item[Object.keys(item)[0]]}</span>
            </div>


          )}

        </div>
      </div>
    </div>
  );
}

DetailsTabFeatures.propTypes = {
  title: ProtoTypes.string.isRequired,
  property: ProtoTypes.array.isRequired,
  check: ProtoTypes.bool,
};

export default DetailsTabFeatures;
