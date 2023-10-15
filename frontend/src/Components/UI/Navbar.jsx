import { createClient } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../context/index.js';
import { useContext } from "react";
import { useIsScreenWidthLessThan } from "../../hooks/useIsScreenWidthLessThan.js";
import MainHeader from "./Header/MainHeader.jsx";
import MobileHeader from "./Header/MobileHeader.jsx";

const supabase = createClient(
  "https://lphkjfehwkufelsdxcjc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaGtqZmVod2t1ZmVsc2R4Y2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA0NDkxMTIsImV4cCI6MjAwNjAyNTExMn0.16oJ7M-_hJU2k92qEswCS0iNTrjU5iHypwq7DrhrOHw"
);

const smallScreenWidth = 620;

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = useIsScreenWidthLessThan(smallScreenWidth);

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
        {isSmallScreen
          ? <MobileHeader user={user} handleLogout={handleLogout} />
          : <MainHeader user={user} handleLogout={handleLogout} />
        }
      </div>
    </header>
  )
}

export default Navbar;