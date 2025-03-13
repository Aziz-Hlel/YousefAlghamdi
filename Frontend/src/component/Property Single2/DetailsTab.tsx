import ProtoTypes from "prop-types";

function DetailsTab({ text, isActive, children }: { text: string, isActive: boolean, children: any }) {
  return (
    <div className="">

      <div
        className={`tab-pane fade ${isActive && "show active"}`}
        id="homec-pd-tab1"
        role="tabpanel"
      >

        <div className="homec-pdetails-tab__inner ">




          <div className="bg-white rounded-xl p-4 m-4" >
            <h4 className="homec-ptdetails-features__title ">description</h4>
           
            <p className="">
              {text}
            </p>

          </div>

          {/* Homec Features  */}
          {children}
        </div>
      </div>
    </div>
  );
}

DetailsTab.propTypes = {
  text: ProtoTypes.array.isRequired,
  children: ProtoTypes.node.isRequired,
  isActive: ProtoTypes.bool.isRequired,
};

export default DetailsTab;
