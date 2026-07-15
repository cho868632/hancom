import express from "express";
import cors from "cors";
import axios from "axios";

// Express 앱 정의. 로컬(node)·Vercel(serverless) 양쪽에서 재사용.
const app = express();
app.use(cors());
app.use(express.json());

// 헬스체크
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// POST /api/chat  { input } -> { content }
// Groq API 키는 서버(process.env)에만 존재. 브라우저로 안 나감.
app.post("/api/chat", async (req, res) => {
  const { input } = req.body || {};
  if (!input) {
    return res.status(400).json({ error: "입력값이 없습니다." });
  }

  try {
    const r = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "모든 답변은 한국어로 작성하세요." },
          { role: "user", content: `${input}` },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return res.json({ content: r.data.choices?.[0]?.message?.content });
  } catch (error) {
    console.error(
      "API 호출 중 오류 발생:",
      error.response?.data || error.message,
    );
    return res
      .status(500)
      .json({ error: error.response?.data || error.message });
  }
});

export default app;
