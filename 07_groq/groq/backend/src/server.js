import "dotenv/config"; // backend/.env 로드 (로컬 개발용)
import app from "./app.js";

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`backend running on http://localhost:${port}`);
});
