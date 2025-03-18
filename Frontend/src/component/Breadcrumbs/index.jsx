import ProtoTypes from "prop-types";
import bread_overlay from "./bread_overlay.jpg";

function Breadcrumbs({ title, children, titlePosition, background, overlay }) {
  return (
    <section
      className="breadcrumbs__content"
      style={{
        backgroundImage: background
          ? background
          : `url(${bread_overlay})`,
      }}
    >
      {overlay && <div className="homec-overlay"></div>}
      <div className="container ">
        <div className="row">
          {/* Breadcrumb-Content */}
          <div className="col-12">
            <div className="breadcrumb-content">
              {titlePosition === "bottom" ? (
                <>
                  <ul className="breadcrumb__menu list-none">{children}</ul>
                  <h2 className="breadcrumb__title m-0">{title}</h2>
                </>
              ) : (
                <>
                  <h2 className="breadcrumb__title m-0">{title}</h2>{" "}
                  <ul className="breadcrumb__menu list-none">{children}</ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Breadcrumbs.propTypes = {
  title: ProtoTypes.string.isRequired,
  children: ProtoTypes.node.isRequired,
  titlePosition: ProtoTypes.string,
  background: ProtoTypes.string,
  overlay: ProtoTypes.bool,
};

export default Breadcrumbs;
