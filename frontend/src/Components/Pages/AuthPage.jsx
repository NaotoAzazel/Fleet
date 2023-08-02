import { useEffect, useContext } from 'react';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import authIcon from "../../assets/authIcon.png"
import { MyButton } from "../UI/MyButton.jsx";
import "../../Styles/globals.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lphkjfehwkufelsdxcjc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaGtqZmVod2t1ZmVsc2R4Y2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA0NDkxMTIsImV4cCI6MjAwNjAyNTExMn0.16oJ7M-_hJU2k92qEswCS0iNTrjU5iHypwq7DrhrOHw"
)

function AuthPage() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(Object.keys(user).length) navigate("/");
  }, [!loading]);

  async function handleLogin() {
    try {
      await supabase.auth.signInWithOAuth({ provider: 'discord' });
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <main className="bg-background">
      <div className="min-h-screen text-white relative flex items-center container">
        <div className="mx-auto sm:p-6 grid place-items-center gap-5 p-3 bg-cardBackground rounded-[10px] border border-borderColor">
          <div className="overflow-hidden">
            <img src={authIcon} width="64" height="64" alt="Auth icon" className="mx-auto animate-blur rounded-lg" />
          </div>
          <h1 className="font-bold text-3xl tracking-tight mx-auto">Вход в аккаунт</h1>
          <div className="space-x-4 mt-3">
            <MyButton 
              variant="outline" 
              onClick={handleLogin}
            >
              Дискорд
            </MyButton>
            <MyButton href="/">Главная</MyButton>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AuthPage;