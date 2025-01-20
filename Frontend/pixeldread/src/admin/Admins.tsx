import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { api_url } from "../BlogContext";
import { BlogContext } from "../BlogContext";
import { Admin } from "../types";

const Admins = () => {
    const { state, dispatch } = useContext(BlogContext);
    const [admins, setAdmins] = useState<Admin[]>([]);

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
                    console.error(`Failed to fetch admins. Status: ${response.status}`);
                    return;
                }

                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    setAdmins(data);
                } else {
                    console.error("Unexpected response format:", await response.text());
                }
            } catch (error) {
                console.error('Error fetching admins:', error);
            }
        };

        const fetchAdminId = async () => {
            try {
                const response = await fetch(`${api_url}/Admin/CurrentUserId`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.userToken}`,
                    }
                });
        
                if (!response.ok) {
                    console.error(`Failed to fetch admin ID. Status: ${response.status}`);
                    return;
                }
        
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    // If it's JSON, parse it.
                    const data = await response.json();
                    dispatch({ type: 'SET_ADMIN_ID', payload: data });
                } else {
                    // Otherwise, treat it as plain text (e.g., a GUID).
                    const adminId = await response.text();
                    dispatch({ type: 'SET_ADMIN_ID', payload: adminId });
                }
            } catch (error) {
                console.error('Error fetching admin ID:', error);
            }
        };
        

        fetchAdmins();
        fetchAdminId();
    }, [state.userToken, dispatch]);

    const handleDelete = async (id: string) => {
        if (id == state.adminId) {
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
                console.error(`Failed to delete admin. Status: ${response.status}`);
                return;
            }

            setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    return (
        <div>
            <h1>Admins</h1>
            {admins.map((admin) => (
                <div key={admin.id}>
                    <p>{admin.email}</p>
                    <button onClick={() => handleDelete(admin.id)}>Delete</button>
                </div>
            ))}
            
            <Link to="/admin/createAdmin">Create Admin</Link>
        </div>
    );
};

export default Admins;
