import { Button } from "../UI/Button.jsx";
import { Link } from "react-scroll";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../context';
import { useContext } from "react";

const supabase = createClient(
  "https://lphkjfehwkufelsdxcjc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaGtqZmVod2t1ZmVsc2R4Y2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA0NDkxMTIsImV4cCI6MjAwNjAyNTExMn0.16oJ7M-_hJU2k92qEswCS0iNTrjU5iHypwq7DrhrOHw"
)

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { user, setUser } = useContext(AuthContext);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if(error) console.error(error);

    setUser({});
    navigate("/");
  };

  return (
    <header className="w-full border-b border-borderColor bg-background">
      <div className="container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex md:gap-4">
            <Button variant="hidden" href="/" className="text-xl">Fleet</Button>
            <nav className="gap-4 md:flex">
              {isHomePage && (
                <Link to="technologies" smooth={true} duration={500}>
                  <Button variant="hidden" className="text-muted-foreground">
                    Технологии
                  </Button>
                </Link>
              )}
              { Object.keys(user).length > 0 && (
                <Button variant="hidden" href="/transport" className="text-muted-foreground">
                  Список транспорта
                </Button>
              )}
            </nav>
          </div>
          <nav>
            { Object.keys(user).length !== 0 ? (
              <Button onClick={() => handleLogout()}>Выйти из аккаунта</Button>
            ) : (
              <Button href="/auth">Авторизация</Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header