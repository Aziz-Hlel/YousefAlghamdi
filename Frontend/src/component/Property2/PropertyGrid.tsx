import { useEffect, useState } from "react";
import PropertyBar from "./PropertyBar";
import Sidebar from "../Sidebar2";
import LatestPropertyCard from "../Cards/LatestPropertyCard2";
import Pagination from "../Pagination";
import properties from "../../data/property";
import { useFormContext } from "./FilterProvider.context";
import Http, { axiosInstance } from "../../services/Http";
import apiGateway from "../../apiGateway";
import axios from "axios";
import { Iestate } from "src/models/estate.type";

function PropertyGrid() {
  //handle grid style
  const [gridStyle, setGridStyle] = useState("grid");
  const handleGridStyle = (style: any) => {
    setGridStyle(style);
  };
  //handle page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 24;

  const handelPage = (page: any) => {
    if (page === "prev") {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } else if (page === "next") {
      if (currentPage < totalPage) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      setCurrentPage(page);
    }
  };










  const { filterObject, } = useFormContext();
  const [estates, setEstates] = useState<Iestate[] | null>(null);

  const fetch = async () => {

    const reponse = await Http.get<any>(apiGateway.estate, { params: filterObject });

    const estates: Iestate[] = reponse.data.data

    console.log(estates);
    setEstates(estates);
  }
  useEffect(() => {
    fetch()
  }, [])


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
                      key={estate._id}
                      _id={estate._id}
                      img={apiGateway.localhost.images + estate.imgs[0]}
                      likeLink={properties[index].likeLink}
                      detailsLink={properties[index].detailsLink}
                      price={properties[index].price}
                      period={properties[index].period}
                      whatFor={properties[index].whatFor}
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
                  currentPage={currentPage}
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
