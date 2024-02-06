import { useIsScreenWidthLessThan } from "../../hooks/useIsScreenWidthLessThan.js";
import MainHeader from "./Header/MainHeader.jsx";
import MobileHeader from "./Header/MobileHeader.jsx";

const smallScreenWidth = 620;

function Navbar() {
  const isSmallScreen = useIsScreenWidthLessThan(smallScreenWidth);

  return (
    <header className="w-full border-b border-borderColor bg-background">
      <div className="container z-40">
        {isSmallScreen
          ? <MobileHeader />
          : <MainHeader />
        }
      </div>
    </header>
  )
}

export default Navbar;