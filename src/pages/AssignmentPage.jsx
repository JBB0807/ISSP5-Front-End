import React, { useState } from "react";
import "../scss/components/_assignment.scss";

const AssignmentPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const res = await fetch("/api/assignments", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Successfully Uploaded!");
        setProjects([...projects, { title, description }]);
        setTitle("");
        setDescription("");
        setFile(null);
        setShowModal(false);
      } else {
        alert("Fail Uploading!");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error!");
    }
  };

  const handleDelete = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  return (
    <div className="assignment-page">
      <h2>📘 Assignments</h2>
      <button onClick={() => setShowModal(true)}>➕ Create New</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingIndex !== null ? "Edit Assignment" : "New Assignment"}</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <label>Assignment Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div>
                <label>File Upload</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>

              <div className="modal-buttons">
                <button type="submit">Upload</button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setTitle("");
                    setDescription("");
                    setFile(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="project-list">
        <h3>📋 Projects</h3>
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <button onClick={() => alert("Edit not implemented in modal mode")}>✏️ Edit</button>
            <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentPage;
