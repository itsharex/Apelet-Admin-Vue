import Cookies from 'js-cookie';

export function setCookie(key: string, value: string, expires: number = 2) {
	return Cookies.set(key, value, { expires });
}

export function getCookie(key: string) {
	let result = Cookies.get(key) as string;
	return result;
}

export function removeCookie(key: string) {
	return Cookies.remove(key);
}
