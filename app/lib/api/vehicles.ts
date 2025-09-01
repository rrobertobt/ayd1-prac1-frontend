interface CreateVehicleResponse {
  code: string;
  message: string;
  body: null;
}

export async function createVehicle(data: {
  nit: number;
  plate: string;
  vin: string;
  model: string;
  year: number;
  brand: string;
  color: string;
}) {
  const response = await $api<CreateVehicleResponse>("/vehicle", {
    method: "POST",
    body: data,
  });
  return response;
}
