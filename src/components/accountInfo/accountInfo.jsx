const AccountInfo = ({ user }) => {
  return (
    <>
      <p>
        <span className="flex-grow text-right pt-1 pb-1 pl-2 pr-2 mr-2 bg-[#2d2b42] text-gray-400 font-black rounded-full">
          Username:
        </span>
        {user.username}
      </p>

      <p>
        <span className="flex-grow text-right pt-1 pb-1 pl-2 pr-2 mr-2 bg-[#2d2b42] text-gray-400 font-black rounded-full">
          Email:
        </span>
        {user.email}
      </p>
      <p>
        <span className="flex-grow text-right pt-1 pb-1 pl-2 pr-2 mr-2 bg-[#2d2b42] text-gray-400 font-black rounded-full">
          Role:
        </span>
        <span
          className={`pl-4 pr-4 rounded-full font-black ${
            user.isAdmin
              ? "bg-yellow-300 text-[#2d2b42]"
              : "bg-[#2d2b42] text-[#9ca3af]"
          }`}
        >
          {user.isAdmin ? "admin" : "user"}
        </span>
      </p>
      <p>
        <span className="flex-grow text-right pt-1 pb-1 pl-2 pr-2 mr-2 bg-[#2d2b42] text-gray-400 font-black rounded-full">
          Account Created At:
        </span>
        {user.createdAt}
      </p>
    </>
  );
};

export default AccountInfo;
