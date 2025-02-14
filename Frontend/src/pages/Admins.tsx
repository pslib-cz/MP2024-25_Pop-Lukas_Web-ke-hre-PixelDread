import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Admin } from "../types/admin";
import { getAdmins, getCurrentUserId, deleteAdmin as deleteAdminAPI } from "../api/adminService";
import CreateAdminModal from "../components/CreateAdminModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const Admins: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);
  const [currentAdminId, setCurrentAdminId] = useState<string>("");

  const navigate = useNavigate();

  const fetchAdmins = async () => {
    try {
      const adminsData = await getAdmins();
      setAdmins(adminsData);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
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
  }, []);

  const openCreateModal = () => {
    setShowCreateModal(true);
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
          <div key={admin.id || ""}>
            <p>{admin.email}</p>
            <button onClick={() => openDeleteModal(admin)}>Delete</button>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <CreateAdminModal
          onClose={() => setShowCreateModal(false)}
          onSave={(savedAdmin) => {
            // Add the newly created admin to state, then refetch to ensure IDs are correct
            setAdmins((prev) => [...prev, savedAdmin]);
            fetchAdmins();
            setShowCreateModal(false);
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
            fetchAdmins();
          }}
        />
      )}
    </div>
  );
};

export default Admins;
