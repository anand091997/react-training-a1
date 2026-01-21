import { useState } from 'react';
import './css/AddUser.css';

const INITIAL_FORM_STATE = {
    name: '',
    email: '',
    address: { city: '' }
};

const INITIAL_ERROR_STATE = {
    name: '',
    email: '',
    address: { city: '' }
};

const AddUser = ({ users, setUsers }) => {
    const [newUser, setNewUser] = useState(INITIAL_FORM_STATE);
    const [userErrors, setUserErrors] = useState(INITIAL_ERROR_STATE);
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'city') {
            setNewUser(prev => ({
                ...prev,
                address: { ...prev.address, city: value }
            }));
            if (userErrors.address.city) {
                setUserErrors(prev => ({
                    ...prev,
                    address: { ...prev.address, city: '' }
                }));
            }
        } else {
            setNewUser(prev => ({ ...prev, [name]: value }));
            if (userErrors[name]) {
                setUserErrors(prev => ({ ...prev, [name]: '' }));
            }
        }
    };

    const handleReset = () => {
        setNewUser(INITIAL_FORM_STATE);
        setUserErrors(INITIAL_ERROR_STATE);
        setSuccessMessage('');
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        setSuccessMessage('');

        if (!newUser.name.trim() || !newUser.email.trim() || !newUser.address.city.trim()) {
            setUserErrors({
                name: !newUser.name.trim() ? 'Name is required' : '',
                email: !newUser.email.trim() ? 'Email is required' : '',
                address: {
                    city: !newUser.address.city.trim() ? 'City is required' : ''
                }
            });
            return;
        }

        setIsSubmitting(true);

        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newUser.name,
                email: newUser.email,
                city: newUser.address.city
            })
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setUsers([...users, { ...newUser, id: Date.now() }]);
                setNewUser(INITIAL_FORM_STATE);
                setUserErrors(INITIAL_ERROR_STATE);
                setSuccessMessage('User added successfully');
            })
            .catch(error => {
                console.error('Error adding user:', error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="add-user-container">
            <h2 className="add-user-title">Add New User</h2>
            <form className="add-user-form" onSubmit={handleAddUser}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-input" type="text" placeholder="Enter name" id="name" name="name" value={newUser.name} onChange={handleChange} />
                    {userErrors.name && <p className="error-text">{userErrors.name}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-input" type="email" placeholder="Enter email" id="email" name="email" value={newUser.email} onChange={handleChange} />
                    {userErrors.email && <p className="error-text">{userErrors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input className="form-input" type="text" placeholder="Enter city" id="city" name="city" value={newUser.address.city} onChange={handleChange} />
                    {userErrors.address.city && <p className="error-text">{userErrors.address.city}</p>}
                </div>
                <div className="button-group">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting && <span className="spinner"></span>}
                        {isSubmitting ? 'Adding...' : 'Add User'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
                </div>
            </form>

            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default AddUser;