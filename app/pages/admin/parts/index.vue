<template>
  <div class="">
    <PageHeading
      title="Repuestos"
      description="Gestionar repuestos del sistema"
    />
    <div class="flex gap-x-4 py-2">
      <UButton to="/admin/parts/new" size="sm" icon="i-lucide-plus"
        >Crear</UButton
      >
    </div>
    <div class="max-w-full ring rounded ring-accented" v-if="parts">
      <UTable
        :data="parts"
        :columns
        :loading="status === 'pending'"
        class="w-full"
      ></UTable>
    </div>
  </div>
</template>
<script setup lang="ts">
  import PageHeading from "~/components/partials/PageHeading.vue";
import type { Part } from "~/lib/api/parts";
import type { ColumnDef } from "@tanstack/vue-table";

  const { data: parts, status } = useAsyncData<Part[]>(() => $api("/part"));

  const columns: ColumnDef<Part>[] = [
    {
      accessorKey: "code",
      header: "Código",
    },
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "description",
      header: "Descripción",
    },
    {
      accessorKey: "brand",
      header: "Marca",
    },
  ];

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
