import React, { useState } from "react";

function Quiz({ onSubmit }) {
    const [answers, setAnswers] = useState({ ie: "", sn: "", tf: "", jp: "" });

    const questions = [
        { key: "ie", text: "The Homecoming Parade is Today! Are you on Tiger Ave, lively with the crowd? Or are you at a quieter spot with a few friends?", options: ["Lively with the crowd!", "Finding a quieter spot with a few friends!"] },
        { key: "sn", text: "What a parade! It's time to eat! Are you hitting a classic, like Shakespeare's? Or are you finding a hidden gem for lunch?", options: ["The Classics! Shakespeare's Pizza!", "Let's explore something new and find a gem!"] },
        { key: "tf", text: "You're helping set up for an afternoon event. Are you making sure everything runs smoothly? Or are you connecting with people and keeping spirits high?", options: ["Keeping it running smoothly!", "Keeping the spirits high and connecting with others!"] },
        { key: "jp", text: "It's almost evening in Columbia. Are you sticking with your plan? Or were you always going with the flow?", options: ["Gotta go with the plan!", "Plan? We're going with the flow!"] }
    ];

    //map options to I/E, S/N, T/F, J/P
    //keys are questions, values are underlying mbti
    const map = {
        "Lively with the crowd!" : "E",
        "Finding a quieter spot with a few friends!" : "I",
        "The Classics! Shakespeare's Pizza!" : "S",
        "Let's explore something new and find a gem!" : "N",
        "Keeping it running smoothly!" : "T",
        "Keeping the spirits high and connecting with others!" : "F",
        "Gotta go with the plan!" : "J",
        "Plan? We're going with the flow!" : "P"
    };

    //[key] : map[value] uses questions key, and maps the selected option to the underlying value using dict
    const handleSelect = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: map[value] }));
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
                                //compare answers array values to mapped option values, update color on click
                                backgroundColor: answers[q.key] === map[option] ? "grey" : "white"
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