import authIcon from "../../assets/authIcon.png"
import { Button } from "../UI/Button.jsx";
import "../../Styles/globals.css";
import { supabaseClient } from "../../config/supabase-client.js";

async function HandleLogin() {
  try {
    await supabaseClient.auth.signInWithOAuth({ provider: 'discord' });
  } catch(err) {
    console.error(err);
  }
}

function AuthCard() {
  return (
    <div className="mx-auto sm:p-6 grid place-items-center gap-5">
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
          onClick={HandleLogin}
        >
          Дискорд
        </Button>
        <Button variant="outline"  href="/">Главная</Button>
      </div>
    </div>
  )
}

export default AuthCard