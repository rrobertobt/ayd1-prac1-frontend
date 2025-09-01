<template>
  <div class="w-full">
    <PageHeading
      title="Nuevo Tipo de Servicio"
      description="Crea un nuevo tipo de servicio en el sistema"
      backLink="/admin/service-types"
      backLabel="Volver a tipos de servicio"
    />

    <UForm :schema :state @submit="onSubmit" class="mt-4">
      <div class="grid gap-4 grid-cols-1 md:grid-cols-3">
        <UFormField label="Especialidad" name="specialitiesId">
          <USelect
            class="w-full"
            v-model="state.specialitiesId"
            leading-icon="i-lucide-briefcase"
            :items="data?.body.map((item) => ({ label: item.name, value: item.id }))"
          />
        </UFormField>

        <UFormField label="Nombre" name="name">
          <UInput
            class="w-full"
            v-model="state.name"
            leading-icon="i-lucide-tag"
          />
        </UFormField>

        <UFormField label="Descripción" name="description">
          <UInput
            class="w-full"
            v-model="state.description"
            leading-icon="i-lucide-file-text"
          />
        </UFormField>

        <UFormField label="Precio" name="price">
          <UInput
            class="w-full"
            v-model="state.price"
            leading-icon="i-lucide-dollar-sign"
            type="number"
          />
        </UFormField>

        <UFormField label="Tiempo estimado (horas)" name="estimatedTime">
          <UInput
            class="w-full"
            v-model="state.estimatedTime"
            leading-icon="i-lucide-clock"
            type="number"
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
  import { createServiceType } from "~/lib/api/service-types";

  const { data, status, error } = await useAsyncData(() =>
    $api("/specialties"),
  );

  const schema = object({
    specialitiesId: number().required(),
    name: string().required(),
    description: string().required(),
    price: number().required().min(0),
    estimatedTime: number().required().min(0),
  });

  type Schema = InferType<typeof schema>;

  const state = reactive({
    specialitiesId: undefined,
    name: undefined,
    description: undefined,
    price: undefined,
    estimatedTime: undefined,
  });

  const toast = useToast();
  const { asyncStatus, mutateAsync, mutate } = useMutation({
    mutation: (data: Schema) => createServiceType(data),
    onSuccess: () => {
      toast.add({
        title: "Tipo de servicio creado",
        description: "El tipo de servicio ha sido creado exitosamente",
      });
      navigateTo("/admin/service-types");
    },
    onError: (err) => {
      toast.add({
        title: "Error al crear tipo de servicio",
        description: "Ha ocurrido un error al crear el tipo de servicio",
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
