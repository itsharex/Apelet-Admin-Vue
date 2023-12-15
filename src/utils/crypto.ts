/**
 * crypto-js 则更偏向于消息摘要算法、对称加密和简单的哈希函数，支持 AES、DES、SHA-1、HMAC 等诸多算法，适用于对客户端本地存储的数据进行加密、散列或签名处理等场景
 */
import CryptoJS from 'crypto-js';

/**
 * AES 加密
 * mode: ECB  需要前后端保持一致
 * padding: Pkcs7  前端 Pkcs7 对应 后端 Pkcs5
 */
// 密钥和偏移量长度需要是16的倍数
// 加密 和 解密 过程中 key，应该用 CryptoJS.enc.Utf8.parse(key) 解析一下
const SECRET_KEY = CryptoJS.enc.Utf8.parse('1234123412341234');
const SECRET_IV = CryptoJS.enc.Utf8.parse('1234123412341234');

/**
 * 加密方法
 * @param encryptStr
 * @returns {string}
 */
export const AES_Encrypt = (encryptStr: string): string => {
    const dataHex = CryptoJS.enc.Utf8.parse(encryptStr);
    const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
};

/**
 * 解密方法
 * @param decryptStr
 * @returns {string}
 */
export const AES_Decrypt = (decryptStr: string): string => {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(decryptStr);
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
};
