import * as Yup from "yup";
export const SignupSchema = Yup.object({
  name: Yup.string().required("UserName Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(12, "Too Long!")
    .required("Password Required"),
  password_confirm: Yup.string()
    .min(5, "Too Short!")
    .max(12, "Too Long!")
    .oneOf([Yup.ref("password"), null], "password missmatch!")
    .required("confirm passwordRequired"),
});
export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(12, "Too Long!")
    .required("Password Required"),
});
export const ForgotPasswordSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email Required"),
});
export const passwordChangeSchema = Yup.object({
  password: Yup.string()
    .min(5, "Too Short!")
    .max(12, "Too Long!")
    .required("Password Required"),
  confirmpassword: Yup.string()
    .min(5, "Too Short!")
    .max(12, "Too Long!")
    .oneOf([Yup.ref("password"), null], "password missmatch!")
    .required("confirm passwordRequired"),
});
export const OtpSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email Required"),
  otp: Yup.string().min(4, "minimum four digit").required("otp Required"),
});
