<template>
  <div class="w-full">
    <PageHeading
      title="Nuevo Repuesto"
      description="Crea un nuevo repuesto en el sistema"
      backLink="/admin/parts"
      backLabel="Volver a repuestos"
    />

    <UForm :schema :state @submit="onSubmit" class="mt-4">
      <div class="grid gap-4 grid-cols-1 md:grid-cols-3">
        <UFormField label="Nombre" name="name">
          <UInput
            class="w-full"
            v-model="state.name"
            leading-icon="i-lucide-tag"
          />
        </UFormField>

        <UFormField label="Código" name="code">
          <UInput
            class="w-full"
            v-model="state.code"
            leading-icon="i-lucide-barcode"
          />
        </UFormField>

        <UFormField label="Descripción" name="description">
          <UInput
            class="w-full"
            v-model="state.description"
            leading-icon="i-lucide-file-text"
          />
        </UFormField>

        <UFormField label="Marca" name="brand">
          <UInput
            class="w-full"
            v-model="state.brand"
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
  import { object, string, type InferType } from "yup";
  import PageHeading from "~/components/partials/PageHeading.vue";
  import { createPart } from "~/lib/api/parts";

  const schema = object({
    code: string().required(),
    name: string().required(),
    description: string().required(),
    brand: string().required(),
  });

  type Schema = InferType<typeof schema>;

  const state = reactive({
    code: "",
    name: "",
    description: "",
    brand: "",
  });

  const toast = useToast();
  const { asyncStatus, mutateAsync, mutate } = useMutation({
    mutation: (data: Schema) => createPart(data),
    onSuccess: () => {
      toast.add({
        title: "Repuesto creado",
        description: "El repuesto ha sido creado exitosamente",
      });
      navigateTo("/admin/parts");
    },
    onError: (err) => {
      toast.add({
        title: "Error al crear repuesto",
        description: "Ha ocurrido un error al crear el repuesto",
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
