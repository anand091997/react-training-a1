import { useState, useEffect } from 'react';
import UserList from './UserList';
import AddUser from './AddUser';
import './css/UserManagementApp.css';

const UserManagementApp = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setError(error);
                setUsers([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="user-management-container">
            <h1 className="user-management-title">User Management</h1>

            <AddUser users={users} setUsers={setUsers} />

            {loading ? (
                <div className="page-loader">
                    <div className="page-spinner"></div>
                    <p>Loading users...</p>
                </div>
            ) : error ? (
                <div className="error-container">
                    Error: {error.message}
                </div>
            ) : (
                <UserList users={users} />
            )}
        </div>
    );
};

export default UserManagementApp;