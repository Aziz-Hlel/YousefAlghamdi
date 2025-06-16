import MultiRangeSlider from "multi-range-slider-react";
import { IfilterProperty } from "src/models/filterProperty";
import { useFormContext } from "../Property2/FilterProvider.context";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';


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


function RangeSlider2({ title, minRange, minKey, minValue, maxValue, maxRange, maxKey, standard, text, symbol, }: IRangeSlider) {
  const { updateField } = useFormContext();


  const handleInput = (e: any) => {
    updateField(minKey, e[0]);
    updateField(maxKey, e[1]);
    console.log(e);

  };

  return (
    <div className="property-sidebar__single mg-top-20">
      <h4 className="property-sidebar__title">{title}</h4>
      <div className="price-filter homec-border pd-top-20">
        <div className="price-filter-inner">
          <div id="slider-range"></div>
          <div className="">

            <RangeSlider
              id="range-slider"
              min={minRange}
              max={maxRange}
              value={[minValue, maxValue]}
              onInput={(values: any) => handleInput(values)}
            />

          </div>
          <div className=" flex">

            <div className=" w-36">
              <input type="number" className="text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={minValue} onChange={(e) => { if (Number(e.target.value) > minRange) updateField(minKey, e.target.value) }} />
            </div>
            <div className=" w-full" />
            <div className=" w-36">
              <input type="number" className="text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={maxValue} onChange={(e) => { if (Number(e.target.value) < maxRange) updateField(maxKey, e.target.value) }} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}



export default RangeSlider2;
