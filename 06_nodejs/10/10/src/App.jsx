import { useEffect, useState } from "react";
import "./App.css";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./api/api";

const CORRECT_LIST = [
  "강성원",
  "강하영",
  "김정아",
  "김정현",
  "김해냄",
  "김효인",
  "박진",
  "안치호",
  "양하은",
  "유민성",
  "이도연",
  "이현우",
  "임소정",
  "전욱진",
  "정기준",
  "정선민",
  "정유진",
  "표후동",
  "한유진",
  "한윤지",
];
function App() {
  const [students, setStudents] = useState([]);
  const [newName, setNewName] = useState("");

  const fetchData = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
      console.log(data);
    } catch (error) {
      console.log("데이터 조회 실패", error);
    }
  };

  const handleAdd = async () => {
    if (!newName.trim()) {
      alert("추가할 학생의 이름을 입력해주세요.");
      return;
    }

    try {
      const maxId =
        students.length > 0
          ? Math.max(...students.map((s) => Number(s.id)))
          : 0;
      const nextId = maxId + 1;
      await addStudent(newName, nextId);
      setNewName("");
      fetchData();
    } catch (error) {
      console.error("추가 실패:", error);
      alert("학생 추가에 실패했습니다.");
    }
  };
  const handleUpdate = async (id, currentName) => {
    const newNamePrompt = prompt("수정할 새 이름을 입력하세요:", currentName);
    if (!newNamePrompt || newNamePrompt === currentName) return;

    try {
      await updateStudent(id, newNamePrompt);
      fetchData();
    } catch (error) {
      console.error("업데이트 실패:", error);
      alert("학생 업데이트에 실패했습니다.");
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteStudent(id);
      fetchData();
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  const handleReset = async () => {
    if (!window.confirm("데이터가 초기화 됩니다.")) return;
    try {
      for (const student of students) {
        await deleteStudent(student.id);
      }
      let nextId = 1;
      for (const name of CORRECT_LIST) {
        await addStudent(name, nextId);
        nextId++;
      }
      alert("데이터 초기화 성공");
      fetchData();
    } catch (error) {
      console.log("초기화 실패", error);
      alert("초기화 실패");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>반 배치도</h1>
      <div className="bnt-group">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="새 학생 이름 입력"
          className="name-input"
        />
        <button onClick={handleAdd}>학생 추가</button>
        <button onClick={handleReset}>데이터 초기화</button>
      </div>
      <div className="seating-chart">
        {Array.from(
          { length: Math.ceil(students.length / 6) },
          (_, rowIndex) => {
            const rowStudents = students.slice(rowIndex * 6, rowIndex * 6 + 6);
            const leftSeats = rowStudents.slice(0, 3);
            const rightSeats = rowStudents.slice(3, 6);
            const renderSeat = (student) => (
              <div key={student.id} className="seat">
                <div
                  className="student-name"
                  onClick={() => handleUpdate(student.id, student.name)}
                >
                  {student.name}
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(student.id)}
                >
                  삭제
                </button>
              </div>
            );
            return (
              <div key={rowIndex} className="seat-row">
                <div className="seat-group">{leftSeats.map(renderSeat)}</div>
                <div className="aisle" />
                <div className="seat-group">{rightSeats.map(renderSeat)}</div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default App;
