import Cookies from 'js-cookie'
// App

const languageKey = 'language'
export const getLanguage = () => window.localStorage.getItem(languageKey)
export const setLanguage = (language: string) => window.localStorage.setItem(languageKey, language)

// User
const tokenKey = 'token'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)
