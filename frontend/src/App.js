import React, { useState } from "react";
import Quiz from "./components/Quiz";


function App() {
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizResults, setQuizResults] = useState([]); // Store all past results
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'; // Default for local dev

    const fetchAllResults = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/quiz-results`);
            const data = await response.json();
            setQuizResults(data.length ? data : []);
        } catch (error) {
            console.error("Fetch error:", error);
            setMessage(`Server error, please try again. Details: ${error.message}`);
        }
    };
    
    const handleQuizSubmit = async (personalityType) => {
        if (!userName.trim()) {
            alert("Please enter your name.");
            return;
        }
    
        try {
            console.log("📌 Sending request to backend...");
            const formattedAnswers = typeof personalityType === "string" ? personalityType.split("") : personalityType;
    
            const submitResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/submit-quiz`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: userName, answers: formattedAnswers })
            });
    
            if (!submitResponse.ok) {
                const errorText = await submitResponse.text();
                console.error("🔥 Backend Error:", errorText);
                throw new Error(`Error submitting quiz: ${submitResponse.status} - ${errorText}`);
            }
    
            const responseData = await submitResponse.json();
            console.log("✅ Backend Response:", responseData);
            setMessage(`Your Personality Type: ${responseData.result}`);
    
            await fetchAllResults();
            setTimeout(() => setShowQuiz(false), 100);
        } catch (error) {
            console.error("Fetch error:", error);
            setMessage(`Server error, please try again. Details: ${error.message}`);
        }
    };

    //create account
    const handleCreateAccountSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if(!response.ok) {
                throw new Error("Couldn't create an account")
            }

            setLoading(false)

        }
        catch (err){
            setLoading(false)
            console.error("Error creating Account")
        }
    };

    return (
        //class = "mainContainer" holds css for SPA
        <div class="mainContainer">
            <h1>Welcome to Tiger Traits!</h1>
            <div>
            <p>Turning Traits into Connections</p>
            </div>
            
            {showCreateAccountForm ?(
                <div>
                    <h1>Create an Account</h1>
                    <form onSubmit={handleCreateAccountSubmit}>
                    <input type= "text" name = "name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/> <br/> <br/>
                    <input type= "email" name = "email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/> <br/> <br/>
                    <input type= "password" name = "password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/> <br/> <br/>
                    <button onClick={handleCreateAccountSubmit}>Submit</button><br/><br/>
                    <button onClick={()=> setShowCreateAccountForm(false)}>Cancel</button>
                    </form>
                </div>
        
            ) : showQuiz ? (
                <Quiz onSubmit={handleQuizSubmit} />
            ):(
                <>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <button onClick={() => { 
                        setShowQuiz(true); 
                        setMessage(""); // ✅ Clear previous personality type
                    }}>Start Quiz</button>
                    <button onClick={fetchAllResults} style={{ marginLeft: "10px" }}>View All Previous Entries</button>
                    <button onClick={() => setShowCreateAccountForm(true)}>Create an account</button>
                </>
            )}
            {message && <h2>{message}</h2>}

            {!showQuiz && quizResults.length > 0 && (
                <div>
                    <h2>All Previous Quiz Results</h2>
                    <ul>
                        {quizResults.map((entry, index) => (
                            <li key={index}>
                                🟢 <strong>{entry.name}</strong>: {entry.result} 
                                {" "}
                                <em>({new Date(entry.timestamp).toLocaleString()})</em>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
}

export default App;