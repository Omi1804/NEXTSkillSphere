import { getCurrentUser } from "@/lib/getCurrentUser";
import { HeaderClient } from "./HeaderClient";
import { HeaderUser } from "@/types/header.types";

const Header = async () => {
  const currentUser = await getCurrentUser();

  const safeUser: HeaderUser | null = currentUser
    ? {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        username: currentUser.username,
      }
    : null;

  return <HeaderClient initialUser={safeUser} />;
};

export default Header;
