export interface Job {
  id: number;
  vehicle_plate: string;
  description: string;
  estimated_time: number | null;
  status: string;
}

// Respuesta del endpoint
interface GetMyJobsResponse {
  body: Job[];
}

export async function getMyJobs() {
  const response = await $api<GetMyJobsResponse>("/jobs/my", {
    method: "GET",
  });
  console.log(response);
  
  return response;
}



export interface JobDetail {
  id: number;
  plate: string;
  description: string;
  estimatedTime: number;
  jobStatus: string;
  assignedEmployee?: {
    id: number;
    name: string;
  };
  // agrega otros campos que devuelva tu backend
}

export async function getJobById(id: number) {
  return await $api<JobDetail>(`/jobs/${id}`, {
    method: "GET",
  });
}


export interface JobLog {
  id: number;
  logType: string;
  description: string;
  occurredAt: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
}

export interface JobPart {
  id: number;
  jobId: number;
  partId: number;
  partName: string;
  unitPrice: number;
  amount: number;
  createdAt: string;
}

export interface JobTask {
  id: number;
  jobId: number;
  serviceId: number;
  serviceName: string;
  status: string;
  createdAt: string;
  updateAt: string | null;
}

export async function getJobLogs(jobId: number) {
  return await $api<JobLog[]>(`/jobs/${jobId}/logs`, { method: "GET" });
}

export async function getJobParts(jobId: number) {
  return await $api<JobPart[]>(`/jobs/${jobId}/parts`, { method: "GET" });
}

export async function getJobTasks(jobId: number) {
  return await $api<JobTask[]>(`/jobs/${jobId}/tasks`, { method: "GET" });
}
