import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import Layout from "../../components/Navigation";
import UsersTable from "../../components/tables/Users";

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalEntries = 20;
  const entriesPerPage = 5;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const navigate = useNavigate(); // ✅ Hook to handle routing

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <Layout>
      {/* Table component inside scrollable Layout */}
      <UsersTable navigate={navigate} /> {/* ✅ Pass navigate as prop */}

      {/* Pagination controls below the table */}
      <div className="border-t mt-6 pt-4 px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            } bg-[#efe6fd] border border-[#6c757d] text-[#495057] rounded-lg px-6 py-2.5 text-sm sm:text-base`}
          >
            Previous
          </button>
          <div className="bg-[#502deb] text-white rounded-lg px-6 py-2.5 text-sm sm:text-base">
            {currentPage}
          </div>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            } bg-[#efe6fd] border border-[#6c757d] text-[#495057] rounded-lg px-6 py-2.5 text-sm sm:text-base`}
          >
            Next
          </button>
        </div>
        <div className="text-[#495057] text-sm sm:text-base">
          Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
          {Math.min(currentPage * entriesPerPage, totalEntries)} out of{" "}
          {totalEntries} entries
        </div>
      </div>
    </Layout>
  );
}
