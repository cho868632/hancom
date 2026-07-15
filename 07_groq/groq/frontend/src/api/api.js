import axios from "axios";

export const getMessage = async (input) => {
  if (!input) {
    console.warn("입력값이 없습니다.");
    return null;
  }
  try {
    const res = await axios.post("/api/chat", { input });
    return res.data.content;
  } catch (error) {
    console.error(
      "API 호출 중 오류 발생:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

/*
 * [LEGACY] 브라우저 -> Groq 직접 호출 방식.
 * VITE_GROQ_API_KEY 를 클라이언트 번들에 노출하므로 폐기됨.
 * 백엔드(/api/chat) 서버리스 함수로 이관. 참고용으로 보존.
 *
 * const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
 *
 * export const getMessage = async (input) => {
 *   if (!input) {
 *     console.warn("입력값이 없습니다.");
 *     return null;
 *   }
 *   try {
 *     const res = await axios.post(
 *       "https://api.groq.com/openai/v1/chat/completions",
 *       {
 *         model: "llama-3.3-70b-versatile",
 *         messages: [
 *           {
 *             role: "system",
 *             content: "모든 답변은 한국어로 작성하세요.",
 *           },
 *           {
 *             role: "user",
 *             content: `${input}`,
 *           },
 *         ],
 *       },
 *       {
 *         headers: {
 *           Authorization: `Bearer ${GROQ_API_KEY}`,
 *           "Content-Type": "application/json",
 *         },
 *       },
 *     );
 *
 *     return res.data.choices?.[0]?.message?.content;
 *   } catch (error) {
 *     console.error(
 *       "API 호출 중 오류 발생:",
 *       error.response?.data || error.message,
 *     );
 *     throw error;
 *   }
 * };
 */
