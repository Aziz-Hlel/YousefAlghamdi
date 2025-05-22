import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { useTranslation } from "react-i18next";



function FromField({ name, options, state, setState }: { name: string, options: string[], state: string, setState: Function }) {

  const { t } = useTranslation(["common", "data"]);

  console.log("xxxxxxxxx", (getText.data[options[0] as keyof typeof getText.data]));

  return (
    <div className="form-group text-xs  font-light  lg:w-52 flex justify-center">
      <span className="homec-filter-group__label  text-xs   text-wrap">{name}</span>

      <select
        onChange={(value) => setState(value.target.value)}
        style={{ border: "none", outline: "none", zIndex: "999" }}
        className=" text-xs "
        value={state}
      >
        {options.map((option: any, index: number) => (
          <option value={option} key={index}>
            {/* {option} */}
            {capitalizePhrase(t(getText.data[option as keyof typeof getText.data]))}
          </option>
        ))}
      </select>
    </div>
  );
}


export default FromField;
