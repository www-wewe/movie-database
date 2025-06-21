import { useQuery } from "@tanstack/react-query";
import { AuthApi } from "../services";

const useAuth = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["/user/auth-info"],
        retry: false,
        queryFn: () => AuthApi.userAuth(),
        staleTime: 1000 * 60 * 10, // 2 minutes
        refetchOnWindowFocus: false,
    })

    return { auth: data, isLoading, isError };
}

export default useAuth;