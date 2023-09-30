import { useAppSelector } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "features/auth/authSlice";
import { Endpoints } from "features/router/endpoints";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface Props {
  children: React.ReactElement |  React.ReactElement[];
}

export const ProtectedRoute = ({ children }: Props): React.ReactElement | React.ReactElement[] | null => {
  const auth = useAppSelector(selectAuth);
    const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      toast('You need to sign in first!');
      navigate(Endpoints.SIGN_IN);
    }
  }, []);
  
  return auth.token ? children : null;
};