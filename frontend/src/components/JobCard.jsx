const JobCard = ({ job, onDelete, onUpdate }) => {
  const statusColors = {
    Applied: "bg-blue-100 text-blue-700",
    Interview: "bg-yellow-100 text-yellow-700",
    Offer: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this job?")) {
      onDelete(job._id);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h3 className="text-lg font-bold">{job.company}</h3>
        <p className="text-sm text-gray-600">{job.role}</p>

        {job.link && (
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline"
          >
            View Listing
          </a>
        )}

        <p className="text-xs text-gray-400 mt-1">
          Applied on: {job.appliedDate}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[job.status]
          }`}
          aria-label={`Status: ${job.status}`}
        >
          {job.status}
        </span>

        <select
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={job.status}
          onChange={(e) => onUpdate(job._id, e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
