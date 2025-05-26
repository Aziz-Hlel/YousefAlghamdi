import { useEffect, useState } from "react";
import WelcomeCard from "../Cards/WelcomeCard2";
import PropertyTextInput from "../Form/PropertyTextInput2";
import Preloader from "../Loader";
import { Link, useNavigate } from "react-router-dom";
import logo_img from "@img/logo_sign_in.jpg"
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@src/providers/AuthProvider.context";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";

export type LoginFormFields = {
  email: string;
  password: string;
};


const Login = () => {


  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginFormFields>();
  const { login } = useAuth();
  const { t } = useTranslation(["common", "errors",]);

  const emailRegister = register("email", {
    required: capitalizePhrase(t(getText.errors.login.email.required)),
    validate: (value) => {
      if (!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
        return capitalizePhrase(t(getText.errors.login.email.invalidEmailAddress));
      }
      return true;
    },
  });

  const passwordRegister = register("password", {
    required: capitalizePhrase(t(getText.errors.login.password.required)),
    minLength: {
      value: 1,
      message: capitalizePhrase(t(getText.errors.login.email.invalidEmailAddress)),

    }

  });



  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {

    // const response = await Http.post(apiGateway.user.sigIn, data)
    const response = await login(data)

    response?.status === 200 ? navigate("/") : console.log(response);
    if (response?.status !== 200) {
      setError("email", { message: "" })
      setError("password", { message: "" })
      setError("root", { message: capitalizePhrase(t(getText.errors.login.invalidCredentials)) })
    }

  }


  // loading handler
  const [isLoading, setisLoadingg] = useState<boolean>(true);
  useEffect(() => {
    setisLoadingg(false);
  }, []);

  const navigate = useNavigate();


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
                    {capitalizePhrase(t(getText.login.login.title))}

                    <span>
                      {capitalizePhrase(t(getText.common.noPublishPersonalInfo))}
                    </span>
                  </h3>
                  {/* Sign in Form  */}
                  <form
                    className="ecom-wc__form-main p-0"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <PropertyTextInput
                      title={capitalizePhrase(t(getText.common.email))}
                      fieldRegister={emailRegister}
                      fieldError={errors.email}
                      placeholder="demo3243@gmail.com"
                    />
                    <PropertyTextInput
                      title={capitalizePhrase(t(getText.common.password))}
                      fieldRegister={passwordRegister}
                      fieldError={errors.password}
                      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                      type="password"
                    />

                    {errors.root && <span className="pl-2 text-red-600 ">{errors.root.message}</span>}

                    <div className="form-group form-mg-top-30">
                      <div className="ecom-wc__button ecom-wc__button--bottom">
                        <button
                          className="homec-btn homec-btn__second"
                          // onClick={handleSubmit2}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          <span>{isSubmitting ? capitalizePhrase(t(getText.common.loading)) : capitalizePhrase(t(getText.login.login.title))}</span>
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
                          {capitalizePhrase(t(getText.login.login.noAccount))}
                          <Link to="/signup">{capitalizePhrase(t(getText.login.login.cretaeAccount))}</Link>

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
