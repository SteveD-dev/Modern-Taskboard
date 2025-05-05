import { FC, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

interface RegisterProps {
  onSignUp: (user: User | null) => void;
}

const Register: FC<RegisterProps> = ({ onSignUp }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { register, user } = useAuth();
  
  // Update parent component when auth state changes
  if (user) {
    onSignUp(user);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register(email, password)
      navigate('/', { replace: true })
      alert('Inscription réussie ! Veuillez vérifier votre email pour confirmer.')
    } catch (error: any) {
      alert(error.message)
      onSignUp(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded ">
        <h2 className="text-lg mb-4">Créer un compte</h2>
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
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>

      {/* {!user && <Login onAuthChange={setUser} />} */}
      <p className="text-center mt-4">
        Vous avez deja un compte ?
        <Link to="/login" className="text-blue-500">
          Se connecter
        </Link>
      </p>
    </div>
  );
};

export default Register;
