import MultiRangeSlider from "multi-range-slider-react";
import { IfilterProperty } from "src/models/filterProperty";
import { useFormContext } from "../Property2/FilterProvider.context";

interface IRangeSlider {
  title: string;
  minRange: number;
  minKey: keyof IfilterProperty;
  maxRange: number;
  maxKey: keyof IfilterProperty;
  maxValue: number,
  minValue: number
  standard?: string;
  text?: string;
  symbol?: string;
}


function RangeSlider({ title, minRange, minKey, minValue, maxValue, maxRange, maxKey, standard, text, symbol, }: IRangeSlider) {
  const { updateField } = useFormContext();

  const handleInput = (e: any) => {
    updateField(minKey, e.minValue);
    updateField(maxKey, e.maxValue);
  };

  return (
    <div className="property-sidebar__single mg-top-20">
      <h4 className="property-sidebar__title">{title}</h4>
      <div className="price-filter homec-border pd-top-20">
        <div className="price-filter-inner">
          <div id="slider-range"></div>
          <div className="price_slider_amount">
            <MultiRangeSlider
              min={minRange}
              max={maxRange}
              step={1}
              minValue={1}
              maxValue={maxValue}
              onInput={(e) => {
                handleInput(e);
              }}
              baseClassName="range-slider"
              ruler={false}
              label={false}
            />
            <div className="price_slider_amount mg-top-30">
              <div className=" flex flex-col  items-start  justify-start -center">

                <div className="pl-2 cursor-default text-gray-400">
                  {`${text ? text : ""} ${symbol ? symbol : ""
                    }${minValue} ${standard ? standard : ""} - ${symbol ? symbol : ""
                    }${maxValue} ${standard ? standard : ""}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// RangeSlider.propTypes = {
//   title: ProtoTypes.string.isRequired,
//   minRange: ProtoTypes.number.isRequired,
//   maxRange: ProtoTypes.number.isRequired,
//   defaultMinRange: ProtoTypes.number,
//   defaultMaxRange: ProtoTypes.number,
//   standard: ProtoTypes.string,
//   text: ProtoTypes.string,
//   symbol: ProtoTypes.string,
// };

export default RangeSlider;
