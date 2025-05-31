import { apiClient } from "./api";
import { API_ENDPOINTS } from "../constants/api";
import { Candidate, CreateCandidateRequest } from "../types/candidate";

export class CandidateService {
  static async createCandidate(
    data: CreateCandidateRequest
  ): Promise<Candidate> {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("createdById", data.createdById);

    if (data.phone) formData.append("phone", data.phone);
    if (data.notes) formData.append("notes", data.notes);
    if (data.address) formData.append("address", JSON.stringify(data.address));
    if (data.educations.length > 0)
      formData.append("educations", JSON.stringify(data.educations));
    if (data.workExperiences.length > 0)
      formData.append("workExperiences", JSON.stringify(data.workExperiences));
    if (data.skills.length > 0)
      formData.append("skills", JSON.stringify(data.skills));
    if (data.resume) formData.append("resume", data.resume);

    const response = await apiClient.post(API_ENDPOINTS.CANDIDATES, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  static async getCandidates(): Promise<Candidate[]> {
    const response = await apiClient.get(API_ENDPOINTS.CANDIDATES);
    return response.data;
  }

  static async getCandidateById(id: string): Promise<Candidate> {
    const response = await apiClient.get(`${API_ENDPOINTS.CANDIDATES}/${id}`);
    return response.data;
  }
}
