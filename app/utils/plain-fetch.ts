import { COOKIE_TOKEN_KEY } from "~/plugins/01.authCookie"

export const $api = $fetch.create({
  baseURL: `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`,
  onRequest({ options }) {
    const token = useCookie(COOKIE_TOKEN_KEY).value
    options.headers.set('session-token', `${token}`)
    options.headers.set('sessiont-token', `${token}`)
  },
  onRequestError(error) {
  },
  onResponseError(error) {
  }
})