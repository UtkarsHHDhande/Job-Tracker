import { useEffect, useState } from "react";
import axios from "axios";
import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";
import FilterBar from "./components/FilterBar";
import { Toaster, toast } from "react-hot-toast";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true); // 🔄 Loading state

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // 🚀 Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/jobs`);
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load job applications");
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add new job
  const addJob = async (jobData) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/jobs`, jobData);
      setJobs([res.data, ...jobs]);
      toast.success("Job added!");
      window.scrollTo({ top: 0, behavior: "smooth" }); // 📌 Scroll to top after adding
    } catch (error) {
      toast.error("Failed to add job");
    }
  };

  // 🗑️ Delete a job
  const deleteJob = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
      toast.success("Job deleted");
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  // 🔄 Update job status
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/jobs/${id}`, {
        status: newStatus,
      });
      setJobs(jobs.map((job) => (job._id === id ? res.data : job)));
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // 🧠 Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? job.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          🧑‍💻 Student Job Tracker
        </h1>

        {/* Add New Job */}
        <JobForm onAdd={addJob} />

        {/* Filters */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Job Cards or Loading */}
        {loading ? (
          <p className="text-center text-gray-500 mt-6">Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onDelete={deleteJob}
                  onUpdate={updateStatus}
                />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500 mt-4">
                No job applications found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
