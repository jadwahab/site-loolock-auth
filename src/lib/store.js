import { writable } from 'svelte/store';

export function setCookie(cname,cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
}

export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function getValueFromCookieMap(key) {
    const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)myMap\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (cookieValue) {
        const jsonParsed = JSON.parse(decodeURIComponent(cookieValue));
        const mapFromObject = new Map(Object.entries(jsonParsed));
        return mapFromObject.get(key);
    }

    return undefined;
}

export async function addToCookieMap(key, value) {
    const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)myMap\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const jsonParsed = cookieValue ? JSON.parse(decodeURIComponent(cookieValue)) : {};
    const mapFromObject = new Map(Object.entries(jsonParsed));

    // Add or update the key-value pair
    mapFromObject.set(key, value);

    // Convert the Map back to an object and store it in the cookie
    const jsonString = JSON.stringify(Object.fromEntries(mapFromObject));
    document.cookie = `myMap=${encodeURIComponent(jsonString)}; expires=${new Date(Date.now() + 86400e3).toUTCString()}; path=/`;
}

export function removeFromCookieMap(key) {
    const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)myMap\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const jsonParsed = cookieValue ? JSON.parse(decodeURIComponent(cookieValue)) : {};
    const mapFromObject = new Map(Object.entries(jsonParsed));

    // Remove the key-value pair
    mapFromObject.delete(key);

    // Convert the Map back to an object and store it in the cookie
    const jsonString = JSON.stringify(Object.fromEntries(mapFromObject));
    document.cookie = `myMap=${encodeURIComponent(jsonString)}; expires=${new Date(Date.now() + 86400e3).toUTCString()}; path=/`;
}

export function checkCookie(cname) {
    let user = getCookie(cname);
    if (user != "") {
        return true;
    }
    return false;
}


export const userInfo = writable({
    name: "",
    avatar: ""
});
