import React, { useState, useEffect } from "react";
import { userService } from "../../services/user";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ChevronDown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Users({ users = [], setUsers = () => {} }) {
  const navigate = useNavigate();
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = users.filter(user => {
    if (roleFilter === "all") return true;
    return user.role === roleFilter;
  });
  const handleToggleStatus = async () => {
  try {
    console.log("Selected User ID:", selectedUser.id);
    const updatedUser = await userService.toggleUserStatus(selectedUser.id, selectedUser);
    setSelectedUser(updatedUser);

    // Optional: only if fetchUsers is defined
    // fetchUsers();
  } catch (error) {
    console.error("Failed to toggle user status:", error);
  }
};



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".user-menu-trigger") &&
        !event.target.closest(".user-menu-dropdown")
      ) {
        setOpenMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
    setOpenMenuIndex(null);
  };

  const handleEdit = (user) => {
    navigate("/userform", { state: { user, editMode: true } });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 h-full relative">
      <div className="bg-white rounded-xl shadow-sm p-0 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold text-[#000]">Manage Users</h2>
          <Button
            className="bg-[#502deb] hover:bg-[#3a1fb4] text-white px-5 py-2 rounded-md"
            onClick={() => navigate("/userform")}
          >
            + Add User
          </Button>
        </div>

        <div className="border-t border-gray-300 w-full" />

        {/* Filters */}
        <div className="flex justify-between items-center px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            Show
            <div className="relative">
              <select className="border border-gray-300 rounded-md px-3 py-2 bg-white pr-8 appearance-none">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            entries
          </div>

          <div className="relative text-sm text-gray-600">
            <select
              className="border border-gray-300 rounded-md px-3 py-2 bg-white pr-8 appearance-none"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="tenant">Resident</option>
              <option value="security">Security</option>
              <option value="admin">Admin</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead />
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? "bg-[#f2f7f3]" : ""}
                >
                <TableCell>
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.first_name}
                      crossOrigin="anonymous"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
                      N/A
                    </div>
                  )}
                </TableCell>

                  <TableCell className="font-medium">
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell />
                  <TableCell>
                    {user.phone_number || (
                      <span className="text-gray-400 italic">No Phone</span>
                    )}
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.unit_number}</TableCell>
                  <TableCell>
                    {user.is_active ? (
                      <span className="text-green-600 font-semibold">
                        Active
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Inactive
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="relative user-menu-trigger">
                    <MoreHorizontal
                      className="cursor-pointer text-muted-foreground"
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === index ? null : index)
                      }
                    />
                    {openMenuIndex === index && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md z-10 user-menu-dropdown">
                        <ul className="text-sm text-gray-700">
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleView(user)}
                          >
                            View
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleEdit(user)}
                          >
                            Edit
                          </li>
                          <li className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer" onClick={() => {
                            setUserToDelete(user);
                            setShowDeleteModal(true);
                            setOpenMenuIndex(null);
                          }}>
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      

      {/* View Modal */}
      {showModal && selectedUser && (
        <div className="absolute top-20 right-8 bg-white border border-gray-300 shadow-lg rounded-lg w-[400px] z-50 p-6">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-center gap-6 border-b pb-4">
              {selectedUser.profile_picture ? (
                  <img
                    src={selectedUser.profile_picture}
                    alt={`${selectedUser.first_name} ${selectedUser.last_name}`}
                    crossOrigin="anonymous"
                    className="w-[140px] h-[140px] rounded-full object-cover"
                  />
                ) : (
                  <div className="w-[140px] h-[140px] rounded-full bg-gray-300 flex items-center justify-center text-xl text-white">
                    N/A
                  </div>
                )}

              <div>
                <h2 className="text-xl font-bold text-gray-700">
                  {selectedUser.first_name} {selectedUser.last_name}
                </h2>
                <div className="flex gap-6 mt-4 text-sm text-gray-700">
                  <div>
                    <div>Phone</div>
                    <div>Role</div>
                  </div>
                  <div>
                    <div>:</div>
                    <div>:</div>
                  </div>
                  <div>
                    <div>{selectedUser.phone_number || "No Phone"}</div>
                    <div>{selectedUser.role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-green-800 font-bold mb-2">
                Contact Information
              </h3>
              <div className="flex gap-12 text-sm text-gray-700">
                <div>
                  <div>Email</div>
                  <div>ID No</div>
                </div>
                <div>
                  <div>:</div>
                  <div>:</div>
                </div>
                <div>
                  <div>{selectedUser.email}</div>
                  <div>{selectedUser.id_number || "N/A"}</div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-green-800 font-bold mb-2">Account Status</h3>
              <div className="flex gap-12 items-center text-sm text-gray-700">
                <div>Current Status</div>
                <div>:</div>
                <div
                  className={`${
                    selectedUser.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  } px-2 py-1 rounded text-sm w-[90px] text-center`}
                >
                  {selectedUser.is_active ? "Active" : "Inactive"}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleToggleStatus}
                className={`border px-6 py-2 rounded font-semibold ${
                  selectedUser?.is_active
                    ? "border-red-600 text-red-600 hover:bg-red-100"
                    : "border-green-600 text-green-600 hover:bg-green-100"
                }`}
              >
                {selectedUser?.is_active ? "DISABLE" : "ENABLE"}
              </button>

              <button
                className="bg-red-600 text-white px-6 py-2 rounded shadow"
                onClick={() => {
                  setUserToDelete(selectedUser);
                  setShowModal(false);
                  setShowDeleteModal(true);
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && userToDelete && (
        <div className="absolute top-24 right-8 bg-white rounded-xl border shadow-lg p-6 w-[300px] z-50 flex flex-col items-center gap-6">
          <div className="bg-[#fee9e7] p-2 rounded-full">
            <img
              src="/material-symbols-light-warning-outline-rounded0.svg"
              alt="Warning"
              className="w-6 h-6"
            />
          </div>
          <p className="text-center text-sm text-black">
            Are you sure you want to delete{" "}
            <strong>
              {userToDelete.first_name} {userToDelete.last_name}
            </strong>
            ?<br />
            This action is irreversible.
          </p>
          <div className="w-full flex flex-col gap-3">
            <button
              onClick={async () => {
                try {
                  // Call your delete API
                  await userService.deleteUser(userToDelete.id);

                  // Update local state
                  setUsers((prev) =>
                    prev.filter((u) => u.id !== userToDelete.id)
                  );

                  // Close modal
                  setShowDeleteModal(false);
                  setUserToDelete(null);
                } catch (error) {
                  console.error("Failed to delete user:", error);
                  alert("Something went wrong while deleting the user.");
                }
              }}
              className="bg-[#e61c11] text-white w-full py-2 rounded shadow"
            >
              DELETE USER
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="border border-[#0a5b60] text-black w-full py-2 rounded"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
