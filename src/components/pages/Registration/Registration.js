import React, { useState } from "react";
import { checkError } from "../../validator/InputValidators";
import { MatchPassword } from "../../validator/MatchPassword";
import { Link } from "react-router-dom";
import InputField from "../../UI/InputField";
import ButtonT from "../../UI/ButtonT";
import ProfilePicDropzone from "./ProfilePicDropzone";
import ReactDOM from "react-dom";
import Spinner from "../../UI/spinner/Spinner";

import { useDispatch, useSelector } from "react-redux";
import { registerUsr } from "../../../store/action/auth-action";

function Login() {
  const [formInput, setFormInput] = useState({
    name: "",
    profilePicture: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    name: "",
    profilePicture: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      const err = MatchPassword(
        e.target.name,
        e.target.value,
        formInput.password,
        formInput.confirmPassword,
        error
      );

      setError({ ...err });
    } else {
      const err = checkError(e.target.name, e.target.value, error);
      setError({ ...err });
    }
  };

  const isLoading = useSelector((state) => state.auth.loading);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(error).length > 1 && error.profilePicture === "") return;

    dispatch(
      registerUsr(
        formInput.name,
        formInput.email,
        formInput.password,
        formInput.profilePicture,
        formInput.profilePicture?.type
      )
    );
  };

  return (
    <>
      {isLoading &&
        ReactDOM.createPortal(
          <Spinner message={"creating your profile..."} />,
          document.getElementById("spinner")
        )}
      <div className="flex justify-center pt-20">
        <div className="sm:w-11/12 md:w-9/12 xl:w-2/5  bg-white rounded shadow-md p-8 m-4">
          <span className="block w-full text-xl text-center uppercase font-bold mb-4 border-b">
            Register
          </span>

          <form className="mb-4" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <ProfilePicDropzone
                value={formInput.profilePicture}
                setData={setFormInput}
                setError={setError}
              />
              <p className="text-sm pt-1 text-red-600/100">
                {error.profilePicture}
              </p>
            </div>

            <InputField
              parentclassname={"mb-6 md:w-full"}
              label={"Username"}
              name={"name"}
              placeholder={"enter your username"}
              value={formInput.name}
              onchange={handleChange}
              error={error.name}
            />

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

            <InputField
              parentclassname={"mb-6 md:w-full"}
              label={"confirm password"}
              type={"password"}
              name={"confirmPassword"}
              placeholder={"enter your password again"}
              value={formInput.confirmPassword}
              onchange={handleChange}
              error={error.confirmPassword}
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
            <Link to="/" className="text-blue-700">
              Already have an account?
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
