import { defineStore } from "pinia";

type Role = "ADMIN" | "EMPLEADO" | "ESPECIALISTA" | "CLIENTE" | "PROVEEDOR";

export interface VerifyLoginCodeResponse {
  code: string;
  message: string;
  body: VerifyLoginCodeResponseBody;
}

export interface VerifySessionResponse {
  code: string;
  message: string;
  body: VerifySessionResponseBody;
}

export interface SessionBody {
  address: string;
  email: string;
  name: string;
  nit: number;
  phoneNumber: string;
  role: Role;
}

export interface VerifyLoginCodeResponseBody extends SessionBody {
  sessionToken: string;
}

export interface VerifySessionResponseBody extends SessionBody {
  expiredAt: Date;
}

export const useSessionStore = defineStore("session", () => {
  const sessionObj = ref<VerifySessionResponseBody>();
  const loadingLogin = ref(false);
  const loading2fa = ref(false);
  const loggingInEmail = ref("");

  async function login(credentials: { email: string; password: string }) {
    loadingLogin.value = true;
    let token = "";
    try {
      const loginResponse = await $api("/auth/login", {
        method: "POST",
        body: credentials,
      });
      loggingInEmail.value = credentials.email;
      return {
        error: false,
        data: loginResponse,
      };
    } catch (error) {
      return {
        error: true,
        message: error.data?.message || "Error desconocido",
        code: error.data?.code || "UNKNOWN_ERROR",
      };
    } finally {
      loadingLogin.value = false;
    }
  }

  async function verifyLoginCode(code: string) {
    loading2fa.value = true;
    try {
      const response = await $api<VerifyLoginCodeResponse>(
        "/auth/code/verify",
        {
          method: "POST",
          body: {
            userEmail: loggingInEmail.value,
            code,
          },
        },
      );

      const role = response.body.role;
      sessionObj.value = response.body;
      switch (role) {
        case "ADMIN":
          navigateTo("/admin/home");
          break;
        case "EMPLEADO":
          navigateTo("/employee/home");
          break;
        case "ESPECIALISTA":
          navigateTo("/specialist/home");
          break;
        case "CLIENTE":
          navigateTo("/client/home");
          break;
        case "PROVEEDOR":
          navigateTo("/provider/home");
          break;
      }

      const { setToken } = useNuxtApp().$authCookie;
      setToken(response.body.sessionToken);

      return {
        error: false,
        data: response,
      };
    } catch (error) {
      return {
        error: true,
        message: error.data?.message || "Error desconocido",
        code: error.data?.code || "UNKNOWN_ERROR",
      };
    } finally {
      loading2fa.value = false;
    }
  }

  async function recoverSession() {
    try {
      const { getToken } = useNuxtApp().$authCookie;
      if (!getToken()) return;

      const response = await $api<VerifySessionResponse>("/session");

      sessionObj.value = response.body;

      return {
        error: false,
        data: response,
      };
    } catch (error) {
      return {
        error: true,
        message: error.data?.message || "Error desconocido",
        code: error.data?.code || "UNKNOWN_ERROR",
      };
    }
  }

  function logOut() {
    navigateTo("/login");
    sessionObj.value = undefined;
    const { removeToken } = useNuxtApp().$authCookie;
    removeToken();
  }

  return {
    sessionObj,
    loadingLogin,
    loading2fa,
    loggingInEmail,
    verifyLoginCode,
    login,
    logOut,
    recoverSession,
  };
});
