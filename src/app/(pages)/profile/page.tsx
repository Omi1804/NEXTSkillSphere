import { ProfileClient } from "@/components/Profile/Profileclient";
import { getCurrentUser } from "@/lib/getCurrentUser";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const metadata: Metadata = createPageMetadata({
  title: "Profile",
  description: "Manage your eLearni profile, courses, and account progress.",
  path: "/profile",
  noIndex: true,
});

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
