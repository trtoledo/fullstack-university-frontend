const BASE_URL = "http://localhost:3000";

export async function fetchDepartments() {
  const res = await fetch(`${BASE_URL}/departments`);
  if (!res.ok) throw new Error("Failed to fetch departments");
  return res.json();
}

export async function fetchDepartmentById(id) {
  const res = await fetch(`${BASE_URL}/departments/${id}`);
  if (!res.ok) throw new Error("Department not found");
  return res.json();
}


export async function fetchProfessors() {
  const res = await fetch(`${BASE_URL}/professors`);
  if (!res.ok) throw new Error("Failed to fetch professors");
  return res.json();
}

export async function fetchProfessorById(id) {
  const res = await fetch(`${BASE_URL}/professors/${id}`);
  if (!res.ok) throw new Error("Professor not found");
  return res.json();
}