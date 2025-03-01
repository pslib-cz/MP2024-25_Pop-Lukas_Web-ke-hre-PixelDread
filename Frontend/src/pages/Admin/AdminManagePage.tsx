import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { getAdmins, getCurrentUserId, deleteAdmin as deleteAdminAPI } from "../../api/adminService";
import CreateAdminModal from "../../components/modals/CreateAdminModal";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { Admin } from "../../types/admin";
import styles from "./AdminMagagePage.module.css";

const AdminManagePage: React.FC = () => {
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
    // Prevent self-deletion
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

  // Render modals using React Portals
  const createModalPortal = showCreateModal ? ReactDOM.createPortal(
    <div className={styles["admins__full-overlay"]}>
      <CreateAdminModal
        onClose={() => setShowCreateModal(false)}
        onSave={(savedAdmin) => {
          setAdmins((prev) => [...prev, savedAdmin]);
          setShowCreateModal(false);
          fetchAdmins();
        }}
      />
    </div>,
    document.body
  ) : null;

  const confirmationModalPortal = showConfirmationModal && confirmationModalProps ? ReactDOM.createPortal(
    <div className={styles["admins__full-overlay"]}>
      <ConfirmationModal
        title={confirmationModalProps.title}
        message={confirmationModalProps.message}
        onConfirm={confirmationModalProps.onConfirm}
        onCancel={() => setShowConfirmationModal(false)}
      />
    </div>,
    document.body
  ) : null;

  return (
    <HelmetProvider>
      <Helmet>
        <title>Manage Admins</title>
      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.title}>Admins</h1>
        <button className={styles.createButton} onClick={openCreateModal}>
          Create Admin
        </button>
        <div className={styles.adminList}>
          {admins.map((admin) => (
            <div key={admin.id} className={styles.adminItem}>
              <p className={styles.adminEmail}>{admin.email}</p>
              <button
                className={styles.deleteButton}
                onClick={() => openDeleteModal(admin)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {createModalPortal}
      {confirmationModalPortal}
    </HelmetProvider>
  );
};

export default AdminManagePage;
