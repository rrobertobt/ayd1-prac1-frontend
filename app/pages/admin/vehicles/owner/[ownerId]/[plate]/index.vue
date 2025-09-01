<template>
  <div>
    <PageHeading
      :title="`Detalle del Vehículo: ${data?.body.plate || '-'}`"
      description="Visualizar la información del vehículo"
      back-link="/admin/vehicles"
      back-label="Volver"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      <div class="space-y-1">
        <h3 class="font-semibold text-muted text-lg">Propietario (NIT)</h3>
        <UInput class="w-full" size="xl" :default-value="data?.body.owner || '-'" readonly />
      </div>
      <div class="space-y-1">
        <h3 class="font-semibold text-muted text-lg">Placa</h3>
        <UInput class="w-full" size="xl" :default-value="data?.body.plate || '-'" readonly />
      </div>
      <div class="space-y-1">
        <h3 class="font-semibold text-muted text-lg">Marca</h3>
        <UInput class="w-full" size="xl" :default-value="data?.body.brand || '-'" readonly />
      </div>
      <div class="space-y-1">
        <h3 class="font-semibold text-muted text-lg">Modelo</h3>
        <UInput class="w-full" size="xl" :default-value="data?.body.model || '-'" readonly />
      </div>
      <div class="space-y-1">
        <h3 class="font-semibold text-muted text-lg">Año</h3>
        <UInput class="w-full" size="xl" :default-value="data?.body.year || '-'" readonly />
      </div>
      <div class="space-y-1">
        <h3 class="font-semibold text-muted text-lg">Color</h3>
        <UInput class="w-full" size="xl" :default-value="data?.body.color || '-'" readonly />
      </div>
      <div class="space-y-1">
        <h3 class="font-semibold text-muted text-lg">VIN</h3>
        <UInput class="w-full" size="xl" :default-value="data?.body.vin || '-'" readonly />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import PageHeading from "~/components/partials/PageHeading.vue";

  const { params } = useRoute();

  const ownerId = params.ownerId as string;
  const vehiclePlate = params.plate as string;

  const { data } = await useAsyncData(() =>
    $api(`/vehicle/${vehiclePlate}`, {
      headers: {
        "user-nit": ownerId,
      },
    }),
  );

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
