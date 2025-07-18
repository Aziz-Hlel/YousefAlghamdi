import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { useTranslation } from "react-i18next";


function Pagination({ totalPage, handlePage, currentPage }: { totalPage: number, handlePage: any, currentPage: number }) {

  const { t } = useTranslation(['common', 'dashboard']);


  return (
    <div className="row mg-top-40">
      <div className="homec-pagination">
        {totalPage !== 0 && <ul className="homec-pagination__list list-none cursor-default">
          <li className="homec-pagination__button">
            <a
              style={{ cursor: "pointer" }}
              onClick={() => {
                currentPage > 1 && handlePage(currentPage - 1);
              }}
            >
              {capitalizePhrase(t(getText.common.prev))}
            </a>
          </li>

          {Array.from({ length: totalPage }, (_, index) => (
            index === 0 || index + 1 === totalPage ? (
              <li

                className={currentPage === index + 1 ? "active" : ""}
                key={index}
              >
                <a
                  onClick={() => {
                    handlePage(index + 1);
                  }}
                >
                  {index < 9 ? `0${index + 1}` : index + 1}
                </a>
              </li>
            ) : (index < 5 && currentPage < 5) ||
              (index > totalPage - 6 && currentPage > totalPage - 4) ? (
              <li

                className={currentPage === index + 1 ? "active" : ""}
                key={index}
              >
                <a
                  onClick={() => {
                    handlePage(index + 1);
                  }}
                >
                  {index < 9 ? `0${index + 1}` : index + 1}
                </a>
              </li>
            ) : index === currentPage - 2 ||
              index === currentPage - 1 ||
              index === currentPage ? (
              <li

                className={currentPage === index + 1 ? "active" : ""}

              >
                <a
                  onClick={() => {
                    handlePage(index + 1);
                  }}
                >
                  {index < 9 ? `0${index + 1}` : index + 1}
                </a>
              </li>
            ) : currentPage > 4 && index === 2 ? (
              <li

                className={currentPage === index + 1 ? "active" : ""}
              >
                <a
                  onClick={() => {
                    handlePage(index + 1);
                  }}
                >
                  ...
                </a>
              </li>
            ) : (
              currentPage < totalPage - 2 &&
              index === totalPage - 2 && (
                <li

                  className={currentPage === index + 1 ? "active" : ""}
                >
                  <a
                    onClick={() => {
                      handlePage(index + 1);
                    }}
                  >
                    ...
                  </a>
                </li>
              )
            )
          ))}

          <li
            style={{ cursor: "pointer" }}
            className="homec-pagination__button"
          >
            <a
              onClick={() => {
                currentPage < totalPage && handlePage(currentPage + 1);
              }}
            >
              {capitalizePhrase(t(getText.common.next))}   
            </a>
          </li>
        </ul>}
      </div>
    </div>
  );
}



export default Pagination;
