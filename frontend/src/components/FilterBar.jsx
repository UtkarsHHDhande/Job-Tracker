const FilterBar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-white shadow-md rounded-xl">
      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="🔍 Search by company or role"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        className="p-2 rounded-lg border border-gray-300 shadow-sm w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* 🎯 Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="p-2 rounded-lg border border-gray-300 shadow-sm w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
};

export default FilterBar;
