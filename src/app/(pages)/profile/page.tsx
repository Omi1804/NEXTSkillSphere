import { ProfileClient } from "@/components/Profile/Profileclient";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

const ProfileLayout = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const enrolledCount = user.courses?.length ?? 0;
  const accountTag = `#${user.id.slice(-6)}`;

  return (
    <ProfileClient
      name={user.name}
      email={user.email}
      username={user.username}
      accountTag={accountTag}
      enrolledCount={enrolledCount}
    />
  );
};

export default ProfileLayout;
