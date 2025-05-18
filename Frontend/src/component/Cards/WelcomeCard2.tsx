import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

function WelcomeCard({ languages, links, image, brunches, builtHouse }: any) {
  return (
    <div className="col-lg-6 col-12 d-none d-lg-block ">
      <div
        className="ecom-wc__inner homec-bg-cover"
        style={{ backgroundImage: "url('img/welcome-bg.svg')" }}
      >

        <div className="ecom-wc__inside">
          {/* Middle Image  */}
          <div className="ecom-wc__middle">
            <Link to="/">
              <img src={image} alt="#" />
            </Link>

          </div>
          {/* <div className="ecom-wc__footer">
            <ul className="ecom-wc__footer--list list-none">
              {links?.map((link: any, index: number) => (
                <li key={index}>
                  <a href={link.link}>{link.name}</a>
                </li>
              ))}
            </ul>
            <div className="ecom-wc__footer--languages">
              <select className="ecom-wc__footer--language">
                {languages?.map((language: any, index: number) =>
                  index === 0 ? (
                    <option data-display={language} key={index}>
                      {language}
                    </option>
                  ) : (
                    <option value={index + 2} key={index}>
                      {language}
                    </option>
                  )
                )}
              </select>
            </div>
          </div> */}
          <p className="ecom-wc__footer--text pt-5">
            @ 2025 YGP. All Right Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

WelcomeCard.propTypes = {
  languages: ProtoTypes.array.isRequired,
  links: ProtoTypes.array.isRequired,
  image: ProtoTypes.string.isRequired,
  brunches: ProtoTypes.string.isRequired,
  builtHouse: ProtoTypes.string.isRequired,
};

export default WelcomeCard;
