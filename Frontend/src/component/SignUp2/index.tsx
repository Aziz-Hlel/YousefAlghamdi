import { useEffect, useState } from "react";
import WelcomeCard from "../Cards/WelcomeCard";
import PropertyTextInput from "../Form/PropertyTextInput2";
import Preloader from "../Loader";
import { Link, useNavigate } from "react-router-dom";
import logo_img from "@img/logo_sign_in.jpg"
import Http from "@src/services/Http";
import apiGateway from "@src/apiGateway";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";





const SignUpSchema = z.object({
  firstName: z.string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(25, { message: "First name must be at most 25 characters long" }),

  lastName: z.string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(25, { message: "Last name must be at most 25 characters long" }),

  phoneNumber: z.string()
    .min(5, { message: "Phone number must be at least 5 characters long" })
    .max(17, { message: "Phone number must be at most 17 characters long" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z.string()
    .min(1, { message: "Password must be at least 6 characters long" })
    .max(25, { message: "Password must be at most 25 characters long" }),

  confirmPassword: z.string()
    .min(1, { message: "Confirm password must be at least 6 characters long" })
    .max(25, { message: "Confirm password must be at most 25 characters long" }),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


type SignUpSchemaType = z.infer<typeof SignUpSchema>


const SignUp = () => {

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  const submitHandler: SubmitHandler<SignUpSchemaType> = async (data) => {

    const response = await Http.post(apiGateway.user.signUp, data);

    response.status === 200 ? navigate("/") : console.log(response);
    response.status === 409 && setError("email", { message: "Email already exists" })
    console.log(response.status, typeof response.status);

    if (response?.status !== 200 && response.status !== 409) {
      setError("root", { message: "no edge case for this one" })
    }

  }



  // Loading Handle
  const [isLoading, setisLoadingg] = useState(true);
  useEffect(() => {
    setisLoadingg(false);
  }, []);

  let component = undefined;

  const navigate = useNavigate();

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const response = await Http.post(apiGateway.user.signUp, input)

  //   response.status === 200 ? navigate("/login") : console.log(response);
  //   response.status === 200 && console.log("true");
  //   console.log(response.status, typeof response.status);


  // };

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
                    Create Account
                    <span>
                      Your email address will not be published. Required fields
                      are marked *
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
                        title="First Name*"
                        placeholder="Jhon"
                        margin="-10px"
                        fieldRegister={register('firstName')}
                        fieldError={errors.firstName}
                      />
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title="Last Name*"
                        placeholder="Doe"
                        margin="-10px"
                        fieldRegister={register('lastName')}
                        fieldError={errors.lastName}
                      />

                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title="Phone Number*"
                        placeholder="+971 50 123 4567"
                        margin="-10px"
                        fieldRegister={register('phoneNumber')}
                        fieldError={errors.phoneNumber}
                      />
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title="Email Address*"
                        placeholder="demo3243@gmail.com"
                        margin="-10px"
                        fieldRegister={register('email')}
                        fieldError={errors.email}
                      />
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title="Password*"
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        type="password"
                        margin="-10px"
                        fieldRegister={register('password')}
                        fieldError={errors.password}
                      />
                      <PropertyTextInput
                        size="col-lg-6 col-md-6"
                        title="Confirm Password*"
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
                          <span>{isSubmitting ? "Loading" : "Sign up"}</span>
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
                          Already have an account ?<Link to="/login">Login</Link>
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
