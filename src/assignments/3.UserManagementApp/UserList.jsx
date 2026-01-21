import './css/UserList.css';

const UserList = ({ users }) => {
    if (users.length === 0) {
        return (
            <div className="user-list-container">
                <h2 className="user-list-title">User List</h2>
                <div className="empty-state">No users found.</div>
            </div>
        );
    }

    return (
        <div className="user-list-container">
            <h2 className="user-list-title">User List</h2>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-card">
                        <h3 className="user-name">{user.name}</h3>
                        <p className="user-email">{user.email}</p>
                        <p className="user-city">{user.address.city}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;