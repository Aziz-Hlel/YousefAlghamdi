import { useEffect, useState } from "react";
import WelcomeCard from "../Cards/WelcomeCard";
import PropertyTextInput from "../Form/PropertyTextInput";
import Preloader from "../Loader";
import { Link, useNavigate } from "react-router-dom";
import apiGateway from "@src/apiGateway";
import Http from "@src/services/Http";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  // loading handler
  const [isLoading, setisLoadingg] = useState(true);
  useEffect(() => {
    setisLoadingg(false);
  }, []);


  const navigate = useNavigate();


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await Http.post(apiGateway.user.sigIn, input)

    response.status === 200 ? navigate("/") : console.log(response);
    response.status === 200 && console.log("true");
    console.log(response.status, typeof response.status);


  };


  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <section
        className="ecom-wc ecom-wc__full ecom-bg-cover"
      // style={{ backgroundImage: "url('img/credential-bg.svg')" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="ecom-wc__form">
                <div className="ecom-wc__form-inner">
                  <h3 className="ecom-wc__form-title ecom-wc__form-title__one">
                    Login
                    <span>
                      Your email address will not be published. Required fields
                      are marked *
                    </span>
                  </h3>
                  {/* Sign in Form  */}
                  <form
                    className="ecom-wc__form-main p-0"
                    action="index.html"
                    method="post"
                  >
                    <PropertyTextInput
                      title="Email*"
                      name="email"
                      value={input.email}
                      handleChange={handleChange}
                      placeholder="demo3243@gmail.com"
                      margin={null}
                      size={null}
                      type={null}
                    />
                    <PropertyTextInput
                      title="Password*"
                      name="password"
                      value={input.password}
                      handleChange={handleChange}
                      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                      type="password"
                      margin={null}
                      size={null}

                    />
                    <div className="form-group form-mg-top-30">
                      <div className="ecom-wc__button ecom-wc__button--bottom">
                        <button
                          className="homec-btn homec-btn__second"
                          onClick={handleSubmit}
                        >
                          <span>Login</span>
                        </button>
                        {/* <button
                          className="homec-btn homec-btn__second homec-btn__social"
                          type="submit"
                        >
                          <span className="ntfmax-wc__btn-icon">
                            <img src="img/google.svg" alt="#" />
                          </span>
                          <span>Sign In with Google</span>
                        </button> */}
                      </div>
                    </div>
                    {/* Form Group  */}
                    <div className="form-group mg-top-20">
                      <div className="ecom-wc__bottom">
                        <p className="ecom-wc__text">
                          Dont’t have an account ?{" "}
                          <Link to="/signup">Create Account</Link>
                          
                        </p>
                      </div>
                    </div>
                  </form>
                  {/* End Sign in Form  */}
                </div>
              </div>
            </div>
            <WelcomeCard
              languages={["English", "Bengali", "Frances"]}
              links={[
                { link: "#", name: "Terms & Condition" },
                { link: "#", name: "Privacy Policy" },
                { link: "#", name: "Help" },
              ]}
              image="https://placehold.co/600x600"
              brunches="120"
              builtHouse="150k"
            />
          </div>
        </div>
      </section>
    );
  }
  return component;
}

export default Login;
