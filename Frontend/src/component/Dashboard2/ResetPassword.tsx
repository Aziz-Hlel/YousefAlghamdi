import getText from "@src/i18n/data/getText";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs2";
import HistoryLinks from "../Breadcrumbs2/HistoryLinks";


type ResetPasswordFields = {
  password: string;
  confirmPassword: string;
};

function ResetPassword() {

  const { register, handleSubmit, formState: { errors }, setError } = useForm<ResetPasswordFields>();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { t } = useTranslation(["common", "dashboard", "errors"]);
  const passwordRegister = register("password", {
    required: capitalizePhrase(t(getText.errors.changePassword.password.required)),
    minLength: { value: 6, message: capitalizePhrase(t(getText.errors.changePassword.password.atLeast6)) },

  });


  const confirmPasswordRegister = register("confirmPassword", {

    required: capitalizePhrase(t(getText.errors.changePassword.confirmPassword.required)),

    minLength: { value: 6, message: capitalizePhrase(t(getText.errors.changePassword.confirmPassword.atLeast6)) }

  });

  const onSubmit = async (data: ResetPasswordFields) => {


    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: capitalizePhrase(t(getText.errors.changePassword.confirmPassword.doNotMatch)) });
      return;
    }
    const response = await Http.post(`${apiGateway.user.resetPassword}`, data, { params: { email: searchParams.get("email"), token: searchParams.get("token") } })
    response?.status !== 200 && setError("root", { message: capitalizePhrase(t(getText.errors.changePassword.root.somethingWentWrong)) })
    response?.status === 200 && navigate('/login');

  }


  return (
    <div className=" ">
      <Breadcrumbs title={capitalizePhrase(t(getText.pagesTitle.lastestProperties))} >
        <HistoryLinks link="home" text={capitalizePhrase(t(getText.pagesTitle.home))} />
        <HistoryLinks
          link="property"
          text={capitalizePhrase(t(getText.pagesTitle.lastestProperties))}
          isActive={true}
        />
      </Breadcrumbs>
      <div className=" container">
        <div className="container flex justify-center my-20">
          <div className=" md:w-1/2 ">
            <h3 className="ecom-wc__form-title homec-dashboard__password">
              {capitalizePhrase(t(getText.dashboard.changePassword.title))}
            </h3>
            {/* Sign in Form */}
            <form
              className="ecom-wc__form-main p-0"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row">
                <div className="col-12">
                  <div className="form-group homec-form-input">
                    <label className="ecom-wc__form-label mg-btm-10">
                      {capitalizePhrase(t(getText.dashboard.changePassword.password))}
                    </label>
                    <div className="form-group__input">
                      <input
                        className="ecom-wc__form-input"
                        placeholder="●●●●●●"
                        type="password"
                        {...passwordRegister}
                      />
                      {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group homec-form-input">
                    <label className="ecom-wc__form-label mg-btm-10">
                      {capitalizePhrase(t(getText.dashboard.changePassword.confirmPassword))}
                    </label>
                    <div className="form-group__input">
                      <input
                        className="ecom-wc__form-input"
                        placeholder="●●●●●●"
                        type="password"
                        {...confirmPasswordRegister}
                      />
                      {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                    </div>
                  </div>
                </div>
              </div>
              {/* Form Group */}
              <div className="form-group form-mg-top25">
                <div className="ecom-wc__button ecom-wc__button--bottom">
                  {errors.root && <span className="pl-2 text-red-600 ">{errors.root.message}</span>}
                  <button className="homec-btn homec-btn__second" type="submit">
                    <span>{capitalizePhrase(t(getText.dashboard.changePassword.updatePassword))}</span>
                  </button>
                </div>
              </div>
            </form>
            {/* End Sign in Form */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
