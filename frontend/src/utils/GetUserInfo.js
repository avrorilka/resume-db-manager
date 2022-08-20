import Cookies from "js-cookie"
import jwt_decode from "jwt-decode"

export default function GetUserInfo (prop){
    let token = null;
    if (Cookies.get('BEARER') !== '') {
        try {
            token = jwt_decode(Cookies.get('BEARER'));
        } catch (e) {
            return null;
        }
        if (prop == "role"){
            return token.roles;
        }
        if (prop == "email"){
            return token.email;
        }
        else return null;
    }
    return null;
};