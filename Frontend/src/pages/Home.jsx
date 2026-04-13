import { useEffect, useState } from "react";
import { getStudents, getStudentById } from "../api/students";
import StudentForm from "../components/studentForm";
import StudentList from "../components/studentList";
import { getInitials, getColor } from "../utils/studentHelpers";
import "./Home.css";

export default function Home() {
    const [tab, setTab] = useState("add");
    const [students, setStudents] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [searchError, setSearchError] = useState("");
    const [showList, setShowList] = useState(false);

    const loadStudents = async () => {
        const res = await getStudents();
        setStudents(Array.isArray(res) ? res : []);
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const handleSearch = async () => {
        if (!searchId) return;
        setSearchError("");
        setSearchResult(null);
        try {
            const res = await getStudentById(searchId);
            if (!res || !res.id) {
                setSearchError("No student found with that ID.");
            } else {
                setSearchResult(res);
            }
        } catch {
            setSearchError("Something went wrong.");
        }
    };

    const handleClear = () => {
        setSearchId("");
        setSearchResult(null);
        setSearchError("");
    };

    return (
        <div className="app-wrapper">
            <div className="app-card">

                {/* Header */}
                <div className="app-header">
                    <div className="app-logo">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" width="18" height="18">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="app-title">Students App</h1>
                        <p className="app-subtitle">{students.length} students enrolled</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    {["add", "all", "search"].map((t) => (
                        <button
                            key={t}
                            className={`tab ${tab === t ? "active" : ""}`}
                            onClick={() => setTab(t)}
                        >
                            {t === "add" ? "Add Student" : t === "all" ? "All Students" : "Search by ID"}
                        </button>
                    ))}
                </div>

                {/* Add Student Tab — uses StudentForm */}
                {tab === "add" && (
                    <div className="tab-content">
                        <StudentForm onSuccess={() => loadStudents()} />
                    </div>
                )}

                {/* All Students Tab — uses StudentList */}
                {tab === "all" && (
                    <div className="tab-content list-container">
                        <div className="toggle-wrapper">
                            <button
                                className={`unique-toggle-btn ${showList ? "is-active" : ""}`}
                                onClick={() => setShowList((prev) => !prev)}
                            >
                                <span className="btn-glow"></span>
                                <span className="btn-content">
                                    <span className="btn-icon">{showList ? "✕" : "☰"}</span>
                                    <span className="btn-text">{showList ? "Minimize List" : "Expand Directory"}</span>
                                </span>
                            </button>
                        </div>

                        <div className={`list-transition-wrap ${showList ? "expanded" : "collapsed"}`}>
                            {showList ? (
                                <StudentList students={students} />
                            ) : (
                                <div className="design-placeholder">
                                    <div className="floating-circle"></div>
                                    <p>Ready to view {students.length} student profiles</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/* Search Tab */}
                {tab === "search" && (
                    <div className="tab-content">
                        <div className="search-row">
                            <input
                                className="form-input"
                                type="number"
                                placeholder="Enter student ID"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                            />
                            <button className="btn-search" onClick={handleSearch}>Search</button>
                            {(searchId || searchResult || searchError) && (
                                <button className="btn-clear" onClick={handleClear}>Clear</button>
                            )}
                        </div>

                        {searchError && <p className="error-msg">{searchError}</p>}

                        {searchResult && (
                            <div className="result-card">
                                <div className="result-top">
                                    <div
                                        className="s-avatar large"
                                        style={{ background: getColor(searchResult.id) }}
                                    >
                                        {getInitials(searchResult.name)}
                                    </div>
                                    <div>
                                        <div className="s-name">{searchResult.name}</div>
                                        <div className="s-id">Student #{searchResult.id}</div>
                                    </div>
                                </div>
                                <div className="result-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Email</span>
                                        <span className="detail-value">{searchResult.email}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Age</span>
                                        <span className="detail-value">{searchResult.age} years</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}