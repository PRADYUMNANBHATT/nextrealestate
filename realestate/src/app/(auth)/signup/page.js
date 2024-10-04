"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { SignupSchema } from "@/../validation/schemas";
import Link from "next/link";
import { useCreateUserMutation } from "@/lib/services/authSlice";
import { useRouter } from "next/navigation";
//sign up with out any library validator
// const Signup = () => {
//   const [email, setEmai] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmpassword, setCPassword] = useState("");
//   const [isDisable, setIsDisable] = useState(true);
//   const [error, seterror] = useState("");
//   useEffect(() => {
//     if (
//       email.includes("@") &&
//       password.length > 5 &&
//       password === confirmpassword
//     ) {
//       setIsDisable(false);
//     } else {
//       setIsDisable(true);
//     }
//   });
//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     seterror(email);
//   };
//   return (
//     <section className=" flex flex-col align-middle justify-center items-center w-full h-[100vh]  bg-violet-300">
//       <form
//         onSubmit={handleOnSubmit}
//         className="flex flex-col flex-wrap shadow-md align-middle rounded-sm justify-center items-center bg-white shadow-violet-400 border-gray-100 rounded-s p-5 lg:w-[400px] lg:h-[400px]"
//       >
//         <label htmlFor="login">Sign In Form</label>
//         <input
//           type="email"
//           name="email"
//           value={email}
//           onChange={(e) => setEmai(e.target.value)}
//           placeholder="Email or username"
//           className="bg-gray-50 border border-gray-300  shadow-md shadow-slate-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2 dark:bg-gray-700 dark:border-gray-600 mt-5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="bg-gray-50 border  shadow-md shadow-slate-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-2 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           required
//         />
//         <input
//           type="password"
//           name="confirmpassword"
//           value={confirmpassword}
//           onChange={(e) => setCPassword(e.target.value)}
//           placeholder="Confirm Password"
//           className="bg-gray-50 border  shadow-md shadow-slate-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-2 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           required
//         />
//         <button
//           type="submit"
//           className="mt-2 pt-1 pb-1 pr-3 shadow-md  shadow-slate-500 pl-3 border-2 hover:border-white hover:bg-violet-500 hover:text-white hover:pr-5 hover:pl-5 transition-all  rounded border-slate-600"
//           disabled={isDisable}
//         >
//           Sign In
//         </button>
//       </form>
//       <p className="text-red-500">{error}</p>
//     </section>
//   );
// };

//signup with library validator yup and formik

const initialValues = {
  name: "",
  email: "",
  password: "",
  password_confirm: "",
};
const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [serverSuccessMessage, setServerSuccessMessage] = useState("");
  const [createUser] = useCreateUserMutation();
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: SignupSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const responce = await createUser(values);
        if (responce.data && responce.data.status === "success") {
          action.resetForm();

          setServerSuccessMessage(responce.data.message);
          setServerErrorMessage("");
          setLoading(false);
          router.push("/verify-email");
        }
        if (responce.error) {
          setServerErrorMessage(responce.error.data.message);
          setServerSuccessMessage("");
          setLoading(false);
        }
      } catch (error) {
        setServerErrorMessage(error.data.message);
        setLoading(false);
      }
      setLoading(false);
    },
  });

  return (
    <section className=" flex flex-col align-middle justify-center items-center w-full h-[100vh]  bg-violet-300">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-wrap shadow-md align-middle rounded-sm justify-center items-center bg-white shadow-violet-400 border-gray-100 rounded-s p-5 lg:w-[400px] "
      >
        <label htmlFor="login">Sign In Form</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="username"
          className="bg-gray-50 border border-gray-300  shadow-md shadow-slate-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2 dark:bg-gray-700 dark:border-gray-600 mt-5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {errors.name && (
          <div className="text-sm text-red-500">{errors.name}</div>
        )}
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          className="bg-gray-50 border border-gray-300  shadow-md shadow-slate-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2 dark:bg-gray-700 dark:border-gray-600 mt-2 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {errors.email && (
          <div className="text-sm text-red-500">{errors.email}</div>
        )}
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          className="bg-gray-50 border  shadow-md shadow-slate-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-2 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {errors.password && (
          <div className="text-sm text-red-500">{errors.password}</div>
        )}
        <input
          type="password"
          name="password_confirm"
          // value={confirmpassword}
          // onChange={(e) => setCPassword(e.target.value)}
          value={values.password_confirm}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="bg-gray-50 border  shadow-md shadow-slate-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-2 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {errors.password_confirm && (
          <div className="text-sm text-red-500">{errors.password_confirm}</div>
        )}
        <button
          type="submit"
          className="mt-2 pt-1 pb-1 pr-3 shadow-md  shadow-slate-500 pl-3 border-2 hover:border-white hover:bg-violet-500 hover:text-white hover:pr-5 hover:pl-5 transition-all  rounded border-slate-600"
          disabled={loading}
        >
          Sign In
        </button>
        <Link href={"/login"} className="text-blue-500 hover:text-blue-800">
          Already have an account ?
        </Link>
      </form>
      {serverErrorMessage && (
        <div className="text-sm bg-red-500 p-3 shadow-lg shadow-violet-300 rounded w-[400px]">
          {serverErrorMessage}
        </div>
      )}
      {serverSuccessMessage && (
        <div className="text-sm bg-green-500 p-3 shadow-lg rounded">
          {serverErrorMessage}
        </div>
      )}
    </section>
  );
};
export default Signup;
