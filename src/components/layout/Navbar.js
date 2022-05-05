import React from "react";
import { Outlet, Link } from "react-router-dom";
import { authLogout } from "../../store/action/auth-action";
import { useDispatch } from "react-redux";

function Navbar({ isAuthenticated, userEmail }) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authLogout());
  };

  return (
    <>
      <div className="shadow-lg h-[125]">
        <div className="container mx-auto">
          <header className="md:flex md:items-center md:justify-between p-4 pb-0 md:pb-4">
            <div className="flex items-center justify-between mb-4 md:mb-0">
              <h1 className="leading-none text-2xl text-grey-darkest">
                <Link
                  className="no-underline text-grey-darkest hover:text-black"
                  to="/"
                >
                  React chat
                </Link>
              </h1>
            </div>

            <nav>
              <ul className="list-reset md:flex md:items-center">
                {isAuthenticated ? (
                  <>
                    <li className="md:ml-4">
                      <p className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0">
                        {userEmail.email}
                      </p>
                    </li>

                    <li className="md:ml-4">
                      <Link
                        className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
                        onClick={logoutHandler}
                        to="/"
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="md:ml-4">
                      <Link
                        className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
                        to="register"
                      >
                        Register
                      </Link>
                    </li>
                    <li className="md:ml-4">
                      <Link
                        className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
                        to="/"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </header>
        </div>
      </div>
      <div className="w-full max-h-[94vh] max-w-7xl mx-auto">
        <Outlet />
      </div>
    </>
  );
}

export default Navbar;
