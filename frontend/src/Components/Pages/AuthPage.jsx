import { useEffect, useContext } from 'react';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../cards/AuthCard';

function AuthPage() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(Object.keys(user).length) navigate("/");
  }, [!loading]);

  return (
    <main className="bg-background">
      <div className="min-h-screen text-white relative flex items-center container">
        <AuthCard />
      </div>
    </main>
  )
}

export default AuthPage;