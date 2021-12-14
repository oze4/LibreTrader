export default class Cookies {
  static get(name) {
    if (document.cookie.length === 0) {
      return null;
    }
    const start = document.cookie.indexOf(`${name}=`);
    if (start == -1) {
      return null;
    }
    const end = document.cookie.indexOf(";", start);
    const prefix = start + name.length + 1;
    const suffix = end == -1 ? document.cookie.length : "";
    const cookieDough = document.cookie.substring(prefix, suffix);
    return decodeURIComponent(cookieDough);
  }

  static set(name, value, hours = 0) {
    if (!name || !value) {
      console.error("name or value param missing, name or value will be empty in cookie : got :", {
        name,
        param,
      });
    }
    if (hours <= 0) {
      document.cookie = name + `=${encodeURIComponent(value)}; path=/`;
      return;
    }
    const expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + hours * 3600 * 1000);
    document.cookie = `${name}=${encodeURIComponent(
      value,
    )}; expires=${expiresAt.toUTCString()}; path=/`;
  }

  static remove(name = undefined) {
    if (name) {
      document.cookie = name + `=''; expires=${new Date(1).toUTCString()}`;
    }
  }

  static getAll() {
    if (document.cookie.length === 0) {
      return null;
    }
    return document.cookie.split(";").reduce((cookies, pairs) => {
      const pair = pairs.split("=");
      cookies[(pair[0] + "").trim()] = decodeURIComponent(pair[1]);
      return cookies;
    }, {});
  }

  static check(name = undefined) {
    const n = this.get(name);
    return n && n !== "";
  }
}
