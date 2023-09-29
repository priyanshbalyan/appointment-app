import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "features/auth/authSlice";
import { type User } from "common/types";

export const useAuth = (): { user: User | null } => {
	const user = useSelector(selectCurrentUser);

	return useMemo(() => ({ user }), [user]);
};
