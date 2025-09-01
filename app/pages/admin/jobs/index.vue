<template>
  <div class="">
    <PageHeading
      title="Trabajos"
      description="Gestionar trabajos del sistema"
    />
    <div class="flex gap-x-4 py-2">
      <UButton to="/admin/jobs/new" size="sm" icon="i-lucide-plus"
        >Crear</UButton
      >
    </div>
    <UFormField label="Estado del trabajo" name="status" class="w-64 pt-2 pb-4">
      <USelect
        v-model="selectedStatus"
        :items="jobStatuses"
        leading-icon="i-lucide-filter"
        class="w-full"
      />
    </UFormField>
    <div class="max-w-full ring rounded ring-accented" v-if="jobs">
      <UTable
        empty="No hay trabajos para mostrar"
        :data="jobs?.body"
        :loading="status === 'pending'"
        :columns
        class="w-full"
      ></UTable>
    </div>
  </div>
</template>
<script setup lang="tsx">
  import PageHeading from "~/components/partials/PageHeading.vue";
  import type { Part } from "~/lib/api/parts";
  import type { ColumnDef } from "@tanstack/vue-table";
import { UButton } from "#components";

  const columns: ColumnDef<{
    id: number;
    vehicle_plate: string;
    description: string;
    estimated_time: string;
    status: string;
  }>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "vehicle_plate",
      header: "Placa del vehículo",
    },
    {
      accessorKey: "description",
      header: "Descripción",
    },
    {
      accessorKey: "estimated_time",
      header: "Tiempo estimado",
    },
    {
      accessorKey: "status",
      header: "Estado",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div class="flex gap-x-2">
          <UButton to={`/admin/jobs/${row.original.id}`} size="sm" icon="i-lucide-eye" variant="subtle">
          </UButton>
        </div>
      ),
    }
  ];

  const jobStatuses = [
    { value: "PENDIENTE", label: "Pendiente" },
    { value: "BORRADO", label: "Borrado" },
    { value: "AUTORIZADO", label: "Autorizado" },
    { value: "EN_ESPERA", label: "En espera" },
    { value: "EN_CURSO", label: "En curso" },
    { value: "NECESITA_ESPECIALISTA", label: "Necesita especialista" },
    { value: "CANCELADO", label: "Cancelado" },
    { value: "COMPLETADO", label: "Completado" },
    { value: "CERRADO", label: "Cerrado" },
  ];

  const selectedStatus = ref(jobStatuses[0]?.value);

  const { data: jobs, status } = useAsyncData<{
    body: {
      id: number;
      vehicle_plate: string;
      description: string;
      estimated_time: string;
      status: string;
    }[];
  }>(
    () => $api("/admin/job/status", { params: { id: selectedStatus.value } }),
    {
      watch: [selectedStatus],
    },
  );

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
