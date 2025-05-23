import React, { useState, useEffect } from "react";
import "../scss/page/_assignment.scss";
import { useNavigate } from "react-router-dom";

const AssignmentPage = () => {
  const [assignmentId, setAssignmentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [campID, setCampID] = useState("");
  const [programID, setProgramID] = useState("");
  const [appName, setAppName] = useState("");
  const [qrCodeNumber, setQrCodeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [user, setUser] = useState([]);

  const ASSIGNMENT_BASE = import.meta.env.VITE_ASSIGNMENT_URL;
  const authUrl = import.meta.env.VITE_AUTH_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Assignment";
    fetchAssignments();
  }, []);

  useEffect(() => {
    if (!appName) return; // Don't alert for empty name
    const timer = setTimeout(() => {
      fetch(
        `${ASSIGNMENT_BASE}/instructor/checkAssignmentByAppName/${appName}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch assignment by app name");
          }
          return response.json();
        })
        .then((data) => {
          if (data.exists) {
            alert(
              "This app name already exists. Please choose a different one."
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching assignment by app name:", error);
        });
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // Clear timeout on name change
  }, [appName]);

  useEffect(() => {
    if (!qrCodeNumber) return; // Don't alert for empty QR code number
    console.log("Checking QR code number:", qrCodeNumber); // Added console log
    const timer = setTimeout(() => {
      fetch(
        `${ASSIGNMENT_BASE}/instructor/checkAssignmentByQRCode/${qrCodeNumber}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch assignment by QR code number");
          }
          return response.json();
        })
        .then((data) => {
          console.log("QR code fetch result:", data); // Added console log
          if (data.exists) {
            alert(
              "This QR code number already exists. Please choose a different one."
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching assignment by QR code number:", error);
        });
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // Clear timeout on QR code number change
  }, [qrCodeNumber]);

  const fetchAssignments = async () => {
    try {
      const authResponse = await fetch(`${authUrl}/auth/current_user`, {
        credentials: "include",
      });
      const user = await authResponse.json();
      setUser(user);
      console.log("User:", user);

      const res = await fetch(
        `${ASSIGNMENT_BASE}/instructor/list/${user.userId}`,
        {
          method: "GET",
        }
      );

      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      console.log("Fetched assignments data:", data);

      // Optional: Remove duplicate assignment IDs if needed
      const unique = Array.from(
        new Map(data.map((item) => [item.assignmentid, item])).values()
      );

      console.log("Unique assignments data:", unique);

      setProjects(unique);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const resetForm = () => {
    setStudentName("");
    setCampID("");
    setProgramID("");
    setQrCodeNumber("");
    setAppName("");
    setPassword("");
    setDescription("");
    setFile(null);
    setEditingIndex(null);
  };

  const handleEditClick = (qrCodeNumber) => {
    console.log("Navigating to editor with QR Code Number:", qrCodeNumber);
    navigate("/editor", { state: { qrCodeNumber: qrCodeNumber } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user.userId) return alert("Please login to submit an assignment.");

    //Create the form data needed for both create and edit
    const formData = new FormData();
    formData.append("studentname", studentName);
    formData.append("campid", campID);
    formData.append("programid", programID);
    formData.append("qrcodenumber", qrCodeNumber);
    formData.append("password", password);
    formData.append("description", description);

    if (editingIndex !== null) {
      //edit mode
      await fetch(`${ASSIGNMENT_BASE}/instructor/update/${assignmentId}`, {
        method: "PUT",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            console.error("Failed to edit assignment:", response.statusText);
            throw new Error("Failed to edit assignment");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Assignment edited successfully:", data);
        })
        .catch((error) => {
          console.error("Error submitting assignment:", error);
          alert(`Failed to submit assignment. ${error.message}`);
        });
    } else {
      //create mode
      formData.append("instructorid", user.userId);
      formData.append("appname", appName);

      if (file) {
        formData.append("file", file, file.name);
      } else {
        throw new Error("Failed to submit assignment: file not found.");
      }

      await fetch(`${ASSIGNMENT_BASE}/instructor/create`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            console.error("Failed to submit assignment:", response.statusText);
            throw new Error("Failed to submit assignment");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Assignment submitted successfully:", data);
        })
        .catch((error) => {
          console.error("Error submitting assignment:", error);
          alert(`Failed to submit assignment. ${error.message}`);
        });
    }

    alert(
      editingIndex !== null ? "Assignment updated!" : "Assignment submitted!"
    );

    setLoading(false);
    fetchAssignments(); // Refresh the assignments list
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (index) => {
    const project = projects[index];
    setAssignmentId(project.assignmentid || project.assignmentId || "");
    setAppName(project.appname || project.appName || "");
    setQrCodeNumber(project.qrcodenumber || project.qrCodeNumber || "");
    setPassword(project.passwordhash || project.password || "");
    setStudentName(project.studentname || project.studentName || "");
    setCampID(project.campid || project.campID || "");
    setProgramID(project.programid || project.programID || "");
    setDescription(project.description || "");
    setFile(null);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const project = projects[index];
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      fetch(
        `${ASSIGNMENT_BASE}/instructor/delete/${project.assignmentid}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (!response.ok) {
            console.error("Failed to delete assignment:", response.statusText);
            throw new Error("Failed to delete assignment");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Assignment deleted successfully:", data);
          alert("Assignment deleted successfully!");
          fetchAssignments(); // Refresh the assignments list
        })
        .catch((error) => {
          console.error("Error deleting assignment:", error);
          alert(`Failed to delete assignment. ${error.message}`);
        });
    }
  };

  return (
    <div className="assignment-page">
      <div className="assignment-header-box">
        <h2>Assignments</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          ➕ Add New
        </button>
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
            <h3>
              {editingIndex !== null ? "Edit Assignment" : "New Assignment"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Student Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Camp ID</label>
                <input
                  type="number"
                  value={campID}
                  onChange={(e) => setCampID(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Program ID</label>
                <input
                  type="number"
                  value={programID}
                  onChange={(e) => setProgramID(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>App Name</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  required
                  disabled={editingIndex !== null}
                  s
                />
              </div>

              <div>
                <label>QR Code Number</label>
                <input
                  type="number"
                  value={qrCodeNumber}
                  onChange={(e) => setQrCodeNumber(e.target.value)}
                  required
                />
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
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div>
                <label>File Upload (optional)</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="modal-footer">
                {loading && (
                  <div className="spinner-container">
                    <div className="spinner"></div>
                    <span>Uploading...</span>
                  </div>
                )}

                <div className="modal-buttons">
                  <button type="submit" disabled={loading}>
                    {editingIndex !== null ? "Update" : "Submit"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowModal(false);
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
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
                  <p>
                    <strong>Student Name:</strong>{" "}
                    {project.studentname || project.studentName}
                  </p>
                  <p>
                    <strong>QR Number:</strong>{" "}
                    {project.qrcodenumber || project.qrCodeNumber}
                  </p>
                  <p>
                    <strong>App Name:</strong>{" "}
                    {project.appname || project.appName}
                  </p>
                  <p>
                    <strong>Game Snake ID:</strong>{" "}
                    {project.snakegameid || project.snakeGameId}
                  </p>
                  <p>
                    <strong>URL:</strong>{" "}
                    <a href={project.assignmenturl}>
                      {project.assignmenturl || project.assignmentUrl}
                    </a>
                  </p>
                </div>

                {/* {project.title && <h4>{project.title}</h4>}
              {project.description && <p>{project.description}</p>}
              {project.fileName && <p><strong>Uploaded File:</strong> {project.fileName}</p>} */}

                {/* {project.assignmenturl && (
                <p>
                  <a
                    href={project.assignmenturl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Assignment
                  </a>
                </p>
              )} */}
                {project.originalfile && (
                  <p>
                    <a
                      href={project.originalfile}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Original File
                    </a>{" "}
                    |{" "}
                    <a
                      href={project.editablefile}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Editable File
                    </a>
                  </p>
                )}

                <div className="action-buttons">
                  <button onClick={() => handleEdit(index)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
                  <button
                    key={project.qrcodenumber}
                    onClick={() => handleEditClick(project.qrcodenumber)}
                  >
                    📎 Editor
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentPage;
