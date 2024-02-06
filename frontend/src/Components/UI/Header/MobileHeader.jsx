import { Button } from "../Button.jsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useAuth } from "../../../hooks/Auth.jsx"

function Popover({ user, setActive }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const closeMenu = () => {
    setActive(false);
  }

  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max 
      overflow-auto p-6 pb-32 shadow-md sm:hidden"
    >
      <motion.div 
        className="relative z-20 grid gap-6 rounded-[10px] bg-background p-4"
        initial={{ y: 1000, visibility: false }}
        animate={{ y: 0, visibility: true }}
        transition={{ ease: "easeIn", duration: 0.3 }}
      >
        <Button 
          href="/" 
          variant="hidden"
          className="flex items-center text-xl text-muted-foreground font-manrope justify-normal
            font-bold"
        >
          Fleet
        </Button>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {isHomePage && (
            <Link to="technologies" smooth={true} duration={500}>
              <Button 
                variant="link" 
                className="text-muted-foreground justify-normal"
                onClick={closeMenu}
              >
                Технологии
              </Button>
            </Link>
          )}
          {user && (
            <Button 
              variant="link"
              href="/transport" 
              className="text-muted-foreground justify-normal"
              onClick={closeMenu}
            >
              Список транспорта
            </Button>
          )}
        </nav>
      </motion.div>
    </div>
  )
}

function MobileHeader() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <div className="flex h-20 items-center justify-between py-6">
      <div className="flex gap-6 md:gap-10">
        <Button variant="hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} size="xl" />
          <span className="text-xl font-bold ml-2">Меню</span>
        </Button>
        {isMenuOpen && <Popover user={user} setActive={setIsMenuOpen} />}
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

export default MobileHeader