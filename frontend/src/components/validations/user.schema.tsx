import * as yup from "yup";
import "yup-phone-lite";

export const UserSchema = yup.object({
    emailOrPhone: yup.string().required("Email or Phone Number is required"),
    password: yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character")
      .required("Password is required"),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });


export const getSignupSchema = () => {
  return yup.object().shape({
    email: yup.string().email("Invalid email").optional(),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    username: yup.string().required("Username is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Please confirm your password"),
  });
};

export const getSignInSchema = () => {
  return yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    identifier: yup.string().required("Email Or Phone number required"),
    
  });
};