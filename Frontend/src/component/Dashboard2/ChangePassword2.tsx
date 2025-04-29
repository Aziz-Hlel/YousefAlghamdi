import { useAuth } from "@src/providers/AuthProvider.context";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { useForm } from "react-hook-form";


type ChangePasswordFields = {
  password: string;
  confirmPassword: string;
};

function ChangePassword() {

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<ChangePasswordFields>();
  const { logout } = useAuth()
  const passwordRegister = register("password", {
    required: "Email is required",
    minLength: { value: 8, message: "Password must be at least 8 characters", },

  });

  const confirmPasswordRegister = register("confirmPassword", {

    required: "Confirm password is required",

    minLength: { value: 8, message: "Confirm password must be at least 8 characters", }

  });

  const onSubmit = async (data: ChangePasswordFields) => {

    
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }
    const response = await Http.patch(apiGateway.user.changePassword, data)
    response?.status !== 200 && setError("root", { message: "something went wrong" })
    response?.status === 200 &&  logout()

  }


  return (
    <div className="col-lg-9 col-md-8 col-12 mg-top-30">
      <div className="homec-dashboard__inner homec-border">
        <div className="row">
          <div className="col-lg-7 col-12">
            <h3 className="ecom-wc__form-title homec-dashboard__password">
              Update your Password{" "}
              <span className="pd-btm-30">
                Your email address will not be published. Required fields are
                marked *
              </span>
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
                      Password*
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
                      Confirm Password*
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
                    <span>Update Password</span>
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
