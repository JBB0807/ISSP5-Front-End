import React, { useState, useEffect } from "react";
import "../scss/components/_assignment.scss";

const AssignmentPage = () => {
  const [studentName, setStudentName] = useState("");
  const [campID, setCampID] = useState("");
  const [programID, setProgramID] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    document.title = "Assignment";
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await fetch("http://localhost:8082/instructor/list/9", {
        // credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
     

      // Optional: Remove duplicate assignment IDs if needed
      const unique = Array.from(
        new Map(data.map((item) => [item.assignmentid, item])).values()
      );

      setProjects(unique);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const resetForm = () => {
    setStudentName("");
    setCampID("");
    setProgramID("");
    setPassword("");
    setTitle("");
    setDescription("");
    setFile(null);
    setEditingIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      studentname: studentName,
      campid: campID,
      programid: programID,
      title,
      description,
      fileName: file ? file.name : null,
    };

    if (editingIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editingIndex] = newProject;
      setProjects(updatedProjects);
    } else {
      setProjects([...projects, newProject]);
    }

    alert(editingIndex !== null ? "Assignment updated!" : "Assignment submitted!");
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (index) => {
    const project = projects[index];
    setStudentName(project.studentname || project.studentName || "");
    setCampID(project.campid || project.campID || "");
    setProgramID(project.programid || project.programID || "");
    setTitle(project.title || "");
    setDescription(project.description || "");
    setFile(null);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  return (
    <div className="assignment-page">
      <div className="assignment-header-box">
        <h2>Assignments</h2>
        <button onClick={() => { resetForm(); setShowModal(true); }}>➕ Add New</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingIndex !== null ? "Edit Assignment" : "New Assignment"}</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Student Name</label>
                <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
              </div>

              <div>
                <label>Camp ID</label>
                <input type="text" value={campID} onChange={(e) => setCampID(e.target.value)} required />
              </div>

              <div>
                <label>Program ID</label>
                <input type="text" value={programID} onChange={(e) => setProgramID(e.target.value)} required />
              </div>

              <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div>
                <label>Assignment Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div>
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              </div>

              <div>
                <label>File Upload (optional)</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              </div>

              <div className="modal-buttons">
                <button type="submit">{editingIndex !== null ? "Update" : "Submit"}</button>
                <button type="button" onClick={() => { resetForm(); setShowModal(false); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="project-list">
          {projects.map((project, index) => (
            <div key={index} className="project-item">
              <div className="project-meta">
                <strong>Student Name:</strong> {project.studentname || project.studentName} |{" "}
                <strong>CampID:</strong> {project.campid || project.campID} |{" "}
                <strong>ProgramID:</strong> {project.programid || project.programID}
              </div>

              {project.title && <h4>{project.title}</h4>}
              {project.description && <p>{project.description}</p>}
              {project.fileName && <p><strong>Uploaded File:</strong> {project.fileName}</p>}

              {project.assignmenturl && (
                <p>
                  <a href={project.assignmenturl} target="_blank" rel="noopener noreferrer">View Assignment</a>
                </p>
              )}
              {project.originalfile && (
                <p>
                  <a href={project.originalfile} target="_blank" rel="noopener noreferrer">Original File</a> |{" "}
                  <a href={project.editablefile} target="_blank" rel="noopener noreferrer">Editable File</a>
                </p>
              )}

              <div className="action-buttons">
                <button onClick={() => handleEdit(index)}>✏️ Edit</button>
                <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
                <button onClick={() => alert("QR feature coming soon!")}>📎 QR</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentPage;
