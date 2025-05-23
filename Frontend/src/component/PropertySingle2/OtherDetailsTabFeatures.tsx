import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import ProtoTypes from "prop-types";
import { useTranslation } from "react-i18next";

function DetailsTabFeatures({ title, property, check }: any) {

  const { t } = useTranslation(['data', 'propertySingle']);


  return (

    <div className="bg-white rounded-xl p-4 m-4">
      <div className="homec-ptdetails-features ">
        <h4 className="homec-ptdetails-features__title">{title}</h4>
        <ul className="homec-ptdetails-features__list">
          {property?.map((item: any, index: number) =>
            check ? (
              <li key={item + index}>
                <b>
                  {/* <i className="fas fa-check"></i> {item} */}
                  <i className="fas fa-check"></i> {capitalizePhrase(t(getText.data[item as keyof typeof getText.data]))}
                </b>
              </li>
            ) : (
              <li key={index + Object.keys(item)[0]}>
                <b>{Object.keys(item)[0]}:</b>{" "}
                <span>{item[Object.keys(item)[0]]} {capitalizePhrase(t(getText.propertySingle.nearestPlaces.km))}</span>

              </li>
            )
          )}
        </ul>
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
