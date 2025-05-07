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
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Assignment";
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await fetch("http://localhost:8082/instructor/list/9");
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
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
    setLoading(true);

    const newProject = {
      studentname: studentName,
      campid: campID,
      programid: programID,
      title,
      description,
      fileName: file ? file.name : null,
    };

    setTimeout(() => {
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
      setLoading(false);
    }, 2000);
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

      <div className="assignment-search-box">
        <input
          type="text"
          placeholder="🔍︎ Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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

              <div className="password-field">
                <label>Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
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

              {loading && (
                <div className="spinner-container">
                  <div className="spinner"></div>
                  <p>Uploading...</p>
                </div>
              )}

              <div className="modal-buttons">
                <button type="submit" disabled={loading}>
                  {editingIndex !== null ? "Update" : "Submit"}
                </button>
                <button type="button" onClick={() => { resetForm(); setShowModal(false); }} disabled={loading}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="project-list">
          {projects
            .filter((project) => {
              if (!searchTerm.trim()) return true;
              const regex = new RegExp(searchTerm, "i");
              return (
                regex.test(project.studentname || project.studentName || "") ||
                regex.test(project.campid || project.campID || "") ||
                regex.test(project.programid || project.programID || "") ||
                regex.test(project.title || "") ||
                regex.test(project.description || "") ||
                regex.test(project.fileName || "") ||
                regex.test(project.assignmenturl || "") ||
                regex.test(project.originalfile || "") ||
                regex.test(project.editablefile || "")
              );
            })
            .map((project, index) => (
              <div key={index} className="project-item">
                <div className="project-meta">
                  <p><strong>Student Name:</strong> {project.studentname || project.studentName}</p>
                  <p><strong>CampID:</strong> {project.campid || project.campID}</p>
                  <p><strong>ProgramID:</strong> {project.programid || project.programID}</p>
                </div>

                {project.title && <h4>{project.title}</h4>}
                {project.description && <p>{project.description}</p>}

                {project.fileName && (
                  <p><strong>Uploaded File:</strong> {project.fileName}</p>
                )}

                {project.assignmenturl && (
                  <p className="assignment-links">
                    <a href={project.assignmenturl} target="_blank" rel="noopener noreferrer">View Assignment</a>
                  </p>
                )}
                {project.originalfile && (
                  <p className="assignment-links">
                    <a href={project.originalfile} target="_blank" rel="noopener noreferrer">Original File</a>{" "}
                    <a href={project.editablefile} target="_blank" rel="noopener noreferrer">Editable File</a>
                  </p>
                )}

                <div className="action-buttons">
                  <button onClick={() => handleEdit(index)}>✏️ View Edit</button>
                  <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
                  <button onClick={() => alert("QR feature coming soon!")}>🧮 Editor</button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentPage;
