import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";

import { useTranslation } from "react-i18next";

function ShowingResult({ currentPage, totalPages }: { currentPage: string, totalPages: number }) {

  const { t } = useTranslation(['common', 'dashboard']);


  return (
    <div className="hoemc-showing-results">
      <p className="hoemc-showing-results__text">
        {capitalizePhrase(t(getText.properties.showing))} <span>{currentPage}</span> {capitalizePhrase(t(getText.properties.of))} <span>{totalPages}</span> {capitalizePhrase(t(getText.properties.results))}
      </p>
    </div>
  );
}


export default ShowingResult;
