import React, { useState } from "react";

function Quiz({ onSubmit }) {
    const [answers, setAnswers] = useState({ ie: "", sn: "", tf: "", jp: "" });

    const questions = [
        { key: "ie", text: "Are you an Introvert (I) or an Extrovert (E)?", options: ["I", "E"] },
        { key: "sn", text: "Do you rely more on Sensing (S) or Intuition (N)?", options: ["S", "N"] },
        { key: "tf", text: "Do you make decisions based on Thinking (T) or Feeling (F)?", options: ["T", "F"] },
        { key: "jp", text: "Do you prefer Judging (J) or Perceiving (P)?", options: ["J", "P"] }
    ];

    const handleSelect = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        if (Object.values(answers).includes("")) {
            alert("Please answer all questions.");
            return;
        }

        const personalityType = `${answers.ie}${answers.sn}${answers.tf}${answers.jp}`;
        onSubmit(personalityType);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
            <h2>Personality Quiz</h2>
            {questions.map(q => (
                <div key={q.key} style={{ marginBottom: "15px" }}>
                    <p>{q.text}</p>
                    {q.options.map(option => (
                        <button
                            key={option}
                            onClick={() => handleSelect(q.key, option)}
                            style={{
                                margin: "5px",
                                padding: "10px",
                                fontSize: "16px",
                                backgroundColor: answers[q.key] === option ? "lightblue" : "white"
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            ))}
            <br />
            <button onClick={handleSubmit} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "18px" }}>
                Submit
            </button>
        </div>
    );
}

export default Quiz;