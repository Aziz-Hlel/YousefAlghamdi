import { useEffect, useState } from "react";
import MobileMenu from "../Navbar2/MobileMenu";
import Navbar from "../Navbar2";
import Topbar from "../Topbar2";

function Header({ v2 }: { v2: boolean }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [openSidebar, setOpenSidebar] = useState(false);
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <>  
      <MobileMenu handleSidebar={toggleSidebar} show={openSidebar} />
      <header
        id="active-sticky"
        className={`homec-header ${scrollPosition > 20 && "is-sticky"}`}
      >
        <Topbar v2={v2} />
        <Navbar handleSidebar={toggleSidebar} secondNav={v2} />
      </header>
    </>
  );
}



export default Header;
