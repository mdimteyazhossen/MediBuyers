import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from './useAuth';

const useCart = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  // Guard clause: Prevent the query from running if user is not logged in or user.email is not available
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['cart', user?.email],  // Use optional chaining to ensure user.email is available
    queryFn: async () => {
      // Only execute the query if user.email is available
      if (!user?.email) {
        return [];  // Return empty array if no email
      }
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,  // Only run the query if user.email is available
  });

  return [cart, refetch];
};

export default useCart;
