import React, { useState, useEffect } from 'react'
import "./TestQuestion.css"
import Sidebar from '../Sidebar/Sidebar'
import IDE from '../IDE/IDE'
import CommonNavbar from '../CommonNavbar/CommonNavbar'
import axios from 'axios'
import ChatBot from '../ChatBot/ChatBot';

const TestQuestion = () => {
    const [problems, setProblems] = useState([]);
    const [selectedProblem, setSelectedProblem] = useState(null);
    useEffect(() => {
        const load = async () => {
            try {
                const API = "http://localhost:5000";
                const res = await axios.get(`${API}/api/questions`);
                console.log("Fetched questions (frontend):", res.data);
                setProblems(res.data);
            } catch (err) {
                console.error("Error loading questions:", err?.response?.data || err.message);
            }
        };
        load();
    }, []);
    return (
        <>
            <div>
                <div className='test_navbar_cnt'>
                    <div>
                        <CommonNavbar />
                        <Sidebar />
                        <ChatBot />
                    </div>
                </div>
            </div>
            <div className="test-question-container">
                {!selectedProblem ? (
                    <div>
                        <h2 className="title">Coding Problems</h2>
                        <ul className="problem-list">
                            {problems.map((p) => (
                                <li key={p._id} onClick={() => setSelectedProblem(p)} className="problem-card">
                                    <h3>{p.title}</h3>
                                    <p className="difficulty">Difficulty: {p.difficulty}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <IDE problem={selectedProblem} goBack={() => setSelectedProblem(null)} isTestMode={true} />
                )}
            </div>
        </>
    )
}

export default TestQuestion