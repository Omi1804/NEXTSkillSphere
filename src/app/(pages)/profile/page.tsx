import { ProfileClient } from "@/components/Profile/Profileclient";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

const ProfileLayout = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/profile");
  }

  const enrolledCount = user.purchases?.length ?? 0;
  const accountTag = `#${user.id.slice(-6)}`;

  return (
    <ProfileClient
      name={user.name}
      email={user.email}
      accountTag={accountTag}
      enrolledCount={enrolledCount}
      role={user.role}
    />
  );
};

export default ProfileLayout;
