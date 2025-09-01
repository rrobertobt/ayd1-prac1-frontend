<template>
  <div class="flex items-center justify-between gap-3">
    <span class="flex items-center gap-x-3">
      <Icon name="lucide:user" size="20" class="text-muted" />
      <span class="flex flex-col">
        <span>{{ sessionObj?.name }}</span>
        <span class="text-xs text-muted">{{ sessionObj?.email }}</span>
      </span>
    </span>
    <UTooltip text="Cerrar sesión">
      <UButton
        icon="i-lucide-log-out"
        variant="outline"
        size="sm"
        @click="useSessionStore().logOut"
      ></UButton>
    </UTooltip>
  </div>
</template>
<script setup lang="ts">
  const { sessionObj } = storeToRefs(useSessionStore());
</script>
<style scoped></style>
