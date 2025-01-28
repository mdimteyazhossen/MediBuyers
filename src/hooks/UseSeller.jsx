import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxios from "./useAxios";

const UseSeller = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const { data: isSeller, isPending: isSellerLoading } = useQuery({
        queryKey: [user?.email, 'isSeller'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/seller/${user.email}`)
            console.log(res.data)
            return res.data?.seller;

        }
    })
    return [isSeller, isSellerLoading]
}

export default UseSeller