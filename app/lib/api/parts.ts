export interface Part {
  id: number;
  code: string;
  name: string;
  description: string;
  brand: string;
}

interface CreatePartResponse {
  code: string;
  message: string;
  body: null;
}

export async function createPart(data: {
  code: string;
  name: string;
  description: string;
  brand: string;
}) {
  const response = await $api<CreatePartResponse>("/part", {
    method: "POST",
    body: data,
  });
  return response;
}
