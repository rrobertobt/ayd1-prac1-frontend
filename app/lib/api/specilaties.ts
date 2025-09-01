interface CreateSpecialityTypeResponse {
  code: string;
  message: string;
  body: null;
}

export async function createSpeciality(data: {
  name: string;
}) {
  const response = await $api<CreateSpecialityTypeResponse>("/admin/specialties", {
    method: "POST",
    body: data,
  });
  return response;
}