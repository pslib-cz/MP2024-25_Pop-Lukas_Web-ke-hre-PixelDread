import React, { useEffect, useState } from "react";
import { Admin } from "../../types/admin";
import { getAdmins, getCurrentUserId, deleteAdmin as deleteAdminAPI } from "../../api/adminService";
import CreateAdminModal from "../../components/modals/CreateAdminModal";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { HelmetProvider } from "react-helmet-async";
const Admins: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [confirmationModalProps, setConfirmationModalProps] = useState<{
    title: string;
    message: string;
    onConfirm?: () => void;
  } | null>(null);
  const [currentAdminId, setCurrentAdminId] = useState<string>("");



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
      setConfirmationModalProps({
        title: "Delete Not Allowed",
        message: "You cannot delete your own account.",
      });
      setShowConfirmationModal(true);
      return;
    }
    setConfirmationModalProps({
      title: "Confirm Delete",
      message: `Are you sure you want to delete admin ${admin.email}?`,
      onConfirm: async () => {
        try {
          await deleteAdminAPI(admin.id);
          setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
        } catch (error) {
          console.error("Error deleting admin:", error);
        }
        setShowConfirmationModal(false);
      },
    });
    setShowConfirmationModal(true);
  };

  return (
    <HelmetProvider>
      <title>Manage admins</title>
    <div>
      <h1>Admins</h1>
      <button onClick={openCreateModal}>Create Admin</button>
      <div>
        {admins.map((admin) => (
          <div key={admin.id}>
            <p>{admin.email}</p>
            <button onClick={() => openDeleteModal(admin)}>Delete</button>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <CreateAdminModal
          onClose={() => setShowCreateModal(false)}
          onSave={(savedAdmin) => {
            setAdmins((prev) => [...prev, savedAdmin]);
            setShowCreateModal(false);
            fetchAdmins();
          }}
        />
      )}

      {showConfirmationModal && confirmationModalProps && (
        <ConfirmationModal
          title={confirmationModalProps.title}
          message={confirmationModalProps.message}
          onCancel={() => setShowConfirmationModal(false)}
          onConfirm={confirmationModalProps.onConfirm}
        />
      )}
    </div>
    </HelmetProvider>
  );
};

export default Admins;
