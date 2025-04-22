import ProtoTypes from "prop-types";

function WelcomeCard({ languages, links, image, brunches, builtHouse }) {
  return (
    <div className="col-lg-6 col-12 d-none d-lg-block ">
      <div
        className="ecom-wc__inner homec-bg-cover"
        style={{ backgroundImage: "url('img/welcome-bg.svg')" }}
      >

        <div className="ecom-wc__inside">
          {/* Middle Image  */}
          <div className="ecom-wc__middle">
            <a href="/">
              <img src={image} alt="#" />
            </a>
            <div className="ecom-wc__countdown--title -translate-y-20">
              {brunches}
              <span>Brunches</span>
            </div>

            <div className="ecom-wc__countdown--title ecom-wc__countdown--title--v2 translate-y-14 border border-gray-400 outline-gray-400">
              {builtHouse}
              <span>Built House</span>
            </ div>
          </div>
          <div className="ecom-wc__footer">
            <ul className="ecom-wc__footer--list list-none">
              {links?.map((link,index) => (
                <li formkey={link.name} key={index}>
                  <a href={link.link}>{link.name}</a>
                </li>
              ))}
            </ul>
            <div className="ecom-wc__footer--languages">
              <select className="ecom-wc__footer--language">
                {languages?.map((language, index) =>
                  index === 0 ? (
                    <option formkey={language} data-display={language} key={index}>
                      {language}
                    </option>
                  ) : (
                    <option formkey={language} value={index + 2} key={index}>
                      {language}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <p className="ecom-wc__footer--text">
            @ 2023 HomeCo. All Right Reserved.
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
