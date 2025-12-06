//https://medium.com/@zeshanshakil0/lets-create-ai-chatbot-from-scratch-in-reactjs-223ff435f740
import { useEffect, useState } from "react";
import axios from "axios";
// import '../../stylesheet/chatbot.css';
export default function Dashboard() {

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [graph, setGraph] = useState(null);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post('http://localhost:5000/query', {
            query: input
        })
            .then((res) => {
                setResponse(res.data.answer);
            })
            .catch(error => {
                window.alert("Error occurred while getting the answer!");
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    };

    const handleReset = (e) => {
        e.preventDefault();
        setResponse(null);
        setLoading(false);
        setInput('');
    }

    useEffect(() => {
        axios.get('http://localhost:5000/data')
            .then((res) => {
                setGraph([...res.data]);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }, []);

    return (
        <>
            <div className="text-center">
                {
                    graph === null ?
                        <div className="spinner-border mt-4" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> : (<>
                            {
                                graph.map(plot =>
                                    <img className="mt-3" style={{ width: "50%" }} src={`data:image/png;base64,${plot}`}></img>
                                )
                            }
                        </>
                        )
                }
            </div>

            <div className="border m-3 p-2 border-3 rounded bg-light">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" className="form-control me-2 rounded"
                            value={input} onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your health related query..." />
                        <button className="btn btn-primary rounded me-1 fw-semibold"
                            type="submit" onClick={handleSubmit}>
                            Send
                        </button>
                        <button className="btn btn-danger fw-semibold rounded"
                            type="rest" onClick={handleReset}>
                            Clear
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    {
                        response !== null ?
                            <p className="text-start mt-1 p-1 overflow-y-scroll">
                                {response}
                            </p> : loading === true ? (
                                <div className="spinner-border mt-4" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                <img src="./assets/ai.PNG" style={{ width: "7%", opacity: "0.2" }}></img>
                            )
                    }
                </div>
            </div>
        </>
    );
}