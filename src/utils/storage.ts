// TODO 后期对持久化内容进行加密
import { AES_Encrypt, AES_Decrypt } from './crypto';
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
