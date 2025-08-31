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
    ],
  ]);
</script>
<style scoped></style>
