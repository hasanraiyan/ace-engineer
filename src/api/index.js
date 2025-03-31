// src/api/index.js
import axios from 'axios';

// --- Constants ---
const BASE_URL = 'https://beu-data.onrender.com';
const API_TIMEOUT = 15000; // 15 seconds

// --- API Client ---
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
});

// --- Error Handler ---
const handleApiError = (error, context) => {
  console.error(`Error fetching ${context}:`, error);
  if (axios.isCancel(error)) {
    return "Request canceled.";
  }
  if (error.response) {
    console.error("Data:", error.response.data);
    console.error("Status:", error.response.status);
    if (error.response.status === 404) return `${context.charAt(0).toUpperCase() + context.slice(1)} not found.`;
    if (error.response.status >= 500) return "Server error. Please try again later.";
    return `Could not fetch ${context} (Status: ${error.response.status}).`;
  } else if (error.request) {
    return `Could not reach server. Check your internet connection.`;
  } else {
    return `An unexpected error occurred: ${error.message}`;
  }
};

// --- API Functions ---
export const fetchBranches = async () => {
  try {
    const response = await apiClient.get('/api/branches');
    return response.data;
  } catch (error) { throw new Error(handleApiError(error, 'branches')); }
};

export const fetchSemesters = async (branchId) => {
  if (!branchId) throw new Error("Branch ID is required");
  try {
    const response = await apiClient.get(`/api/branches/${branchId}/semesters`);
    return response.data;
  } catch (error) { throw new Error(handleApiError(error, 'semesters')); }
};

export const fetchSubjects = async (branchId, semesterId) => {
  if (!branchId || !semesterId) throw new Error("Branch ID and Semester ID are required");
  try {
    const response = await apiClient.get(`/api/branches/${branchId}/semesters/${semesterId}/subjects`);
    return response.data;
  } catch (error) { throw new Error(handleApiError(error, 'subjects')); }
};

export const fetchSubjectDetails = async (branchId, semesterId, subjectCode) => {
  if (!branchId || !semesterId || !subjectCode) throw new Error("Required IDs missing");
  try {
    const response = await apiClient.get(`/api/branches/${branchId}/semesters/${semesterId}/subjects/${subjectCode}`);
    return response.data;
  } catch (error) { throw new Error(handleApiError(error, 'subject details')); }
};