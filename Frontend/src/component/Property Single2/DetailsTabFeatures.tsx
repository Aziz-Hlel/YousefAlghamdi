import ProtoTypes from "prop-types";

function DetailsTabFeatures({ title, property }: { title: string, property: any }) {
  return (

    <div className="bg-white rounded-xl p-4 m-4">
      <div className="homec-ptdetails-features ">
        <h4 className="homec-ptdetails-features__title">{title}</h4>
        <div className=" flex flex-wrap  gap-y-2 lg:px-10  gap-x-20 ">
          {property?.map((item: any, index: number) =>

            <div formkey={index + Object.keys(item)[0]}>
              <span className="  mr-5 " style={{ fontWeight: "400px", fontSize: "14px" }}>{Object.keys(item)[0]}:</span>
              <span style={{ color: "#7e8ba0" }}>{item[Object.keys(item)[0]]}</span>
            </div>

          )}
        </div>
      </div>
    </div>
  );
}

DetailsTabFeatures.propTypes = {
  title: ProtoTypes.string.isRequired,
  property: ProtoTypes.array.isRequired,
  check: ProtoTypes.bool,
};

export default DetailsTabFeatures;
