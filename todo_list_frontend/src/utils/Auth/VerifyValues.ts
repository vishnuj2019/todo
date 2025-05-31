import { IAuth } from "../../types/Auth/SignupTypes";

export const verify = (formData: IAuth, from: string) => {
     const { username, password, confirm_password } = formData

     const errors: IAuth = {
          username: "",
          password: "",
          confirm_password: ""
     }

     if (!username.trim() || username.length <= 2 || username.length >= 20) {
          errors.username = "Username must be 3 to 20 characters"
     }
     if (/\W/g.test(username)) {
          errors.username = "Special charactor not allowed and number not allowed"
     }
     if (!password.trim() || password.length < 8) {
          errors.password = "Password must contain 8 charactors or above"
     }
     if (from === "signup") {
          if (!confirm_password!?.trim() || confirm_password !== password) {
               errors.confirm_password = "Confirm password should match with password"
          }
     }
     return errors
}