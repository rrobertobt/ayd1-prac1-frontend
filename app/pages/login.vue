<template>
  <div
    class="min-h-screen grid place-items-center bg-cover bg-center"
    :style="{
      backgroundImage: `
        linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        url(${loginBanner})
      `,
    }"
  >
    <UCard class="bg-accented/80 backdrop-blur-md p-4">
      <template #header>
        <div class="text-center flex flex-col gap-3">
          <Icon name="lucide:car" class="mx-auto py-4" size="28" />
          <h1 class="text-xl">Iniciar sesión</h1>
          <p v-if="!hasSentCode">Ingresa tus credenciales para continuar</p>
          <div v-else>
            <p>Hemos enviado un código de verificación a tu correo</p>
            <p>
              Revisa tu bandeja de entrada e ingresa el código para continuar
            </p>
          </div>
        </div>
      </template>

      <template v-if="hasSentCode">
        <div class="text-center">
          <UPinInput
            :length="5"
            placeholder="○"
            size="xl"
            class="font-mono"
            @complete="onPinInputComplete"
            :disabled="loading2fa"
          />
        </div>
      </template>
      <template v-else>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Email" name="email">
            <UInput v-model="state.email" class="w-full" />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput v-model="state.password" type="password" class="w-full" />
          </UFormField>

          <!-- <UButton type="submit"> Submit </UButton> -->
          <UButton
            class="w-full"
            icon="lucide:arrow-right"
            type="submit"
            label="Continuar"
            :loading="loadingLogin"
          ></UButton>
        </UForm>
      </template>
    </UCard>
  </div>
</template>
<script setup lang="ts">
  import loginBanner from "~/assets/img/login-banner.jpg";
  import { object, string } from "yup";
  import type { InferType } from "yup";
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { useSessionStore } from "~/stores/session";
  import { storeToRefs } from "pinia";

  const sessionStore = useSessionStore();
  const { loadingLogin, loading2fa } = storeToRefs(sessionStore);
  const { login, verifyLoginCode } = sessionStore;

  const schema = object({
    email: string().email().required("Campo requerido"),
    password: string().min(8).required("Campo requerido"),
  });

  type Schema = InferType<typeof schema>;

  const state = reactive({
    email: "josebautista202131284@cunoc.edu.gt",
    password: "adminpass",
  });
  const hasSentCode = ref(false);

  const toast = useToast();

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const loginResult = await login(event.data);
    if (!loginResult.error) {
      hasSentCode.value = true;
      return;
    }
    toast.add({
      title: "Error",
      description: loginResult.message,
      color: "error",
    });
  }

  async function onPinInputComplete(pin: string[]) {
    const pinCode = pin.join("");
    const verifyResult = await verifyLoginCode(pinCode);
    if (!verifyResult.error) {
      // Handle successful verification
      toast.add({
        title: "Éxito",
        description: "Has iniciado sesión correctamente",
        color: "success",
      });
      return;
    }
    toast.add({
      title: "Error",
      description: verifyResult.message,
      color: "error",
    });
  }

  definePageMeta({
    layout: "empty",
  });
</script>
<style scoped>
  @reference '~/assets/css/main.css';
</style>
