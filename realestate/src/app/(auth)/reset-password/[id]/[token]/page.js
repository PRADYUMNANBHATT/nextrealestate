"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { passwordChangeSchema } from "@/../validation/schemas";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/lib/services/authSlice";
const initialValues = {
  password: "",
  confirmpassword: "",
};
const ResetPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [serverSuccessMessage, setServerSuccessMessage] = useState("");
  const [resetPassword] = useResetPasswordMutation();
  const { id, token } = useParams();
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: passwordChangeSchema,

    onSubmit: async (values, action) => {
      const data = { ...values, id, token };
      setLoading(true);
      try {
        const responce = await resetPassword(data);

        if (responce.data && responce.data.status === "success") {
          action.resetForm();

          setServerSuccessMessage(responce.data.message);
          setServerErrorMessage("");
          setLoading(false);
          router.push("/login");
        }
        if (responce.error) {
          setServerErrorMessage(responce.error.data.message);
          setServerSuccessMessage("");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
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
        <label htmlFor="login">ResetPassword</label>

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
          name="confirmpassword"
          // value={confirmpassword}
          // onChange={(e) => setCPassword(e.target.value)}
          value={values.confirmpassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="bg-gray-50 border  shadow-md shadow-slate-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-2 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {errors.confirmpassword && (
          <div className="text-sm text-red-500">{errors.confirmpassword}</div>
        )}
        <button
          type="submit"
          className="mt-2 pt-1 pb-1 pr-3 shadow-md  shadow-slate-500 pl-3 border-2 hover:border-white hover:bg-violet-500 hover:text-white hover:pr-5 hover:pl-5 transition-all  rounded border-slate-600"
          disabled={loading}
        >
          {loading ? "Reseting Password..." : "ResetPassword"}
        </button>
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
export default ResetPassword;
