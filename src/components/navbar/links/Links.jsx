"use client";

import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { handleLogout } from "@/lib/action";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Games",
    path: "/games",
  },
  {
    title: "Admin",
    path: "/admin",
  },
  {
    title: "Account",
    path: "/account",
  },
];

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <NavLink item={{ title: "Home", path: "/" }} />
        {session?.user ? (
          <>
            {session.user != null && (
              <NavLink item={{ title: "Games", path: "/games" }} />
            )}
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            {session.user != null && (
              <NavLink item={{ title: "Account", path: "/account" }} />
            )}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {!session?.user && (
            <>
              <NavLink item={{ title: "Home", path: "/" }} key="home" />
              <NavLink item={{ title: "Login", path: "/login" }} key="login" />
            </>
          )}
          {session?.user && (
            <>
              {links.map((link) =>
                link.title === "Admin" && session.user?.isAdmin ? (
                  <NavLink item={link} key={link.title} />
                ) : (
                  <NavLink item={link} key={link.title} />
                )
              )}
              <form action={handleLogout}>
                <button className={styles.logout}>Logout</button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Links;
