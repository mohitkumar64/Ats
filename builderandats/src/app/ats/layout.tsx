import { cookies } from "next/headers";
import NotLoggedIn from '@/components/NotLoggedIn';
import { getCurrentUser } from '../../../Lib/auth';

const AtsLayout = async ({ children }: { children: React.ReactNode }) => {

  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return <NotLoggedIn />;
  }

  const user = await getCurrentUser();

  if (!user) {
    return <NotLoggedIn />;
  }

  return <>{children}</>;
};

export default AtsLayout;