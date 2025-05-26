import getText from "@src/i18n/data/getText";
import { useTranslation } from "react-i18next";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";

type CheckInput2Props = {
  title: string;
  setAdditionalDetails: Function,
  additionalDetails: string[]
}


function CheckInput2({ title, setAdditionalDetails, additionalDetails }: CheckInput2Props) {

  const { t } = useTranslation(['data', ]);

  
  return (
    <div className="property-sidebar__single mg-top-20 ">
      <div className="property-sidebar__checkboxd">
        <div className="flex  h-fit items-center gap-2">

          <span className="  whitespace-nowrap ">{getText.data[title as keyof typeof getText.data] ? capitalizePhrase(t(getText.data[title as keyof typeof getText.data])) : title}</span>
          <input onChange={(e) => setAdditionalDetails(e)} type="checkbox" name={title} className="flex" checked={additionalDetails.includes(title)} />

        </div>
      </div>
    </div>
  );
}


export default CheckInput2;
