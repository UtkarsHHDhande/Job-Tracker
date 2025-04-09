import axios from "axios";

// You can define your backend URL in a .env file
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://job-tracker-mfyl.onrender.com";

// Get all job applications
export const getAllJobs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/jobs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// Add a new job application
export const addJob = async (jobData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/jobs`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
};

// Delete a job application
export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};

// Update a job application (e.g., status)
export const updateJob = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/jobs/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};
