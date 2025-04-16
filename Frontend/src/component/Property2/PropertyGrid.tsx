import { useEffect, useState } from "react";
import PropertyBar from "./PropertyBar";
import Sidebar from "../Sidebar2";
import LatestPropertyCard from "../Cards/LatestPropertyCard2";
import Pagination from "../Pagination2";
import staticProperties from "../../data/property";
import { useFormContext } from "./FilterProvider.context";
import { useSearchParams } from "react-router-dom";



function PropertyGrid() {

  const { properties: properties, totalCount, updateEstate } = useFormContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1
  const totalPage = Math.ceil(totalCount / 6);
  //handle grid style
  const [gridStyle, setGridStyle] = useState("grid");
  const handleGridStyle = (style: any) => {
    setGridStyle(style);
  };

  const handelPage = async (page: number) => {
    console.log('page l jeya mil params: ', page);
    searchParams.set('page', page.toString());
    setSearchParams(searchParams, { replace: true });
    console.log("haw 9addeh l pag :  ", searchParams.get("page"));

    // await updateField("page", page);
    updateEstate(page);
  };


  useEffect(() => {
    console.log(totalCount);
  }, [totalCount])






  console.log("haw 9addeh l pag :  ", searchParams.get("page"));






  return (
    <section className="homec-propertys pd-top-80 pd-btm-80">
      <div className=" container">
        <PropertyBar gridStyle={gridStyle} handleGridStyle={handleGridStyle} />
        <div className="row">
          <Sidebar />
          <div className="col-lg-8 col-12">
            <div className="tab-content" id="nav-tabContent">
              {/* <!-- Grid Tab --> */}
              <div
                className="tab-pane fade show active"
                role="tabpanel"
              >
                <div className="row">
                  {properties && properties.map((property, index) =>
                    <LatestPropertyCard
                      estate={property}
                      formkey={property._id}
                      _id={property._id}
                      likeLink={staticProperties[index].likeLink}
                      detailsLink={staticProperties[index].detailsLink}
                      price={property.filterFields.price}
                      period={staticProperties[index].period}
                      listing_type={property.listing_type}
                      propertyLink={staticProperties[index].propertyLink}
                      name={property.title}
                      address={`${property.city}, ${property.delegation}, ${property.addresse}`}
                      detailsList={staticProperties[index].detailsList}
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
                  currentPage={page}
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
