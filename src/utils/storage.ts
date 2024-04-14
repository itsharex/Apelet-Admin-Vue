// TODO 后期对持久化内容进行加密
import { AES_Encrypt, AES_Decrypt } from './encrypt';
import Cookies from 'js-cookie';

// localStorage
export function setStorage<T>(key: string, value: T): void {
	return localStorage.setItem(key, AES_Encrypt(JSON.stringify(value)));
}

export function getStorage<T>(key: string): T | null {
	const value = localStorage.getItem(key) as string;
	if (!value) return null;
	return JSON.parse(AES_Decrypt(value)) as T;
}

export function removeStorage(key: string) {
	return localStorage.removeItem(key);
}

// Cookie
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
