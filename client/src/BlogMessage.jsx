import { useState } from "react";

export default function BlogMessage() {
  const [form, setForm] = useState({ name: "", message: "", category: "" });

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:8080/blog", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        // Reset form fields after successful submission
        setForm({ name: "", message: "", category: "" });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error if necessary
      });
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <h2>Add New Message</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Message:
          <input
            type="text"
            name="message"
            value={form.message}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Category:
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Educational">Educational</option>
            <option value="Community">Community</option>
            <option value="Appreciation">Appreciation</option>
            <option value="Hatred">Hatred</option>
          </select>
        </label>
        <br />
        <button type="submit">Add Message</button>
      </form>
    </div>
  );
}
