<template>
  <UNavigationMenu
    orientation="vertical"
    :items="items"
    class="data-[orientation=vertical]:w-64"
  />
</template>
<script setup lang="ts">
  import type { NavigationMenuItem } from "@nuxt/ui";

  const items = ref<NavigationMenuItem[][]>([
    [
      {
        label: "Navegación",
        type: "label",
      },
      {
        label: "Inicio",
        icon: "i-lucide-home",
        to: "/admin/home",
      },
      {
        label: "Usuarios",
        icon: "i-lucide-users",
        to: "/admin/users",
      },
      {
        label: "Vehículos",
        icon: "i-lucide-car",
        to: "/admin/vehicles",
      },
      {
        label: "Especialidades",
        icon: "i-lucide-briefcase",
        to: "/admin/specialities",
      },
      {
        label: "Repuestos",
        icon: "i-lucide-package",
        to: "/admin/parts",
      },
      {
        label: "Tipos de servicio",
        icon: "i-lucide-tag",
        to: "/admin/service-types",
      },
    ],
  ]);
</script>
<style scoped></style>
