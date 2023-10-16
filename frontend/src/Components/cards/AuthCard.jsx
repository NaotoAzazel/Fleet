import authIcon from "../../assets/authIcon.png"
import { Button } from "../UI/Button.jsx";
import "../../Styles/globals.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lphkjfehwkufelsdxcjc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaGtqZmVod2t1ZmVsc2R4Y2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA0NDkxMTIsImV4cCI6MjAwNjAyNTExMn0.16oJ7M-_hJU2k92qEswCS0iNTrjU5iHypwq7DrhrOHw"
);

async function handleLogin() {
  try {
    await supabase.auth.signInWithOAuth({ provider: 'discord' });
  } catch(err) {
    console.error(err);
  }
}

function AuthCard() {
  return (
    <div className="mx-auto sm:p-6 grid place-items-center gap-5 p-3 bg-modalBackground rounded-[10px] border border-borderColor">
      <div className="overflow-hidden">
        <img 
          src={authIcon} 
          width="64" 
          height="64" 
          alt="Auth icon" 
          className="mx-auto animate-blur duration-700" 
        />
      </div>
      <h1 className="font-bold text-3xl tracking-tight mx-auto">Вход в аккаунт</h1>
      <div className="space-x-4 mt-3">
        <Button 
          variant="outline" 
          onClick={handleLogin}
        >
          Дискорд
        </Button>
        <Button href="/">Главная</Button>
      </div>
    </div>
  )
}

export default AuthCard