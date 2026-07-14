const express = require("express");
const app = express();

let users = [
  { id: 1, name: "지니" },
  { id: 2, name: "철수" },
  { id: 3, name: "철수" },
  { id: 4, name: "철수" },
];

// 삭제 — DELETE /api/users/2 (그 id만 빼기 · body 없어서 express.json() 불필요)
app.delete("/api/users/:id", (req, res) => {
  users = users.filter((u) => u.id !== Number(req.params.id)); // 그 id만 빼고 새 배열로
  res.json({ ok: true, 남은: users }); // 남은 목록까지 응답 → 삭제 눈으로 확인
});

app.listen(3000, async () => {
  try {
    // 일부러 존재하지 않을 것 같은 id(예: 999)로 DELETE 요청
    const res = await fetch("http://localhost:3000/api/users/999", {
      method: "DELETE",
    });

    // 서버 응답이 성공(200번대)이 아닐 경우 강제로 에러를 발생시킴
    if (!res.ok) {
      throw new Error("없는 사람 삭제 시도 (잘못된 선택입니다)");
    }

    // 정상적으로 삭제되었을 때의 처리
    const data = await res.json();
    console.log("✅ 삭제 완료:", data);
  } catch (error) {
    // throw로 던진 에러나 네트워크 문제 등을 여기서 모두 잡아냄
    console.error("❌ 에러 처리됨:", error.message);
  }
});
