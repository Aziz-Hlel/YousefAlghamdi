import ProtoTypes from "prop-types";

function Pagination({ totalPage, handlePage, currentPage }: { totalPage: number, handlePage: any, currentPage: number }) {
  console.log("totalPage", totalPage);
  console.log("currentPage", currentPage);
  
  return (
    <div className="row mg-top-40">
      <div className="homec-pagination">
        <ul className="homec-pagination__list list-none cursor-default">
          <li className="homec-pagination__button">
            <a
              style={{ cursor: "pointer" }}
              onClick={() => {
                handlePage(currentPage - 1);
              }}
            >
              Prev
            </a>
          </li>

          {Array.from({ length: totalPage }, (_, index) => (
            index === 0 || index + 1 === totalPage ? (
              <li
                key={index + 1}
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
            ) : (index < 5 && currentPage < 5) ||
              (index > totalPage - 6 && currentPage > totalPage - 4) ? (
              <li
                key={index + 1}
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
            ) : index === currentPage - 2 ||
              index === currentPage - 1 ||
              index === currentPage ? (
              <li
                key={index + 1}
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
                key={index + 1}
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
                  key={index + 1}
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
                handlePage(currentPage + 1);
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}



export default Pagination;
