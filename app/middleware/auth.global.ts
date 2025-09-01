import { storeToRefs } from "pinia";
import { useSessionStore } from "~/stores/session";

export default defineNuxtRouteMiddleware((to, _from) => {
  const { sessionObj, role } = storeToRefs(useSessionStore());

  // English route segments required by layouts
  const protectedRoles = ["admin", "employee", "specialist", "client", "provider"];

  // Map Spanish (from session) -> English (routes/layouts)
  const roleMap: Record<string, string> = {
    admin: "admin",
    empleado: "employee",
    especialista: "specialist",
    cliente: "client",
    proveedor: "provider",
  };

  const toEnglishRole = (r: string) => roleMap[r] || r;

  const pathIncludesRoles = protectedRoles.some((r) => to.fullPath.includes(r));
  if (!sessionObj.value && pathIncludesRoles) {
    return navigateTo("/login");
  }

  const englishRole = toEnglishRole(role.value);
  const isAuthorizedRole = englishRole ? to.fullPath.includes(englishRole) : false;

  if (sessionObj.value && !isAuthorizedRole && to.fullPath !== "/") {
    return navigateTo(`/${englishRole}/home`);
  }

  if (sessionObj.value && to.fullPath.includes("login")) {
    return navigateTo("/");
  }
});