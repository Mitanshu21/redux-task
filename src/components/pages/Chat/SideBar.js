import { DEFAULT_PROFILE_IMG } from "../../../firebase-url";

const defaultImg = DEFAULT_PROFILE_IMG;
function SideBar({
  loggedInUser,
  usersList,
  selectedUser,
  changeSelectedUser,
  classname,
  selectedClassname,
}) {
  const handleChange = (user) => {
    changeSelectedUser(user);
  };

  return (
    <div className="w-full justify-start sm:w-full md:w-[25%]">
      <ul className="list-none">
        {/* loggedin user */}
        {loggedInUser && (
          <div className="flex flex-col text-center bg-lime-600 shadow-md p-2 m-2 ml-0 rounded-sm cursor-pointer">
            <div className="w-20 h-20 m-auto">
              <img
                src={loggedInUser.img || defaultImg}
                alt="dp"
                className="shadow rounded-full w-full h-full m-auto align-middle border-none"
              />
            </div>
            <li className="text-white text-lg pt-2">{loggedInUser.name}</li>
          </div>
        )}

        {/* Users list */}
        <p className="text-center pt-6 border-b">ALL USERS</p>
        {usersList.length > 0 ? (
          usersList.map((user) => (
            <div
              className={
                selectedUser.email === user.email
                  ? selectedClassname
                  : classname
              }
              key={user.email}
              onClick={() => handleChange(user)}
            >
              <div className="w-16 max-h-64 px-3">
                <img
                  src={user.img || defaultImg}
                  alt="dp"
                  className="shadow rounded-full max-w-full h-8 m-auto align-middle border-none"
                />
              </div>
              <li className="flex items-center">{user.name}</li>
            </div>
          ))
        ) : (
          <p>No user available</p>
        )}
      </ul>
    </div>
  );
}

SideBar.defaultProps = {
  classname: "flex bg-white p-2 m-2 ml-0 rounded-sm cursor-pointer",
  selectedClassname: "flex bg-lime-600 p-2 m-2 ml-0 rounded-sm cursor-pointer",
};

export default SideBar;
