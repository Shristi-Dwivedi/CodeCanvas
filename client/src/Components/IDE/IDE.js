import React, { useState } from "react";
import Editor from "../Editor/Editor";
import "./IDE.css";
import axios from "axios";

const IDE = ({ problem, goBack, isTestMode }) => {
    const [output, setOutput] = useState("");
    const [grade, setGrade] = useState("");

    const handleRun = async (userOutput) => {
        setOutput(userOutput);

        if (isTestMode) {
            let newGrade = userOutput.toString().trim() === problem.expectedOutput.trim() ? "A" : "F";
            setGrade(newGrade);

            const userId = localStorage.getItem("userId");
            if (!userId) {
                console.error("No logged-in user found!");
                return;
            }

            // Save in localStorage (optional)
            const gradesKey = `grades_${userId}`;
            const prevGrades = JSON.parse(localStorage.getItem(gradesKey)) || [];
            prevGrades.push({
                questionId: problem._id,
                grade: newGrade,
                timestamp: new Date().toLocaleString(),
                userId: userId,
            });
            localStorage.setItem(gradesKey, JSON.stringify(prevGrades));

            // Preparing payload for backend
            const payload = {
                userId,
                grade: newGrade,
                questions: [
                    {
                        questionId: problem._id,
                        title: problem.title,
                        score: newGrade === "A" ? 1 : 0
                    }
                ]
            };

            console.log("Payload to backend:", payload);

            // Save in MongoDB
            try {
                const response = await axios.post(
                    "http://localhost:5000/api/testHistory",
                    payload
                );
                console.log("Test history saved:", response.data);
            } catch (err) {
                console.error("Error saving test history:", err);
            }
        } else {
            setGrade(
                userOutput.toString().trim() === problem.expectedOutput.trim()
                    ? "Correct! Grade: A"
                    : "Wrong! Grade: F"
            );
        }
    };

    return (
        <div className="hackathon-ide">
            <div className="main_ide_cnt">
                <div className="ide-container">
                    <button onClick={goBack} className="back-btn">
                        ← Back to Problems
                    </button>

                    <h2 className="problem-title">{problem.title}</h2>
                    <pre style={{ whiteSpace: "pre-wrap", color: "white", fontSize: "16px" }}>
                        {problem.description}
                    </pre>
                    <p className="info">Input: {problem.input}</p>
                    <pre style={{ whiteSpace: "pre-wrap", color: "white", fontSize: "16px" }}>
                        Expected Output: {problem.expectedOutput}
                    </pre>

                    <div className="editor_box">
                        <Editor onRun={handleRun} isTestMode={isTestMode} />
                    </div>

                    <div className="output-box">
                        <div className="output-grade-row">
                            <p>Your Output: <span>{output}</span></p>
                            {isTestMode && <p className="grade">Grade: {grade}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IDE;
