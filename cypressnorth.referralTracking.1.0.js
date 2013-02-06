/************************ -------------------------- *******************************/
//YOUR VARIABLES - SET THESE!

//this is the name of the cookie on the users machine
var cookieName = "MyCookieName",
//the name of the url paramater you are expecting that holds the code you wish to capture
//for example, http://www.test.com?couponCode=BIGDISCOUNT your URL Parameter would be couponCode and the
//cookie value that will be stored is BIGDISCOUNT
URLParameterName = "MyParameterName",
//how many days you want the cookie to be valid for on the users machine
cookiePersistDays = 14,
cookiePath = '',    // use '' for default
cookieDomain = "."+window.location.hostname, // leading . will allow subdomains to also access cookie
cookieSecure = true;

/************************ -------------------------- *******************************/
//RUN ON LOAD
CaptureCode();

/************************ -------------------------- *******************************/
//Extract the code from the URL based on the defined parameter name
function CaptureCode() {
    var q = getParameterByName(URLParameterName);
    if (q != null && q != "") {
        eraseCookie(cookieName);
        createCookie(cookieName, q, cookiePersistDays);
    }
}
//Save a code from an action, not a URL, using the defined variables
function SaveCode(code) {
    if (code != null && code != "") {
        eraseCookie(cookieName);
        createCookie(cookieName, code, cookiePersistDays);
    }
}
//Save a code overriding the default variables
function SaveCodeManually(_cookieName, _code, _persistDays) {
    if (_cookieName != null && _cookieName != "" && code != null && code != "") {
        eraseCookie(_cookieName);
        createCookie(_cookieName, _code, _persistDays);
    }
}
//This will return the stored cookie value
function GetCode() {
    return readCookie(cookieName);
}
//This will return the stored cookie value from the specified cookie name
function GetCodeByName(_cookieName) {
    return readCookie(_cookieName);
}
/************************ -------------------------- *******************************/
//Cookie Functions
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    var cookie_string = name + "=" + value + expires
    //document.cookie =  + "; path=/";
    cookie_string += "; path=" + ((cookiePath) ? escape ( cookiePath ) : '/');
    cookie_string += "; domain=" + ((cookieDomain) ? escape ( cookieDomain ) : window.location.hostname);
    if ( cookieSecure )
        cookie_string += "; secure";
    console.log(cookie_string);
    document.cookie = cookie_string;
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name, "", -1);
}
/************************ -------------------------- *******************************/
// HTML Encode Functions
function encode(me) {
    return me.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
function decode(me) {
    return me.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
};
/************************ -------------------------- *******************************/
//helper function to trim whitespace
function trim(str) {
    if (str == null) return "";
    var newstr;
    newstr = str.replace(/^\s*/, "").replace(/\s*$/, "");
    newstr = newstr.replace(/\s{2,}/, " ");
    return newstr;
}
//Retrieve a query string parameter
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
