import { useState } from "react";
import PropTypes from "prop-types";
import { createStudent } from "../api/students";

export default function StudentForm({ onSuccess }) {
    const [form, setForm] = useState({ name: "", email: "", age: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [addedStudent, setAddedStudent] = useState(null);

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.age) {
            setError("All fields are required.");
            return;
        }
        setError("");
        setLoading(true);

        try {
            const newStudent = { ...form, age: Number(form.age) };
            await createStudent(newStudent);

            setAddedStudent(newStudent); // Show the UI banner
            setForm({ name: "", email: "", age: "" }); // Reset form

            onSuccess(false); // Background refresh

            // Wait 15 seconds then redirect
            setTimeout(() => {
                setAddedStudent(null);
                onSuccess(true);
            }, 15000);

        } catch {
            setError("Failed to add student. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-section">
            {!addedStudent ? (
                <>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            className="form-input"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            className="form-input"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Age</label>
                        <input
                            className="form-input"
                            type="number"
                            value={form.age}
                            onChange={(e) => setForm({ ...form, age: e.target.value })}
                        />
                    </div>

                    {error && <p className="error-msg">{error}</p>}

                    <button
                        className="btn-primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Adding to Database..." : "Confirm & Add Student"}
                    </button>
                </>
            ) : (
                /* UNIQUE SUCCESS UI */
                <div className="success-ui-wrapper">
                    <div className="success-animation">
                        <div className="check-ring"></div>
                        <span className="check-mark">✓</span>
                    </div>
                    <h2 className="success-heading">Student Registered!</h2>

                    <div className="details-glass-card">
                        <div className="detail-item">
                            <label>Name</label>
                            <span>{addedStudent.name}</span>
                        </div>
                        <div className="detail-item">
                            <label>Email</label>
                            <span>{addedStudent.email}</span>
                        </div>
                        <div className="detail-item">
                            <label>Age</label>
                            <span>{addedStudent.age} Years</span>
                        </div>
                    </div>

                    <div className="timer-bar-container">
                        <div className="timer-bar-fill"></div>
                    </div>
                    <p className="timer-text">Redirecting to directory in 15s...</p>
                </div>
            )}
        </div>
    );
}

StudentForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
};