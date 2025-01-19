import { Link } from "react-router-dom";

import { api_url } from "../BlogContext";
import { useEffect, useState } from "react";
import { Admin } from "../types";
import { useContext } from "react";
import { BlogContext } from "../BlogContext";

const Admins = () => {
    const { state } = useContext(BlogContext);
    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await fetch(`${api_url}/Admin`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.userToken}`,
                    }
                });

                if (!response.ok) {
                    console.error('Failed to fetch admins');
                    return;
                }

                const data = await response.json();
                setAdmins(data);
            } catch (error) {
                console.error('Error fetching admins:', error);
            }
        };

        fetchAdmins();

    }, [state.userToken]);

    const handleDelete = async (id: number) => {
        if (id === state.adminId) {
            alert("You cannot delete your own account.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this admin?")) {
            return;
        }
        try {
            const response = await fetch(`${api_url}/Admin/DeleteAdmin/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.userToken}`,
                },
            });
            if (!response.ok) {
                console.error('Failed to delete admin');
                return;
            }
            setAdmins(admins.filter((admin: Admin) => admin.id !== id));
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    }

    return (
        <div>
            <h1>Admins</h1>
            {admins.map((admin: Admin) => (
                <div key={admin.id}>
                    <span>{admin.email}</span><button onClick={() => handleDelete(admin.id)}>Delete</button>
                </div>
            ))}
            <Link to="/admin/createAdmin">Create Admin</Link>
        </div>
    );
}
export default Admins;
