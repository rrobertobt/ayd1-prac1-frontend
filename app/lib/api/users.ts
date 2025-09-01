interface CreateUserResponse {
  code: string;
  message: string;
  body: null;
}

export async function createUser(data: {
  role: string;
  email: string;
  nit: number;
  name: string;
  address: string;
  phoneNumber: string;
  password: string;
  twofaMethod: string;
}) {
  const response = await $api<CreateUserResponse>("/user", {
    method: "POST",
    body: data,
  });
  return response;
}
