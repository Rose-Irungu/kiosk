import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import UsersTable from "../../components/tables/Users";
import { userService } from "../../services/user";

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([])
  const entriesPerPage = 5;
  const navigate = useNavigate();

  const fallbackUsers = [
    { "id": 2, "email": "Edyth.Schinner@hotmail.com", "first_name": "Vince", "last_name": "Powlowski", "phone_number": "920-531-5706", "is_active": true, "role": "tenant", "no_of_cars": 0, "number_of_residents": 0, "date_joined": "2025-07-10T13:15:28+03:00", "unit_number": "AG123", "id_number": null, "profile_picture": null },
    { "id": 3, "email": "Broderick.Wunsch@yahoo.com", "first_name": "Aileen", "last_name": "Lang", "phone_number": "762-257-4461", "is_active": false, "role": "tenant", "no_of_cars": 0, "number_of_residents": 0, "date_joined": "2025-07-10T13:29:40.264551+03:00", "unit_number": "AG123", "id_number": "12345678", "profile_picture": null },
    { "id": 4, "email": "Wallace_Kutch57@hotmail.com", "first_name": "Rae", "last_name": "Kautzer", "phone_number": "866-659-7857", "is_active": false, "role": "security", "no_of_cars": 0, "number_of_residents": 0, "date_joined": "2025-07-10T13:57:32.107242+03:00", "unit_number": "AG123", "id_number": null, "profile_picture": null }, 
    { "id": 5, "email": "Adalberto.Quigley86@gmail.com", "first_name": "Jake", "last_name": "Crona", "phone_number": "675-228-2645", "is_active": true, "role": "admin", "no_of_cars": 0, "number_of_residents": 0, "date_joined": "2025-07-10T13:59:27.898613+03:00", "unit_number": "AG123", "id_number": null, "profile_picture": null },
    { "id": 6, "email": "thyu@gmail.com", "first_name": "Dorothy", "last_name": "tyu", "phone_number": "0789676543", "is_active": true, "role": "tenant", "no_of_cars": 0, "number_of_residents": 0, "date_joined": "2025-07-11T11:38:50.560976+03:00", "unit_number": "32", "id_number": "5678263535", "profile_picture": null }, 
    { "id": 7, "email": "huy@gmail.com", "first_name": "then", "last_name": "tyu", "phone_number": "0789676543", "is_active": true, "role": "security", "no_of_cars": 0, "number_of_residents": 0, "date_joined": "2025-07-11T11:46:03.627308+03:00", "unit_number": "3", "id_number": "657543225", "profile_picture": null }, 
    { "id": 8, "email": "jose@gmail.com", "first_name": "jose", "last_name": "Reichel", "phone_number": "0789676543", "is_active": true, "role": "tenant", "no_of_cars": 0, "number_of_residents": 0, "date_joined": "2025-07-11T11:48:06.473485+03:00", "unit_number": "3", "id_number": "6575432999", "profile_picture": null }
  ];


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        setUsers(data?.data || fallbackUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers(fallbackUsers);
      }
    };

    fetchUsers();
  }, []);

  const totalEntries = users.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const paginatedUsers = users.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#EEEAFD]">
      <Layout>
        <div className="py-4 px-4">
          <UsersTable users={paginatedUsers} setUsers={setUsers} navigate={navigate} />

          <div className="border-t mt-6 pt-4 px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                  } bg-[#efe6fd] border border-[#6c757d] text-[#495057] rounded-lg px-6 py-2.5 text-sm sm:text-base`}
              >
                Previous
              </button>
              <div className="bg-[#005e0e] text-white rounded-lg px-6 py-2.5 text-sm sm:text-base">
                {currentPage}
              </div>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
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
        </div>
      </Layout>
    </div>
  );
}
