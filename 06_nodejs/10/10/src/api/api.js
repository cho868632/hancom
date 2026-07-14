import axios from "axios";

const client = axios.create({
  baseURL: "http://192.168.10.28:5000/hancom/안치호/users",
  headers: {
    Authorization: "HANCOM",
  },
});

export const getStudents = async () => {
  const res = await client.get("");
  return res.data;
};

export const addStudent = async (name, id) => {
  const res = await client.post("", { id: id, name });
  return res.data;
};
export const updateStudent = async (id, newName) => {
  const res = await client.put(`/${id}`, { name: newName });
  return res.data;
};

// 삭제 (DELETE)
export const deleteStudent = async (id) => {
  const res = await client.delete(`/${id}`);
  return res.data;
};
