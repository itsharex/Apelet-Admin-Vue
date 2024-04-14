/**
 * crypto-js 则更偏向于消息摘要算法、对称加密和简单的哈希函数，支持 AES、DES、SHA-1、HMAC 等诸多算法，适用于对客户端本地存储的数据进行加密、散列或签名处理等场景
 */
import CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';

// 公钥，可以使用支付宝的加密工具
const PUBLIC_KEY = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCLwhOR32UlNXdY2wJ1DRx53s/nzSbwKRNRkwSqjTx3UxQ9y8bdKZpkCLi94ifi7pH4d4o4f+AnzdpTUA0KSlqzVVvwEYXKUGBo/HPdJ2clQ11Ekq/nrFDr8OCoTsuI3S8d8CUAIkLg0gNQ49aYzRESqN9UCBTJFWgOTHNXeWvHkwIDAQAB`;

//私钥用于解密，后端需要保持一致
const PRIVATE_KEY = `MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIvCE5HfZSU1d1jbAnUNHHnez+fNJvApE1GTBKqNPHdTFD3Lxt0pmmQIuL3iJ+Lukfh3ijh/4CfN2lNQDQpKWrNVW/ARhcpQYGj8c90nZyVDXUSSr+esUOvw4KhOy4jdLx3wJQAiQuDSA1Dj1pjNERKo31QIFMkVaA5Mc1d5a8eTAgMBAAECgYBmvw7OHnNo0I7mZ1S+Ix59Rl6I5x0qULhgL3qtvFnoy85ExCx2aeCUjIjtKHf0cToldhTLBtAP01ogB+keWJ2mwNAEJhbAZXHEb5pi7kaDnzHR1DWDDwbTJxiRqUSwCVvsneblLoGjQFlWGVJAcF7juNasCEZ/q8EwjkH4mF/+KQJBAOWNrv4Rf7MEAkfj0taCOjdQbfFH/7impciNwbYjAQMdZnewKWVF7sbMhVE10ss3WCOtqnq/h2RbeSoswvJ3Zl0CQQCb3AVq8DCOpyIj+8O7CnkcOg9L8erkfFQ6QJu+UotAiU766pjUs8hcbhPjeSoCxJjcq4dfNfYpZsIZE1mjVyavAkB4f5FWaRUhgX85AYyRcbbhhmTP/T1tTn1D87W1yFYlrm81cNGqCbW3wXBSGvDWH+0yfV06JgQKWEIYM3r6EFc5AkA7qMayHmqX0EXzPCW57NJbCaZdTaa5+xVKjvyOp44CEA0ZYr9Je9/P8ZrPUcvQ72wL2+Sff0pQorLdYljHe06lAkEAhGCBAGDdlmqmMFzmCwGAULVo5B9364GWf9F2JrAQFpLJGmBS6crbyMBh6pNP+x3fBB3eu6t7EWwcOVW/vFG1BA==`;

/**
 * RSA非对称加密
 * @param data 需要加密的数据
 */
export function rsaEncrypt(data: string) {
	// 使用公钥加密
	const encrypt = new JSEncrypt();
	encrypt.setPublicKey(PUBLIC_KEY);
	return encrypt.encrypt(data) as string;
}

/**
 * RSA 解密
 * @param data 需要解密的数据
 */
export function rsaDecrypt(data: string) {
	const decrypt = new JSEncrypt();
	decrypt.setPrivateKey(PRIVATE_KEY);
	return decrypt.decrypt(data) as string;
}

/**
 * AES 加密
 * mode: CBC  需要前后端保持一致
 * padding: Pkcs7  前端 Pkcs7 对应 后端 Pkcs5
 */
// 由于对称加密使用AES-128-CBC算法，采用的PKCS7填充的，因此密钥key的长度为16位
// 加密 和 解密 过程中 key 和 iv，应该用 CryptoJS.enc.Utf8.parse(key) 解析一下
const SECRET_KEY = CryptoJS.enc.Utf8.parse('1234123412341234');
const SECRET_IV = CryptoJS.enc.Utf8.parse('1234123412341234');

/**
 * 加密方法
 * @param encryptStr
 * @returns {string}
 */
export const AES_Encrypt = (encryptStr: string): string => {
	const dataHex = CryptoJS.enc.Utf8.parse(encryptStr.toString());
	const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
		iv: SECRET_IV,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	return encrypted.ciphertext.toString();
};

/**
 * 解密方法
 * @param decryptStr
 * @returns {string}
 */
export const AES_Decrypt = (decryptStr: string): string => {
	// encrypted.ciphertext 形式的加密需要对decryptStr进行Hex解析
	const encryptedHexStr = CryptoJS.enc.Hex.parse(decryptStr);
	const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
		iv: SECRET_IV,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	return decrypt.toString(CryptoJS.enc.Utf8);
};
