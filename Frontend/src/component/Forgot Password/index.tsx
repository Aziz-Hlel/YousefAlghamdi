import { useEffect, useState } from "react";
import WelcomeCard from "../Cards/WelcomeCard2";
import PropertyTextInput from "../Form/PropertyTextInput2";
import Preloader from "../Loader";
import { Link, useNavigate } from "react-router-dom";
import logo_img from "@img/logo_sign_in.jpg"
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { Alert } from "@src/utils/createAlert";

export type LoginFormFields = {
  email: string;
};


const ForgotPassword = () => {


  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormFields>();
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




  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {

    const response = await Http.post(apiGateway.user.requestResetPassword, data)
    response?.status === 200 && Alert({ title: "Success", text: "Password reset link has been sent to your email", icon: "success" })
    response?.status === 200 && navigate("/login");
    if (response?.status !== 200) Alert({ title: "Error", text: "Something went wrong, cannot create property", icon: "error" })


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
                    {capitalizePhrase(t(getText.login.forgotPassword.title))}

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

                    {errors.root && <span className="pl-2 text-red-600 ">{errors.root.message}</span>}

                    <div className="form-group form-mg-top-30">
                      <div className="ecom-wc__button ecom-wc__button--bottom">
                        <button
                          className="homec-btn homec-btn__second"
                          // onClick={handleSubmit2}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          <span>{isSubmitting ? capitalizePhrase(t(getText.common.loading)) : capitalizePhrase(t(getText.common.sendMail)) }</span>
                        </button>

                      </div>
                    </div>
                    {/* Form Group  */}
                    <div className="form-group mg-top-20">
                      <div className="ecom-wc__bottom">
                        <p className="ecom-wc__text">
                          <Link to="/login">{capitalizePhrase(t(getText.common.cancel))}</Link>
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

export default ForgotPassword;
