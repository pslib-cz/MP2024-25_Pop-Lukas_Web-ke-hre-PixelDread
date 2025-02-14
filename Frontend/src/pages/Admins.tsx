import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Admin } from "../types/admin";
import { getAdmins, getCurrentUserId, deleteAdmin as deleteAdminAPI } from "../api/adminService";
import CreateEditAdminModal from "../components/CreateEditAdminModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const Admins: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [showCreateEditModal, setShowCreateEditModal] = useState<boolean>(false);
  const [adminToEdit, setAdminToEdit] = useState<Admin | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);
  const [currentAdminId, setCurrentAdminId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const adminsData = await getAdmins();
        setAdmins(adminsData);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    const fetchCurrentAdminId = async () => {
      try {
        const id = await getCurrentUserId();
        setCurrentAdminId(id);
      } catch (error) {
        console.error("Error fetching current admin id:", error);
      }
    };

    fetchAdmins();
    fetchCurrentAdminId();
  }, [admins]);

  const openCreateModal = () => {
    setAdminToEdit(null);
    setShowCreateEditModal(true);
  };

  const openEditModal = (admin: Admin) => {
    setAdminToEdit(admin);
    setShowCreateEditModal(true);
  };

  const openDeleteModal = (admin: Admin) => {
    if (admin.id === currentAdminId) {
      alert("You cannot delete your own account.");
      return;
    }
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAdminAPI(id);
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  return (
    <div>
      <h1>Admins</h1>
      <button onClick={openCreateModal}>Create Admin</button>
      <div>
        {admins.map((admin) => (
          <div key={admin.id}>
            <p>{admin.email}</p>
            <button onClick={() => openEditModal(admin)}>Edit</button>
            <button onClick={() => openDeleteModal(admin)}>Delete</button>
          </div>
        ))}
      </div>

      {showCreateEditModal && (
        <CreateEditAdminModal
          admin={adminToEdit}
          onClose={() => setShowCreateEditModal(false)}
          onSave={(savedAdmin) => {
            if (adminToEdit) {
              setAdmins((prev) => prev.map((a) => (a.id === savedAdmin.id ? savedAdmin : a)));
            } else {
              setAdmins((prev) => [...prev, savedAdmin]);
            }
            setShowCreateEditModal(false);
          }}
        />
      )}

      {showDeleteModal && adminToDelete && (
        <DeleteConfirmationModal
          admin={adminToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            handleDelete(adminToDelete.id);
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Admins;
