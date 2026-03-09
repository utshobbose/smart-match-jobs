const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ---------- helpers ----------

function getToken(): string | null {
  return localStorage.getItem("token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return data as T;
}

// ---------- auth ----------

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const auth = {
  register: (name: string, email: string, password: string) =>
    request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email: string, password: string) =>
    request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: () => request<AuthUser>("/auth/me"),
};

// ---------- resumes ----------

export interface ParsedResume {
  skills: string[];
  experience: string[];
  education: string[];
  summary: string;
}

export interface ResumeRecord {
  _id: string;
  fileName: string;
  parsed: ParsedResume;
  summary: string;
  createdAt: string;
}

export const resumes = {
  upload: (file: File) => {
    const form = new FormData();
    form.append("resume", file);
    return request<ResumeRecord>("/resume/upload", {
      method: "POST",
      body: form,
    });
  },

  list: () => request<ResumeRecord[]>("/resume/"),

  get: (id: string) => request<ResumeRecord>(`/resume/${id}`),

  delete: (id: string) =>
    request<{ message: string }>(`/resume/${id}`, { method: "DELETE" }),
};

// ---------- analyze ----------

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  matchScore: number;
  salary?: string;
  skills: string[];
  description: string;
  type?: string;
}

export interface AnalyzeResult {
  resumeId: string;
  skills: string[];
  recommendations: JobMatch[];
}

export const analyze = {
  run: (resumeId: string) =>
    request<AnalyzeResult>(`/analyze/${resumeId}`),
};

// ---------- jobs ----------

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
}

export const jobs = {
  list: (params?: { skill?: string; role?: string; limit?: number }) => {
    const qs = new URLSearchParams(
      Object.entries(params || {})
        .filter(([, v]) => v != null)
        .map(([k, v]) => [k, String(v)])
    ).toString();
    return request<Job[]>(`/jobs${qs ? `?${qs}` : ""}`);
  },

  get: (id: string) => request<Job>(`/jobs/${id}`),
};
