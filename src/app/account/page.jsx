import { Suspense } from "react";
import styles from "./account.module.css";
import AccountPosts from "@/components/accountPosts/accountPosts";
import AccountInfo from "@/components/accountInfo/accountInfo";
import DeleteUserButton from "@/components/deleteUserButton/deleteUserButton";

import { auth } from "@/lib/auth";

import { getUsers } from "@/lib/data";

const AccountPage = async () => {
  const session = await auth();
  let users = await getUsers();

  users = users.filter((user) => !user.isDeleted);

  const currentUser = users.find((user) => user.email === session.user.email);

  if (!currentUser) return null;

  return (
    <div className={styles.container}>
      <div key={currentUser.id}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Suspense fallback={<div>Loading...</div>}>
              <AccountPosts userId={currentUser.id} />
            </Suspense>
          </div>
          <div className={styles.col}>
            <div className="flex items-center justify-between gap-2 w-full mb-[2%]">
              <h1>Account Information</h1>
              <DeleteUserButton
                user={JSON.parse(JSON.stringify(currentUser))}
              />
            </div>
            <div className={styles.info}>
              <AccountInfo user={JSON.parse(JSON.stringify(currentUser))} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
