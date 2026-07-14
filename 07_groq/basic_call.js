const { default: axios } = require("axios");

require("dotenv").config();
const key = process.env.GROQ_API_KEY;

const main = async () => {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: "한 문장으로 자기소개 해줘" }],
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log(res.data.choices?.[0]?.message?.content || res.data);
  } catch (error) {
    console.error(
      "API 호출 중 오류 발생:",
      error.response?.data || error.message,
    );
  }
};

main();
