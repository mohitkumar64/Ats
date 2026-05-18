"use client"
import NotLoggedIn from '@/components/NotLoggedIn';
import { useRouter } from 'next/navigation';
import { useUser } from "@/Providers/userProvider";


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { user } = useUser();
    if (!user) {
        return <NotLoggedIn />;
    }
    if (user.role !== "admin") {
        router.push("/");
        router.refresh();
    }


    return <>{children}</>;
};

export default AdminLayout;