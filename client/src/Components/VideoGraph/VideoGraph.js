import React, { useEffect, useState, useContext } from "react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import "./VideoGraph.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; 

const COLORS = ["#8884d8", "#82ca9d"];

const VideoGraph = () => {
    const { currentUser } = useContext(AuthContext); 
    const [watchedCount, setWatchedCount] = useState(0);
    const [totalVideos, setTotalVideos] = useState(8);

    useEffect(() => {
        if (!currentUser) {
            setWatchedCount(0); 
            return;
        }

        axios.get(`http://localhost:5000/api/tutorials/stats/${currentUser.id}`)
            .then(res => setWatchedCount(res.data.watchedCount))
            .catch(err => console.error("Error fetching stats:", err));
    }, [currentUser]); 

    const chartData = [
        { name: "Watched", value: watchedCount },
        { name: "Remaining", value: Math.max(totalVideos - watchedCount, 0) }
    ];

    return (
        <div className="chart-container">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name} - ${value}`}
                        isAnimationActive={true}
                        animationDuration={2000}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                stroke="#fff"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VideoGraph;
