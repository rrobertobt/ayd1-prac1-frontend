<template>
  <UApp class="size-full" :toaster="toaster" :tooltip="{ delayDuration: 0 }">
    <NuxtLayout>
      <slot />
    </NuxtLayout>
  </UApp>
</template>
<script setup lang="ts">
const toaster = { position: 'top-center' } as const
</script>