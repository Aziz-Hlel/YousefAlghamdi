import { useEffect, useState } from "react";
import PropertyBar from "./PropertyBar";
import Sidebar from "../Sidebar2";
import LatestPropertyCard from "../Cards/LatestPropertyCard2";
import Pagination from "../Pagination2";
import properties from "../../data/property";
import { useFormContext } from "./FilterProvider.context";
import Http from "../../services/Http";
import Iproperty from "@src/models/property.type";
import apiGateway from "@src/utils/apiGateway";



function PropertyGrid() {

  const { properties: estates, filterObject, totalCount, updateField, updateEstate } = useFormContext();

  const totalPage = Math.ceil(totalCount / 6);
  //handle grid style
  const [gridStyle, setGridStyle] = useState("grid");
  const handleGridStyle = (style: any) => {
    setGridStyle(style);
  };

  const handelPage = async (page: number) => {
    console.log('page', page);

    await updateField("page", page);
    // updateEstate();
  };


  useEffect(() => {
    console.log(totalCount);
  }, [totalCount])












  return (
    <section className="homec-propertys pd-top-80 pd-btm-80">
      <div className="container">
        <PropertyBar gridStyle={gridStyle} handleGridStyle={handleGridStyle} />
        <div className="row">
          <Sidebar />
          <div className="col-lg-8 col-12">
            <div className="tab-content" id="nav-tabContent">
              {/* <!-- Grid Tab --> */}
              <div
                className="tab-pane fade show active"
                id="homec-grid"
                role="tabpanel"
              >
                <div className="row">
                  {estates && estates.map((estate, index) =>
                    <LatestPropertyCard
                      estate={estate}
                      formkey={estate._id}
                      _id={estate._id}
                      likeLink={properties[index].likeLink}
                      detailsLink={properties[index].detailsLink}
                      price={estate.filterFields.price}
                      period={properties[index].period}
                      listing_type={estate.listing_type}
                      propertyLink={properties[index].propertyLink}
                      name={estate.title}
                      address={properties[index].address}
                      detailsList={properties[index].detailsList}
                      classes={`${gridStyle === "grid"
                        ? "col-md-6 col-12 mg-top-30"
                        : "col-12 mg-top-30"
                        } `}
                      view={gridStyle}
                      style={null}
                    />
                  )}
                </div>
                <Pagination
                  totalPage={totalPage}
                  handlePage={handelPage}
                  currentPage={filterObject.page}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyGrid;
