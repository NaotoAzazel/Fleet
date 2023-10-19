import { useLocation } from "react-router-dom";
import { Button } from "../Button.jsx";
import { Link } from "react-scroll";
import { useAuth } from "../../../hooks/Auth.jsx";

function MainHeader() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
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
          {user && (
            <Button variant="hidden" href="/transport" className="text-muted-foreground">
              Список транспорта
            </Button>
          )}
        </nav>
      </div>
        <nav>
          {user ? (
            <Button onClick={signOut}>Выйти из аккаунта</Button>
          ) : (
            <Button href="/auth">Авторизация</Button>
          )}
        </nav>
      </div>
  )
}

export default MainHeader