import getText from "@src/i18n/data/getText";
import { useAuth } from "@src/providers/AuthProvider.context";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";


type ChangePasswordFields = {
  password: string;
  confirmPassword: string;
};

function ChangePassword() {

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<ChangePasswordFields>();
  const { logout } = useAuth()
  const { t } = useTranslation(["common", "dashboard", "errors"]);
  const passwordRegister = register("password", {
    required: capitalizePhrase(t(getText.errors.changePassword.password.required)),
    minLength: { value: 8, message: capitalizePhrase(t(getText.errors.changePassword.password.atLeast8)) },

  });

  const confirmPasswordRegister = register("confirmPassword", {

    required: capitalizePhrase(t(getText.errors.changePassword.confirmPassword.required)),

    minLength: { value: 8, message: capitalizePhrase(t(getText.errors.changePassword.confirmPassword.atLeast8)) }

  });

  const onSubmit = async (data: ChangePasswordFields) => {


    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: capitalizePhrase(t(getText.errors.changePassword.confirmPassword.doNotMatch)) });
      return;
    }
    const response = await Http.patch(apiGateway.user.changePassword, data)
    response?.status !== 200 && setError("root", { message: capitalizePhrase(t(getText.errors.changePassword.root.somethingWentWrong)) })
    response?.status === 200 && logout()

  }


  return (
    <div className="col-lg-9 col-md-8 col-12 mg-top-30">
      <div className="homec-dashboard__inner homec-border">
        <div className="row">
          <div className="col-lg-7 col-12">
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

export default ChangePassword;
