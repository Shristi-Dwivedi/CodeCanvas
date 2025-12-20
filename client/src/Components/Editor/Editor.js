import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { csharp } from "@replit/codemirror-lang-csharp";
import "./Editor.css";
import logo from "../../Images/ProjectLogo.png"

const Editor = ({isTestMode = false , onRun}) => {
    const [code, setCode] = useState(`console.log("Hello JS");`);
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("63");

    // Run code function

     const runCode = async () => {
        if (!isTestMode) setOutput("Running your code...");
        setOutput("Compiling Program ...");

        try {
            const response = await fetch(
                "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                        "X-RapidAPI-Key": "c2592392c7mshbae99beb834b9fcp1416efjsn1f7931aabb5f",
                    },
                    body: JSON.stringify({
                        language_id: language,
                        source_code: code,
                    }),
                }
            );

            const result = await response.json();
            const userOutput = result.stdout || result.compile_output || result.stderr || "No output returned.";

            if (isTestMode) {
                if(onRun) onRun(userOutput);
            } else {
                setOutput(userOutput);
                if (onRun) onRun(userOutput);
            }
        } catch (error) {
            const errMsg = "Execution failed: " + error.message;
            if (isTestMode) onRun(errMsg);
            else setOutput(errMsg);
        }
    };

    const changeLanguage = {
        "63": {
            ext: javascript(),
            template: `console.log("Hello, JavaScript!");`,
        },
        "71": {
            ext: python(),
            template: `print("Hello, Python!")`,
        },
        "51": {
            ext: csharp(),
            template: `using System;
public class Program
{
    public static void Main()
    {
        Console.WriteLine("Hello, C#!");
    }
}`,
        },
    };

    const handleLanguageChange = (e) => {
        const langId = e.target.value;
        setLanguage(langId);
        setCode(changeLanguage[langId].template);
    };
    return (
        <>
        <div className="main-ide">
            <div className="ide-container">
                {/* Top Navbar */}
                <div className="top-bar">
                    <span><img src={logo} className="logo" alt=""></img>  CodeCanvas : A Learning IDE</span>
                    <div>
                        <select value={language} onChange={handleLanguageChange} className="lang-select">
                            <option value="63">JavaScript</option>
                            <option value="71">Python</option>
                            <option value="51">C#</option>
                        </select>
                        <button onClick={runCode} className="run-btn">▶ Run</button>
                    </div>
                </div>

                {/* Code Editor */}
                <div className="editor-area">
                    <CodeMirror
                        key={language}
                        value={code}
                        height="60vh"
                        theme="dark"
                        extensions={[changeLanguage[language].ext]}
                        onChange={(value) => setCode(value)}
                        className="code-editor"
                        isTestMode={false}
                    />
                </div>

                {/* Terminal */}
                <div className="terminal">
                    <h3>Output:</h3>
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
        </>
    )
}

export default Editor;