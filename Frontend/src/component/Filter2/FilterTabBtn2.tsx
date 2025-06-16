import ProtoTypes from "prop-types";

type FilterTabBtnProps = {
  text: string;
  isActive: string;
  handleListing_Type: (text: string) => void;
};


function FilterTabBtn({  text, isActive, handleListing_Type: handleFilter }: FilterTabBtnProps) {
  return (
    <a
      className={`list-group-item cursor-pointer ${isActive === text && "active"}`}
      data-bs-toggle="list"
      role="tab"
      onClick={(e) => { e.preventDefault(); handleFilter(text) }}
    >
      {text}
    </a>
  );
}


export default FilterTabBtn;
