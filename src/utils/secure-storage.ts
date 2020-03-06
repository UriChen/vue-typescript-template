import sha256 from 'crypto-js/sha256'
import aes from 'crypto-js/aes'
import enc from 'crypto-js/enc-utf8'
// @ts-ignore
import SecureStorage from 'secure-web-storage'

const SECRET_KEY = 'secretKey'

const secureStorage = (storage: Storage) => new SecureStorage(storage, {
  hash: function hash(key: any) {
    key = sha256(key, SECRET_KEY)
    return key.toString()
  },
  encrypt: function encrypt(data: any) {
    data = aes.encrypt(data, SECRET_KEY)
    return data.toString()
  },
  decrypt: function decrypt(data: any) {
    data = aes.decrypt(data, SECRET_KEY)
    return data.toString(enc)
  }
})

export const secureLocalStorage = secureStorage(window.localStorage)
export const secureSessionStorage = secureStorage(window.sessionStorage)
