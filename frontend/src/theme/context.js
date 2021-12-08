import { createContext } from "react";
import Cookies from '@/utils/cookies';

function getColorModeFromCookies() {
  if (!Cookies.get("colorMode")) {
    Cookies.set("colorMode", "light", 720);
  }
  return Cookies.get("colorMode");
}

export default createContext({ 
  toggle: () => {}, 
  mode: getColorModeFromCookies()
});
