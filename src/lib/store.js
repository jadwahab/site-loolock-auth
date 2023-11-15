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