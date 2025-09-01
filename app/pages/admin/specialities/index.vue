<template>
  <div class="">
    <PageHeading
      title="Especialidades"
      description="Gestionar especialidades del sistema"
    />
    <div class="flex gap-x-4 py-2">
      <UButton to="/admin/specialities/new" size="sm" icon="i-lucide-plus"
        >Crear</UButton
      >
    </div>
    <div class="max-w-full ring rounded ring-accented">
      <UTable
        :data="specialities?.body"
        :loading="status === 'pending'"
        :columns="cols"
        class="w-full"
      ></UTable>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { ColumnDef } from "@tanstack/vue-table";
  import PageHeading from "~/components/partials/PageHeading.vue";

  const {
    data: specialities,
    status,
    error,
  } = await useAsyncData(() => $api("/specialties"));

  const cols: ColumnDef<{ id: number; name: string }>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nombre",
    },
  ];

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
