import React, { useState, useEffect, useContext } from 'react';
import "./LearningHistory.css";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import CommonNavbar from '../CommonNavbar/CommonNavbar';
import ChatBot from '../ChatBot/ChatBot';
import { AuthContext } from '../../context/AuthContext';

const LearningHistory = () => {
    const [watchedVideos, setWatchedVideos] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchWatchedVideos = async () => {
            if (!currentUser) {
                setWatchedVideos([]); // reset on logout
                return;
            }

            try {
                const res = await axios.get(
                    `http://localhost:5000/api/tutorials/watched/${currentUser.id}`
                );
                console.log("Watched videos API response:", res.data);
                setWatchedVideos(res.data);
            } catch (err) {
                console.error("Error fetching watched videos:", err);
                setWatchedVideos([]); // clear on fetch error
            }
        };

        fetchWatchedVideos();
    }, [currentUser]);

    return (
        <div className='learning_main_container'>
            {/* Always render Navbar, Sidebar, ChatBot */}
            <CommonNavbar />
            <Sidebar />
            <ChatBot />

            {/* Main content area */}
            <div className='video_history_container'>
                {!currentUser ? (
                    <p>Please login to see your learning history.</p>
                ) : watchedVideos.length === 0 ? (
                    <p>No videos watched yet. Start learning!</p>
                ) : (
                    <div className="video-list">
                        {watchedVideos.map((item) => (
                            <div className="video-card" key={item._id}>
                                {item.tutorialId?.VideoUrl ? (
                                    <div className="video-wrapper">
                                        <iframe
                                            src={item.tutorialId.VideoUrl}
                                            title={item.tutorialId.title}
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : (
                                    <p>No video available</p>
                                )}
                                <h4>{item.tutorialId?.title || "Untitled Video"}</h4>
                                <p>
                                    Watched on:{" "}
                                    {new Date(item.watchedAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LearningHistory;
