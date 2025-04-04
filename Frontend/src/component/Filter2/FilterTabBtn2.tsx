import ProtoTypes from "prop-types";

type FilterTabBtnProps = {
  link: string;
  text: string;
  isActive: string;
  handleFilter: (text: string) => void;
};


function FilterTabBtn({ link, text, isActive, handleFilter }: FilterTabBtnProps) {
  return (
    <a
      className={`list-group-item ${isActive === text && "active"}`}
      data-bs-toggle="list"
      href={link}
      role="tab"
      onClick={(e) => { e.preventDefault(); handleFilter(text) }}
    >
      {text}
    </a>
  );
}


export default FilterTabBtn;
