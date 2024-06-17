import { Suspense } from "react";
import styles from "./admin.module.css";
import AdminPosts from "@/components/adminPosts/adminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUserForm/adminUserForm";
import { auth } from "@/lib/auth";
import { getUsers } from "@/lib/data";

const AdminPage = async () => {
  const session = await auth();
  let users = await getUsers();

  users = users.filter((user) => !user.isDeleted);

  const currentUser = users.find((user) => user.email === session.user.email);

  return (
    <div className={styles.container}>
      <div className="relative">
        <div className={styles.row}>
          <div className={styles.col}>
            <Suspense fallback={<div>Loading...</div>}>
              <AdminPosts />
            </Suspense>
          </div>
          <div className={styles.col}>
            <AdminPostForm userId={currentUser.id} />
          </div>
        </div>
      </div>
      <div className="relative">
        <div className={styles.row}>
          <div className={styles.col}>
            <Suspense fallback={<div>Loading...</div>}>
              <AdminUsers />
            </Suspense>
          </div>
          <div className={styles.col}>
            <AdminUserForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
