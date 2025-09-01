<template>
  <div>
    <PageHeading
      title="Vehículos"
      description="Gestionar vehículos del sistema"
    />
    <div class="flex gap-x-4 py-2">
      <UButton to="/admin/vehicles/new" size="sm" icon="i-lucide-plus"
        >Crear</UButton
      >
    </div>
    <div class="max-w-full ring rounded ring-accented">
      <div class="flex px-4 py-3.5 border-b border-accented">
        <UInput
          :model-value="table?.tableApi?.getColumn('owner')?.getFilterValue() as string"
          leading-icon="i-lucide-user-search"
          class="max-w-sm"
          placeholder="Filtrar por propietario..."
          @update:model-value="($event: string) =>
            {
              table?.tableApi?.getColumn('owner')?.setFilterValue($event)
            }
          "
        />
      </div>
      <UTable
        ref="table"
        :data="vehicles?.body"
        :columns="columns"
        :loading="status === 'pending'"
        v-model:column-filters="columnFilters"
        class="w-full"
      ></UTable>
    </div>
  </div>
</template>
<script setup lang="tsx">
  import { UButton } from "#components";
import type { ColumnDef } from "@tanstack/vue-table";
  import PageHeading from "~/components/partials/PageHeading.vue";
  const table = useTemplateRef("table");
  const columnFilters = ref([
    {
      id: "owner",
      value: "",
    },
  ]);

  const columns: ColumnDef<{
    owner: string;
    plate: string;
    vin: string;
    model: string;
    year: number;
    brand: string;
    color: string;
  }>[] = [
    {
      accessorKey: "owner",
      header: "Propietario",
      filterFn: "includesString",
    },
    {
      accessorKey: "plate",
      header: "Placa",
    },
    {
      accessorKey: "vin",
      header: "VIN",
    },
    {
      accessorKey: "model",
      header: "Modelo",
    },
    {
      accessorKey: "year",
      header: "Año",
    },
    {
      accessorKey: "brand",
      header: "Marca",
    },
    {
      accessorKey: "color",
      header: "Color",
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div class="flex gap-x-2">
          <UButton
            to={`/admin/vehicles/owner/${row.original.owner}/${row.original.plate}`}
            size="sm"
            icon="i-lucide-eye"
            variant="subtle"
          />
        </div>
      ),
    }
  ];

  const { data: vehicles, status } = useAsyncData(() =>
    $api("/admin/vehicles"),
  );

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
