import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notifyError } from "../hooks/notifications";
import { confirmOauth, getOauthUrl } from "../redux/auth/operations";
import { AppThunkDispatch } from "../redux/store";

const GoogleRedirectHandler = (): JSX.Element => {
  const dispatch: AppThunkDispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      const code: string | null = searchParams.get("code");
      console.log("🔍 Google redirect detected, URL:", window.location.href);
      console.log("🔑 Extracted code:", code);
      if (!code) {
        notifyError("Authorization code not found");
        navigate("/login");
        return;
      }

      try {
        console.log("🚀 Dispatching confirmOauth with code:", code);
        dispatch(confirmOauth({ code }));
        navigate("/catalog");
        console.log("✅ Google login successful! Redirecting to /catalog...");
      } catch (error: any) {
        console.error("❌ Google login error:", error);
        notifyError(error.message);
        navigate("/login");
      }
    };
    handleGoogleAuth();
  }, [dispatch, navigate, searchParams]);

  return <div>Processing Google Authorization...</div>;
};

export default GoogleRedirectHandler;
