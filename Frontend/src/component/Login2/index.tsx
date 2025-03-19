import { useEffect, useState } from "react";
import WelcomeCard from "../Cards/WelcomeCard";
import PropertyTextInput from "../Form/PropertyTextInput2";
import Preloader from "../Loader";
import { Link, useNavigate } from "react-router-dom";
import apiGateway from "@src/apiGateway";
import Http from "@src/services/Http";
import logo_img from "@img/logo_sign_in.jpg"
import { SubmitHandler, useForm } from "react-hook-form";

type LoginFormFields = {
  email: string;
  password: string;
};


const Login = () => {


  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormFields>();

  const emailRegister = register("email", {
    required: "Email is required",
    validate: (value) => {
      if (!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
        return "Invalid email";
      }
      return true;
    },
  });

  const passwordRegister = register("password", {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",

    }
    
  });



  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {

  }


  // loading handler
  const [isLoading, setisLoadingg] = useState<boolean>(true);
  useEffect(() => {
    setisLoadingg(false);
  }, []);


  const [wrongCredentials, setWrongCredentials] = useState(false);
  const errorMessage = "Invalid email or password";

  const navigate = useNavigate();


  const handleSubmit2 = async (e: any) => {
    e.preventDefault();
    setWrongCredentials(false)
    const response = await Http.post(apiGateway.user.sigIn, {})

    response?.status === 200 ? navigate("/") : console.log(response);
    response?.status !== 200 && setWrongCredentials(true);
    response?.status !== 200 && console.log('mrgl je 8alt');

    console.log(response?.status, typeof response?.status);


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
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <PropertyTextInput
                      title="Email*"
                      fieldRegister={emailRegister}
                      fieldError={errors.email}
                      placeholder="demo3243@gmail.com"
                    />
                    <PropertyTextInput
                      title="Password*"
                      fieldRegister={passwordRegister}
                      fieldError={errors.password}
                      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                      type="password"


                    />
                    <div className=" h-6 p-2 mb-4"> {wrongCredentials && <p style={{ color: "red" }}>{errorMessage}</p>}</div>
                    <div className="form-group form-mg-top-30">
                      <div className="ecom-wc__button ecom-wc__button--bottom">
                        <button
                          className="homec-btn homec-btn__second"
                          // onClick={handleSubmit2}
                          type="submit"
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
              image={logo_img}
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
