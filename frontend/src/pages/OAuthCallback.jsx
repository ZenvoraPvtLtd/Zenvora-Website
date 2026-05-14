import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error || !token) {
      navigate("/login?error=oauth_failed");
      return;
    }

    const user = {
      id: searchParams.get("id"),
      name: searchParams.get("name"),
      email: searchParams.get("email"),
      role: searchParams.get("role"),
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    navigate(user.role === "admin" ? "/admin" : "/");
    window.location.reload();
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white text-sm">Signing you in...</p>
    </div>
  );
};

export default OAuthCallback;
