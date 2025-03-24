

type KeyValueInputFieldProps = {
  title: string,
  titleTwo: string,
  handleKeyValue: any,
  value: any,
  placeholderOne: string,
  placeholderTwo: string,
  handleAddOrDelete: any,
  btnType: string,
  keyType: string,
}

function KeyValueInputField({
  title,
  titleTwo,
  handleKeyValue,
  value,
  placeholderOne,
  placeholderTwo,
  handleAddOrDelete,
  btnType,
  keyType,
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
                      value={value.key}
                      name="key"
                      placeholder={placeholderOne}
                      onChange={(e) => {
                        handleKeyValue({
                          id: value.id,
                          keyType,
                          inputType: "key",
                          value: e.target.value,
                        });
                      }}
                      required
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
              type="text"
              value={value.value}
              id={value.id}
              name="value"
              placeholder={placeholderTwo}
              required
              onChange={(e) =>
                handleKeyValue({
                  id: value.id,
                  keyType,
                  inputType: "value",
                  value: e.target.value,
                })
              }
            />
            <button
              className={`homec-form-add__button flex items-center justify-center ${"homec-form-add__button--delete"
                }`}
              onClick={() => handleAddOrDelete(btnType, value.id, keyType)}
            >
              <img
                src={
                  btnType === "add"
                    ? "img/plus-icon.svg"
                    : "img/delete-icon.svg"
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
