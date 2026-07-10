import axios from "axios";
import { useEffect, useState } from "react";

const User = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );
        setUsers(res.data);
      } catch (error) {
        console.error("로딩실패", error);
        setError("사용자 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <div>
      {isLoading ? (
        <p>불러오는중</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.name} / {u.company.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
