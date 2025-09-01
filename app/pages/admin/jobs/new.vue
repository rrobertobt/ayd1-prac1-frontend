<template>
  <div class="w-full">
    <PageHeading
      title="Nuevo Trabajo"
      description="Crea un nuevo trabajo en el sistema"
      backLink="/admin/jobs"
      backLabel="Volver a trabajos"
    />

    <UForm :schema :state @submit="onSubmit" class="mt-4">
      <div class="grid gap-4 grid-cols-1 md:grid-cols-3">
        <UFormField label="Placa (Vehículo asignado)" name="plate">
          <UInput
            class="w-full"
            v-model="state.plate"
            leading-icon="i-lucide-car"
          />
        </UFormField>

        <UFormField label="Descripción" name="description">
          <UInput
            class="w-full"
            v-model="state.description"
            leading-icon="i-lucide-file-text"
          />
        </UFormField>

        <UFormField label="Tiempo estimado" name="estimatedTime">
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
  import { createJob } from "~/lib/api/jobs";

  const schema = object({
    plate: string().required(),
    description: string().required(),
    estimatedTime: number().required(),
  });

  type Schema = InferType<typeof schema>;

  const state = reactive({
    plate: "",
    description: "",
    estimatedTime: 0,
  });

  const toast = useToast();
  const { asyncStatus, mutateAsync, mutate } = useMutation({
    mutation: (data: Schema) => createJob(data),
    onSuccess: () => {
      toast.add({
        title: "Trabajo creado",
        description: "El trabajo ha sido creado exitosamente",
      });
      navigateTo("/admin/jobs");
    },
    onError: (err) => {
      toast.add({
        title: "Error al crear trabajo",
        description: "Ha ocurrido un error al crear el trabajo",
      });
    },
  });

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    await mutateAsync(event.data);
  }

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
