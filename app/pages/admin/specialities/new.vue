<template>
  <div class="w-full">
    <PageHeading
      title="Nueva Especialidad"
      description="Crea una nueva especialidad en el sistema"
      backLink="/admin/specialities"
      backLabel="Volver a especialidades"
    />

    <UForm :schema :state @submit="onSubmit" class="mt-4" :disable="asyncStatus === 'loading'">
      <div class="grid gap-4 grid-cols-1 md:grid-cols-3">
        <UFormField label="Nombre" name="name">
          <UInput
            class="w-full"
            v-model="state.name"
            leading-icon="i-lucide-tag"
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
  import { createSpeciality } from "~/lib/api/specilaties";

  const schema = object({
    name: string().required(),
  });

  type Schema = InferType<typeof schema>;

  const state = reactive({
    name: undefined,
  });

  const toast = useToast();
  const { asyncStatus, mutateAsync, mutate } = useMutation({
    mutation: (data: Schema) => createSpeciality(data),
    onSuccess: () => {
      toast.add({
        title: "Especialidad creada",
        description: "La especialidad ha sido creada exitosamente",
      });
      navigateTo("/admin/specialities");
    },
    onError: (err) => {
      toast.add({
        title: "Error al crear especialidad",
        description: `Ha ocurrido un error al crear la especialidad. ${err.data?.message || ""}`,
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
