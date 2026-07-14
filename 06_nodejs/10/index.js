const express = require("express");
const app = express();

const BASE_URL = "http://192.168.10.28:5000/hancom/안치호/users";
const HEADERS = {
  Authorization: "HANCOM",
  "Content-Type": "application/json",
};
async function testGet() {
  try {
    const response = await fetch(BASE_URL, { headers: HEADERS });
    const data = await response.json();
    console.table(data);
  } catch (error) {
    console.error("GET 에러:", error);
  }
}
async function testPost(newName) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ name: newName }),
    });
    const data = await response.json();
    console.log("추가 완료:", data);
  } catch (error) {
    console.error("POST 에러:", error);
  }
}

// 학생 수정 (PUT)
async function testPut(id, newName) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({ name: newName }),
    });
    const data = await response.json();
    console.log("수정 완료:", data);
  } catch (error) {
    console.error("PUT 에러:", error);
  }
}

// 학생 삭제 (DELETE)
async function testDelete(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: HEADERS,
    });
    const data = await response.json();
    console.log("삭제 완료:", data);
  } catch (error) {
    console.error("DELETE 에러:", error);
  }
}

// testPut(25, "dksdks");
testGet();
