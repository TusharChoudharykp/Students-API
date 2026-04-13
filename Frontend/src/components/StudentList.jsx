import PropTypes from "prop-types";
import { getInitials, getColor } from "../utils/studentHelpers"

export default function StudentList({ students }) {
  if (!students || students.length === 0) {
    return <p className="empty-msg">No students yet. Add one!</p>;
  }

  return (
    <div className="cards-grid">
      {students.map((s) => (
        <div className="student-card" key={s.id}>
          <div className="card-top">
            <div className="s-avatar" style={{ background: getColor(s.id) }}>
              {getInitials(s.name)}
            </div>
            <span className="s-id">#{s.id}</span>
          </div>
          <div className="s-name">{s.name}</div>
          <div className="s-email">{s.email}</div>
          <div className="s-age">Age {s.age}</div>
        </div>
      ))}
    </div>
  );
}

StudentList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
    })
  ).isRequired,
};