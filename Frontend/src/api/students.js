const BASE_URL = "http://localhost:8080";

export const createStudent = async (data) => {
  const res = await fetch(`${BASE_URL}/api/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();

console.log("CREATE RESPONSE:", result);
return result;

};

export const getStudents = async () => {
  const res = await fetch(`${BASE_URL}/api/students`);
  return res.json();
};

export const getStudentById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/students/${id}`);
  return res.json();
};