

type KeyValueInputFieldProps = {
  title: string,
  titleTwo: string,
  handleKeyValue: (idx: any, keyType: "placeName" | "distance", value: string) => void,
  item: { placeName: string; distance: string; },
  placeholderOne: string,
  placeholderTwo: string,
  handleAddOrDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string, idx: number) => void,
  btnType: string,
  idx: number
}


function KeyValueInputField({
  title,
  titleTwo,
  handleKeyValue,
  item,
  placeholderOne,
  placeholderTwo,
  handleAddOrDelete,
  btnType,
  idx
}: KeyValueInputFieldProps) {

  return (
    <div className="row">
      <div className="col-lg-6 col-md-6 col-12">
        {/* Single Form Element  */}
        <div className="mg-top-20">
          <h4 className="homec-submit-form__heading">{title}</h4>
          <div className="form-group homec-form-input">

            <div className="col-lg-6 col-md-6 col-12">
              {/* Single Form Element */}
              <div className="">
                <div className="form-group homec-form-input">
                  <input
                    type="text"
                    value={item.placeName}
                    name="placeName"
                    placeholder={placeholderOne}
                    onChange={(e) => { handleKeyValue(idx, "placeName", e.target.value) }}

                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-12">
        {/* Single Form Element  */}
        <div className="mg-top-20">
          <h4 className="homec-submit-form__heading">{titleTwo}</h4>
          <div className="form-group homec-form-input homec-form-add">
            <input
              type="number"
              value={item.distance}
              name="distance"
              placeholder={placeholderTwo}

              onChange={(e) => { handleKeyValue(idx, "distance", e.target.value) }}
            />
            <button
              className={`homec-form-add__button flex justify-center  ${btnType !== "add" && "homec-form-add__button--delete"
                }`}
              onClick={(e) => handleAddOrDelete(e, btnType, idx)}
            >
              <img
                src={
                  btnType === "add"
                    ? "/img/plus-icon.svg"
                    : "/img/delete-icon.svg"
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



export default KeyValueInputField;
