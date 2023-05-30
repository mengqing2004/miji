import md5 from "md5";
const keyName= md5("userToken").slice(0, 5)
export function setToken (value){
    window.sessionStorage.setItem(keyName,value)
}
export function getToken () {
    return window.sessionStorage.getItem(keyName)||"";
}
export function removeToken (){
    return window.sessionStorage.removeItem(keyName)
}