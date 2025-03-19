import ProtoTypes from "prop-types";

function ShowingResult({ currentPage, totalPages }: { currentPage: string, totalPages: number }) {
  return (
    <div className="hoemc-showing-results">
      <p className="hoemc-showing-results__text">
        Showing <span>{currentPage}</span> of <span>{totalPages}</span> results
      </p>
    </div>
  );
}


export default ShowingResult;
