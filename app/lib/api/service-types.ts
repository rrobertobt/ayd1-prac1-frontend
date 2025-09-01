interface CreateServiceTypeResponse {
  code: string;
  message: string;
  body: null;
}

export async function createServiceType(data: {
  specialitiesId: number;
  name: string;
  description: string;
  price: number;
  estimatedTime: number;
}) {
  const response = await $api<CreateServiceTypeResponse>("/admin/service_type", {
    method: "POST",
    body: data,
  });
  return response;
}