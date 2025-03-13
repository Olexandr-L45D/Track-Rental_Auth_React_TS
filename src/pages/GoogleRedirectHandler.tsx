import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notifyError } from "../hooks/notifications";
import { confirmOauth, refreshSessionUser } from "../redux/auth/operations";
import { AppThunkDispatch } from "../redux/store";

const GoogleRedirectHandler = (): JSX.Element => {
  console.log("🔍 GoogleRedirectHandler RENDERED!"); // ✅ Перевіряємо, чи виконується код
  const dispatch: AppThunkDispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   console.log("🔄 Checking session...");
  // if (!session || !sessionStorage || !session.accesToken) {
  //   dispatch(refreshSessionUser());
  // }
  // }, [dispatch, session ]);
  //   dispatch(refreshSessionUser());
  // }, [dispatch]);

  useEffect(() => {
    console.log("🛠 useEffect запущено!");
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

        const resultAction = await dispatch(confirmOauth({ code })); // ✅ Додано await
        console.log("📌 Dispatch result:", resultAction);

        if (confirmOauth.fulfilled.match(resultAction)) {
          dispatch(refreshSessionUser());
          console.log("✅ Google login successful! Redirecting to /catalog...");
          navigate("/catalog");
        } else {
          console.error("❌ Google login failed:", resultAction);
          notifyError("Google login failed");
          navigate("/login");
        }
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

// try {
//   console.log("🚀 Dispatching confirmOauth with code:", code);
//   dispatch(confirmOauth({ code }));
//   navigate("/catalog");
//   console.log("✅ Google login successful! Redirecting to /catalog...");
// } catch (error: any) {
//   console.error("❌ Google login error:", error);
//   notifyError(error.message);
//   navigate("/login");
// }
