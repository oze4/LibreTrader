import { createContext } from 'react';
import Cookies from '@/utils/cookies';

function getColorModeFromCookies() {
    // If a cookie does not exist, set the default "colorMode" cookie to "light".
    if (!Cookies.check('colorMode')) {
        Cookies.set('colorMode', 'light', 720);
    }
    // We want the cookie to be our single source of truth from the beginning.
    return Cookies.get('colorMode');
}

export default createContext({
    toggle: () => {},
    mode: getColorModeFromCookies(),
});
