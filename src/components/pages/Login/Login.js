import React, { useState } from "react";
import { checkError } from "../../validator/InputValidators";
import { Link } from "react-router-dom";
import InputField from "../../UI/InputField";
import ButtonT from "../../UI/ButtonT";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../../store/action/auth-action";
import Spinner from "../../UI/spinner/Spinner";

function Login() {
  const [formInput, setFormInput] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const isLoading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
    const err = checkError(e.target.name, e.target.value, error);
    setError({ ...err });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(error).length > 0) return;
    dispatch(authLogin(formInput.email, formInput.password));
  };

  return (
    <>
      {isLoading &&
        ReactDOM.createPortal(
          <Spinner message={"Logging in..."} />,
          document.getElementById("spinner")
        )}
      <div className="flex justify-center pt-20">
        <div className="sm:w-11/12 md:w-9/12 xl:w-2/5 bg-white rounded shadow-md p-8 m-4">
          <span className="block w-full text-xl text-center uppercase font-bold mb-4 border-b">
            Login
          </span>
          <form className="mb-4" onSubmit={handleSubmit}>
            <InputField
              parentclassname={"mb-6 md:w-full"}
              label={"email"}
              type={"email"}
              name={"email"}
              placeholder={"enter your email"}
              value={formInput.email}
              onchange={handleChange}
              error={error.email}
            />

            <InputField
              parentclassname={"mb-6 md:w-full"}
              label={"password"}
              type={"password"}
              name={"password"}
              placeholder={"enter your password"}
              value={formInput.password}
              onchange={handleChange}
              error={error.password}
            />

            <div className="text-center">
              <ButtonT
                type={"submit"}
                color="bg-green-500"
                hovercolor="hover:bg-green-700"
              >
                Login
              </ButtonT>
            </div>
          </form>
          <p className="text-center text-sm pt-2">
            Do not have an account?{" "}
            <Link to="/register" className="text-blue-700">
              Create an account
            </Link>
          </p>
          <p className="text-center text-sm pt-1">
            <Link to="/" className="text-blue-700 ">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
