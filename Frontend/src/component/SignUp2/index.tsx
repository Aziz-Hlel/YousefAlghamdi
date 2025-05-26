import { useEffect, useState } from "react";
import WelcomeCard from "../Cards/WelcomeCard2";
import PropertyTextInput from "../Form/PropertyTextInput2";
import Preloader from "../Loader";
import { Link, useNavigate } from "react-router-dom";
import logo_img from "@img/logo_sign_in.jpg"
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import companyInfo from "@src/data/companyInfo";
import { useAuth } from "@src/providers/AuthProvider.context";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import useSignUpSchema from "@src/schemas/useSignUpSchema";





const SignUpSchema = z.object({
  firstName: z.string({ required_error: "First name is required" })
    .min(1, { message: "First name is required" })  // Custom message for required field
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(25, { message: "First name must be at most 25 characters long" })
    .regex(/^[A-Za-z]+$/, { message: "First name can only contain letters" }),


  lastName: z.string({ required_error: "Last name is required" })
    .min(1, { message: "Last name must be at least 2 characters long" })
    .max(25, { message: "Last name must be at most 25 characters long" })
    .regex(/^[A-Za-z]+$/, { message: "Last name can only contain letters" }),


  phoneNumber: z.string({ required_error: "Phone number is required" })
    .min(1, { message: "Phone number must be at least 5 characters long" })
    .max(17, { message: "Phone number must be at most 17 characters long" }),

  email: z.string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z.string({ required_error: "Password is required" })
    .min(1, { message: "Password must be at least 6 characters long" })
    .max(25, { message: "Password must be at most 25 characters long" }),

  confirmPassword: z.string({ required_error: "Confirm password is required" })
    .min(1, { message: "Confirm password must be at least 6 characters long" })
    .max(25, { message: "Confirm password must be at most 25 characters long" }),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}


);


export type SignUpSchemaType = z.infer<typeof SignUpSchema>


const SignUp = () => {

  const SignUpSchema = useSignUpSchema();

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  const { signup } = useAuth();

  const { t } = useTranslation(["common", "login",]);

  const submitHandler: SubmitHandler<SignUpSchemaType> = async (data) => {

    const response = await signup(data);

    response?.status === 200 && navigate("/");
    response?.status === 409 && setError("email", { message: capitalizePhrase(t(getText.errors.signUp.email.alreadyExists)) })
    if (response && response?.status !== 200 && response?.status !== 409) {
      console.log(response.data.errors);

      Object.keys(response.data.errors).map((key: any) => {
        setError(key, { message: response.data.errors[key] })
      })
    }



  }



  // Loading Handle
  const [isLoading, setisLoadingg] = useState(true);
  useEffect(() => {
    setisLoadingg(false);
  }, []);

  let component = undefined;

  const navigate = useNavigate();

  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <section
        className="ecom-wc ecom-wc__full ecom-bg-cover"
        style={{ backgroundImage: `url('/img/credential-bg.svg')` }}
      >
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-lg-6 col-12">
              <div className="ecom-wc__form">
                <div className="ecom-wc__form-inner">
                  <h3 className="ecom-wc__form-title ecom-wc__form-title__one">
                    {capitalizePhrase(t(getText.login.signUp.title))}

                    <span>
                      {capitalizePhrase(t(getText.common.noPublishPersonalInfo))}
                    </span>
                  </h3>
                  {/* Sign in Form  */}
                  <form
                    className="ecom-wc__form-main p-0  "
                    method="post"
                    onSubmit={handleSubmit(submitHandler)}
                  >
                    <div className="row">
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title={capitalizePhrase(t(getText.common.firstName))}
                        placeholder="Jhon"
                        margin="-10px"
                        fieldRegister={register('firstName')}
                        fieldError={errors.firstName}
                      />
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title={capitalizePhrase(t(getText.common.lastName))}
                        placeholder="Doe"
                        margin="-10px"
                        fieldRegister={register('lastName')}
                        fieldError={errors.lastName}
                      />

                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title={capitalizePhrase(t(getText.common.phoneNumber))}
                        placeholder={companyInfo.phone}
                        margin="-10px"
                        fieldRegister={register('phoneNumber')}
                        fieldError={errors.phoneNumber}
                      />
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title={capitalizePhrase(t(getText.common.emailAdress))}
                        placeholder="demo3243@gmail.com"
                        margin="-10px"
                        fieldRegister={register('email')}
                        fieldError={errors.email}
                      />
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title={capitalizePhrase(t(getText.common.password))}
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        type="password"
                        margin="-10px"
                        fieldRegister={register('password')}
                        fieldError={errors.password}
                      />
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title={capitalizePhrase(t(getText.common.confirmPassword))}
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        type="password"
                        margin="-10px"
                        fieldRegister={register('confirmPassword')}
                        fieldError={errors.confirmPassword}
                      />
                    </div>

                    {<span className="pl-2 text-red-600 ">{errors.root?.message}</span>}

                    <div className="form-group form-mg-top-30">
                      <div className="ecom-wc__button ecom-wc__button--bottom">
                        <button
                          className="homec-btn homec-btn__second"
                          type="submit"
                        >
                          <span>{isSubmitting ? capitalizePhrase(t(getText.common.loading)) : capitalizePhrase(t(getText.login.signUp.login))}</span>
                        </button>
                        {/* <button
                          className="homec-btn homec-btn__second homec-btn__social"
                          type="submit"
                        >
                          <span className="ntfmax-wc__btn-icon">
                            <img src="img/google.svg" alt="#" />
                          </span>
                          <span>Sign Up with Google</span>
                        </button> */}
                      </div>
                    </div>
                    {/* Form Group  */}
                    <div className="form-group mg-top-20">
                      <div className="ecom-wc__bottom">
                        <p className="ecom-wc__text">
                          {capitalizePhrase(t(getText.login.signUp.haveAccount))}<Link to="/login">{capitalizePhrase(t(getText.login.signUp.login))}</Link>
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
        </div >
      </section >
    );
  }
  return component;
}

export default SignUp;
