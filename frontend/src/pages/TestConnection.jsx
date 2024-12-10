import { useEffect } from "react";

const TestConnection = () => {
  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => console.log("Backend Response:", data))
      .catch((err) => console.error("Error connecting to backend:", err));
  }, []);

  return <div>Check the console for backend response!</div>;
};

export default TestConnection;
