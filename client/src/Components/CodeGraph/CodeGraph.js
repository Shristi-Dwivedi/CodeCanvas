import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import axios from "axios";
import "./CodeGraph.css";

const CodeGraph = ({ userId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/testHistory/my-history/${userId}`
        );

        console.log("Fetched test history:", res.data);

        const formatted = res.data.map((item, index) => ({
          name: item.questions[0]?.title || `Q${index + 1}`,
          grade: item.questions[0]?.score * 100,   // 1 → 100, 0 → 0
          displayGrade: item.grade,
          index: index
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error loading test graph:", err);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className="codegraph_cnt">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip
            formatter={(value, name, props) =>
              props.payload ? [props.payload.displayGrade, "Grade"] : [value]
            }
          />
          <Bar dataKey="grade" barSize={40} radius={[5, 5, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CodeGraph;
