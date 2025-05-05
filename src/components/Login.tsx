import { useState, FC } from "react";
import type { User } from "@supabase/supabase-js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

interface LoginProps {
  onAuthChange: (user: User | null) => void;
}

const Login: FC<LoginProps> = ({ onAuthChange }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, login, logout } = useAuth();

  // Update parent component when auth state changes
  if (user) {
    onAuthChange(user);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    onAuthChange(null);
  };

  if (user) {
    return (
      <div className="p-4 flex justify-between items-center bg-white shadow">
        <span>Connecté·e : {user.email}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Déconnexion
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-4 bg-white shadow rounded">
        <h2 className="text-lg mb-4">Connexion</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Connexion
        </button>

        {/* <Register onSignUp={setUser} />  */}
        <p className="text-center mt-4">
          Vous n'avez pas de compte ?
          <Link to="/register " className="text-blue-500">
            {" "}
            S'inscrire
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
