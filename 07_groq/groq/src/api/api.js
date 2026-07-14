import axios from "axios";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const getMessage = async (input) => {
  if (!input) {
    console.warn("입력값이 없습니다.");
    return null;
  }
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "모든 답변은 한국어로 작성하세요.",
          },
          {
            role: "user",
            content: `${input}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return res.data.choices?.[0]?.message?.content;
  } catch (error) {
    console.error(
      "API 호출 중 오류 발생:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
