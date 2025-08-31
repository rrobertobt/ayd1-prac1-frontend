<template>
  <UApp class="size-full" :toaster="toaster">
    <NuxtLayout>
      <slot />
    </NuxtLayout>
  </UApp>
</template>
<script setup lang="ts">
const toaster = { position: 'top-center' } as const
</script>