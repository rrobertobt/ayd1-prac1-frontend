import { setLocale } from 'yup'
import { es } from 'yup-locales';

export default defineNuxtPlugin(() => {
  setLocale(es)
})