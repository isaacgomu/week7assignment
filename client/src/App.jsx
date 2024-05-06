import { useState, useEffect } from "react";
import BlogMessage from "./BlogMessage";

export default function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getMessages();
  }, []);
  async function getMessages() {
    const response = await fetch("http://localhost:8080/blog");
    const data = await response.json();
    console.log(data);
    setMessages(data);
  }

  return (
    <div>
      {messages.map((messages, index) => (
        <div key={index}>
          <p>Name: {messages.name}</p>
          <p>Message: {messages.posttext}</p>
          <p>Categories: {messages.categories}</p>
        </div>
      ))}
      <BlogMessage />
    </div>
  );
}
