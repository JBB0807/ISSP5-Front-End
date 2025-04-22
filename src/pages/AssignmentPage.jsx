// Page - Assignment
import { useEffect, useState } from 'react';
import '../scss/styles.scss';

const AssignmentPage = () => {
    const [files, setFiles] = useState([]);
    
    useEffect(() => {
        document.title = 'Assignment';
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
        }
    };

    const handleRemoveFile = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the files to a server
        console.log('Files to submit:', files);
        alert('Assignment submitted successfully!');
    };

    return (
        <main className="assignment-page">
            <section>
                <div className="assignment-header">
                    <h2>Assignment Submission</h2>
                    <div className="due-date">
                        <p>Due on Jan 16, 2025 11:59 PM</p>
                    </div>
                </div>
                
                <div className="assignment-container">
                    <div className="assignment-info">
                        <h3>Submit Assignment</h3>
                        <p className="files-count">({files.length}) file(s) to submit</p>
                        <p className="submission-note">After uploading, you must click Submit to complete the submission.</p>
                    </div>
                    
                    <div className="file-upload-section">
                        <div className="upload-buttons">
                            <label className="file-upload-btn">
                                <input 
                                    type="file" 
                                    multiple 
                                    onChange={handleFileChange} 
                                    style={{ display: 'none' }}
                                />
                                Add a File
                            </label>
                            <button className="record-audio-btn">Record Audio</button>
                            <button className="record-video-btn">Record Video</button>
                        </div>
                        
                        {files.length > 0 && (
                            <div className="files-list">
                                <h4>Selected Files:</h4>
                                <ul>
                                    {files.map((file, index) => (
                                        <li key={index} className="file-item">
                                            <span className="file-name">{file.name}</span>
                                            <span className="file-size">({(file.size / 1024).toFixed(2)} KB)</span>
                                            <button 
                                                className="remove-file-btn"
                                                onClick={() => handleRemoveFile(index)}
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    
                    <div className="comments-section">
                        <h4>Comments</h4>
                        <textarea 
                            placeholder="Add a comment (optional)"
                            rows="4"
                        ></textarea>
                    </div>
                    
                    <div className="submission-buttons">
                        <button 
                            className="submit-btn"
                            onClick={handleSubmit}
                            disabled={files.length === 0}
                        >
                            Submit
                        </button>
                        <button className="cancel-btn">Cancel</button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AssignmentPage;
