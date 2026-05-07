import { useEffect, useState } from "react";
import { UserInfo } from "../types/auth.type";
import { getUserInfo } from "../services/auth.services";

export const useUser = () => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const userInfo = await getUserInfo();
            setUser(userInfo);
        } catch (error) {
            console.error("Failed to fetch user in hook:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        refetch: fetchUser
    };
};