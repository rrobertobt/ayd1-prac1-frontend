<template>
  <div>
    <PageHeading
      :title="`Detalle del Trabajo: ${data?.body.id || '-'}`"
      description="Visualizar la información del trabajo"
      back-link="/admin/jobs"
      back-label="Volver"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      <div class="space-y-1">
        <h3 class="font-semibold text-muted text-lg">
          Placa (Vehículo asignado)
        </h3>
        <UInput
          class="w-full"
          size="xl"
          :default-value="data?.body.vehicle_plate || '-'"
          readonly
        />
      </div>
      <div class="space-y-1">
        <h3 class="font-semibold text-muted text-lg">Descripción</h3>
        <UInput
          class="w-full"
          size="xl"
          :default-value="data?.body.description || '-'"
          readonly
        />
      </div>
      <div class="space-y-1">
        <h3 class="font-semibold text-muted text-lg">Tiempo estimado</h3>
        <UInput
          class="w-full"
          size="xl"
          :default-value="data?.body.estimated_time || '-'"
          readonly
        />
      </div>
      <div class="space-y-1">
        <h3 class="font-semibold text-muted text-lg">Estado</h3>
        <UBadge size="lg">
          {{ data?.body.status || "-" }}
        </UBadge>
      </div>
    </div>
    <h3 class="font-semibold text-muted text-lg">Asignación a empleado</h3>
    <p>Selecciona un empleado de la lista para asignarle este trabajo.</p>
    <div class="flex items-center gap-4 mt-2">
      <USelect
        v-model="selectedUser"
        :items="availableUsers"
        leading-icon="i-lucide-user"
        placeholder="Selecciona un empleado"
      />
      <UButton class="" :loading="asyncStatus === 'loading'" @click="submit">
        Guardar
      </UButton>
    </div>
  </div>
</template>
<script setup lang="ts">
  import PageHeading from "~/components/partials/PageHeading.vue";

  const { params } = useRoute();

  const { data } = await useAsyncData(() => $api(`/admin/job/${params.id}`));

  
  const { data: users, status } = await useAsyncData(() => $api("/user/all"), {
    lazy: true,
  });

  const availableUsers = computed(
    () => {
      if (users.value) {
        return users.value.body.map((user) => ({ label: user.name, value: user.id }));
      }
      return [];
    }
  );

  const selectedUser = ref();

  const mutationFn = async () =>
    await $api("/admin/job/assignment", {
      method: "POST",
      body: {
        jobId: params.id,
        userId: selectedUser.value,
      },
    });

  const toast = useToast();
  const { mutate, asyncStatus } = useMutation({
    mutation: () => mutationFn(),
    onSuccess: () => {
      toast.add({
        title: "Asignación creada",
        description: "El trabajo ha sido asignado exitosamente",
      });
    },
    onError: (err) => {
      console.error(err);
      toast.add({
        title: "Error al crear la asignación",
        description: "Ocurrió un error al asignar el trabajo",
        color: "error",
      });
    },
  });

  const submit = () => {
    mutate();
  };

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
