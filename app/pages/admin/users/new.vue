<template>
  <div class="w-full">
    <PageHeading
      title="Nuevo Usuario"
      description="Crea un nuevo usuario en el sistema"
      backLink="/admin/users"
      backLabel="Volver a usuarios"
    />

    <UForm :schema :state @submit="onSubmit" class="mt-4">
      <div class="grid gap-4 grid-cols-1 md:grid-cols-3">
        <UFormField label="Correo electrónico" name="email">
          <UInput
            class="w-full"
            v-model="state.email"
            leading-icon="i-lucide-mail"
          />
        </UFormField>

        <UFormField label="Contraseña" name="password">
          <UInput
            class="w-full"
            v-model="state.password"
            type="password"
            leading-icon="i-lucide-lock"
          />
        </UFormField>
        <UFormField label="NIT" name="nit">
          <UInput
            class="w-full"
            v-model="state.nit"
            leading-icon="i-lucide-credit-card"
          />
        </UFormField>

        <UFormField label="Nombre" name="name">
          <UInput
            class="w-full"
            v-model="state.name"
            leading-icon="i-lucide-user"
          />
        </UFormField>

        <UFormField label="Dirección" name="address">
          <UInput
            class="w-full"
            v-model="state.address"
            leading-icon="i-lucide-map"
          />
        </UFormField>

        <UFormField label="Teléfono" name="phoneNumber">
          <UInput
            class="w-full"
            v-model="state.phoneNumber"
            leading-icon="i-lucide-phone"
          />
        </UFormField>

        <UFormField label="Rol" name="role">
          <USelect
            class="w-full"
            v-model="state.role"
            leading-icon="i-lucide-shield-check"
            :items="[
              { label: 'Administrador', value: 'ADMIN' },
              { label: 'Empleado', value: 'EMPLEADO' },
              { label: 'Especialista', value: 'ESPECIALISTA' },
              { label: 'Cliente', value: 'CLIENTE' },
              { label: 'Proveedor', value: 'PROVEEDOR' },
            ]"
          />
        </UFormField>

      </div>

      <UButton class="mt-4" icon="i-lucide-check" type="submit"> Guardar </UButton>
    </UForm>
  </div>
</template>
<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { number, object, string, type InferType } from "yup";
  import PageHeading from "~/components/partials/PageHeading.vue";
import { createUser } from "~/lib/api/users";

  const schema = object({
    email: string().email().required(),
    password: string().min(8).required(),
    nit: number().required(),
    name: string().required(),
    address: string().required(),
    phoneNumber: string().required(),
    twofaMethod: string().required(),
    role: string().oneOf(['ADMIN', 'EMPLEADO', 'ESPECIALISTA', 'CLIENTE', 'PROVEEDOR']).required()
  });

  type Schema = InferType<typeof schema>;

  const state = reactive({
    role: undefined,
    email: undefined,
    nit: undefined,
    name: undefined,
    address: undefined,
    phoneNumber: undefined,
    password: undefined,
    twofaMethod: 'EMAIL',
  });

  const toast = useToast()
  const { asyncStatus, mutateAsync, mutate } = useMutation({
    mutation: (data: Schema) => createUser(data),
    onSuccess: () => {
      toast.add({
        title: "Usuario creado",
        description: "El usuario ha sido creado exitosamente",
      });
      navigateTo('/admin/users')
    },
    onError: (err) => {
      toast.add({
        title: "Error al crear usuario",
        description: "Ha ocurrido un error al crear el usuario",
      });
    },
  })

  function onSubmit(event: FormSubmitEvent<Schema>) {
    mutate(event.data);
  }

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
