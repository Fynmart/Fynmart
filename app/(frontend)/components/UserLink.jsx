import React from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

const UserLink = ({ loggedIn }) => {
  return (
    <>
      {loggedIn ? (
        <Link href="/userProfile">
          <FaUser className="text-[#000] size-6 md:size-6" />
        </Link>
      ) : (
        <Link href="/login">
          <FaUser className="text-[#000] size-6 md:size-6" />
        </Link>
      )}
    </>
  );
};

export default UserLink;
