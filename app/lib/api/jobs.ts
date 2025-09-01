export interface Part {
  id: number;
  code: string;
  name: string;
  description: string;
  brand: string;
}

interface CreateJobResponse {
  code: string;
  message: string;
  body: null;
}

export async function createJob(data: {
  plate: string;
  description: string;
  estimatedTime: number;
}) {
  const response = await $api<CreateJobResponse>("/admin/job", {
    method: "POST",
    body: {
      ...data,
      jobStatus: 'PENDIENTE',
    },
  });
  return response;
}
