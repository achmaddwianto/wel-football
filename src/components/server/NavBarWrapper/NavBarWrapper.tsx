import NavBar from "@/components/client/Header/NavBar";
import { auth } from "../../../../auth";
import React from "react";

const NavBarWrapper = async () => {
  const session = await auth();

  return <NavBar session={session} />;
};

export default NavBarWrapper;
