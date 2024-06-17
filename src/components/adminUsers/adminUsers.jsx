import { getUsers } from "@/lib/data";
import styles from "./adminUsers.module.css";
import AdminUserCard from "@/components/adminUserCard/adminUserCard";
import { auth } from "@/lib/auth";
import DeleteAllUsersButton from "../deleteAllUsersButton/deleteAllUsersButton";

const AdminUsers = async () => {
  let users = await getUsers();
  const session = await auth();

  users = users.filter((user) => !user.isDeleted);

  const currentUser = users.find((user) => user.email === session.user.email);

  return (
    // <div className={styles.container}>
    <div className={styles.mainContainer}>
      <div className="flex items-center justify-between gap-2 w-full">
        <h1>
          Users {"("} {users.length} {")"}
        </h1>
        {users.length > 0 && <DeleteAllUsersButton />}
      </div>
      {users.map((user) => (
        <div key={user.id} className={styles.user}>
          <AdminUserCard
            user={JSON.parse(JSON.stringify(user))}
            currentUser={JSON.parse(JSON.stringify(currentUser))}
          />
        </div>
        // <div className={styles.user} key={user.id}>
        //   <div className={styles.detail}>
        //     <span>{user.username}</span>
        //   </div>
        //   <form action={deleteUser}>
        //     <input type="hidden" name="id" value={user.id} />
        //     <button className={styles.userButton}>Delete</button>
        //   </form>
        // </div>
      ))}
    </div>
  );
};

export default AdminUsers;
