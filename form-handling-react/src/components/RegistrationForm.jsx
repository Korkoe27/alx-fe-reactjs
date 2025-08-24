import React from 'react';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Basic RegistrationForm component using useState
function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (errors.username) {
            setErrors(prev => ({ ...prev, username: '' }));
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) {
            setErrors(prev => ({ ...prev, email: '' }));
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors(prev => ({ ...prev, password: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!username.trim()) {
            newErrors.username = 'Username is required';
        }
        
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        // Form is valid, process submission
        console.log('Form submitted with data:', { username, email, password });
        alert('Registration successful!');
        
        // Reset form
        setUsername('');
        setEmail('');
        setPassword('');
        setErrors({});
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={username}
                        onChange={handleUsernameChange}
                        style={{ 
                            width: '100%', 
                            padding: '8px', 
                            border: errors.username ? '1px solid red' : '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                    {errors.username && <span style={{ color: 'red', fontSize: '12px' }}>{errors.username}</span>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={email}
                        onChange={handleEmailChange}
                        style={{ 
                            width: '100%', 
                            padding: '8px', 
                            border: errors.email ? '1px solid red' : '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                    {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ 
                            width: '100%', 
                            padding: '8px', 
                            border: errors.password ? '1px solid red' : '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                    {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
                </div>
                <button 
                    type="submit"
                    style={{ 
                        width: '100%', 
                        padding: '10px', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
}

// Validation schema for Formik
const validationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});

// Formik version of the registration form
function FormikForm() {
    const initialValues = {
        username: '',
        email: '',
        password: ''
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        // Simulate API call
        setTimeout(() => {
            console.log('Formik form submitted with values:', values);
            alert('Registration successful!');
            resetForm();
            setSubmitting(false);
        }, 400);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Registration Form (Formik)</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
                            <Field
                                type="text"
                                name="username"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                            <ErrorMessage 
                                name="username" 
                                component="div" 
                                style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                            <Field
                                type="email"
                                name="email"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                            <ErrorMessage 
                                name="email" 
                                component="div" 
                                style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                            <Field
                                type="password"
                                name="password"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                            <ErrorMessage 
                                name="password" 
                                component="div" 
                                style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: isSubmitting ? '#ccc' : '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isSubmitting ? 'Submitting...' : 'Register'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

// Main component to display both forms
function App() {
    return (
        <div>
            <RegistrationForm />
            <hr style={{ margin: '40px 0' }} />
            <FormikForm />
        </div>
    );
}

export default App;
export { RegistrationForm, FormikForm };