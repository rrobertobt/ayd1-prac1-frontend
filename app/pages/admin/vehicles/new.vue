<template>
  <div class="w-full">
    <PageHeading
      title="Nuevo Vehículo"
      description="Crea un nuevo vehículo en el sistema"
      backLink="/admin/vehicles"
      backLabel="Volver a vehículos"
    />

    <UForm :schema :state @submit="onSubmit" class="mt-4">
      <div class="grid gap-4 grid-cols-1 md:grid-cols-3">
        <UFormField label="Placa" name="plate">
          <UInput
            class="w-full"
            v-model="state.plate"
            leading-icon="i-lucide-credit-card"
          />
        </UFormField>

        <UFormField label="VIN" name="vin">
          <UInput
            class="w-full"
            v-model="state.vin"
            leading-icon="i-lucide-credit-card"
          />
        </UFormField>

        <UFormField label="Modelo" name="model">
          <UInput
            class="w-full"
            v-model="state.model"
            leading-icon="i-lucide-shapes"
          />
        </UFormField>

        <UFormField label="Año" name="year">
          <UInput
            type="number"
            class="w-full"
            v-model="state.year"
            leading-icon="i-lucide-calendar"
          />
        </UFormField>

        <UFormField label="Marca" name="brand">
          <UInput
            class="w-full"
            v-model="state.brand"
            leading-icon="i-lucide-car"
          />
        </UFormField>

        <UFormField label="Color" name="color">
          <UInput
            class="w-full"
            v-model="state.color"
            leading-icon="i-lucide-paint-roller"
          />
        </UFormField>

        <UFormField label="NIT" name="nit">
          <UInput
            type="number"
            class="w-full"
            v-model="state.nit"
            leading-icon="i-lucide-credit-card"
          />
        </UFormField>
      </div>

      <UButton class="mt-4" icon="i-lucide-check" type="submit">
        Guardar
      </UButton>
    </UForm>
  </div>
</template>
<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { number, object, string, type InferType } from "yup";
  import PageHeading from "~/components/partials/PageHeading.vue";
  import { createUser } from "~/lib/api/users";
import { createVehicle } from "~/lib/api/vehicles";

  const schema = object({
    nit: number().required(),
    plate: string().required(),
    vin: string().required(),
    model: string().required(),
    year: number().required(),
    brand: string().required(),
    color: string().required(),
  });

  type Schema = InferType<typeof schema>;

  const state = reactive({
    nit: undefined,
    plate: "",
    vin: "",
    model: "",
    year: undefined,
    brand: "",
    color: "",
  });

  const toast = useToast();
  const { asyncStatus, mutateAsync, mutate } = useMutation({
    mutation: (data: Schema) => createVehicle(data),
    onSuccess: () => {
      toast.add({
        title: "Vehículo creado",
        description: "El vehículo ha sido creado exitosamente",
      });
      navigateTo("/admin/vehicles");
    },
    onError: (err) => {
      toast.add({
        title: "Error al crear vehículo",
        description: `Ha ocurrido un error al crear el vehículo. ${err.data?.message || ""}`,
      });
    },
  });

  function onSubmit(event: FormSubmitEvent<Schema>) {
    mutate(event.data);
  }

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
