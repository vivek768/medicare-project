import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <div style={{
                backgroundImage: 'url("./assets/homepage.jpg")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "92vh",
            }} className="container-fluid">

                <div className="h-75 d-flex flex-column justify-content-center align-items-center">
                    <p className="w-75 pt-5 text-white fw-semibold fs-3 text-center"
                        style={{ textShadow: "5px 5px 5px #0047AB" }}>
                        MediMinder - a powerful AI tool that answers all your health related questions.
                        This app analyzes medical reports to retrieve the diagnosis,
                        prognosis and medications specified in the reports.
                    </p>
                    <div className="text-center border border-2 rounded mt-5">
                        <Link to="/upload" className="btn fs-4 text-white px-5" style={{ backgroundColor: "#0047AB" }}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}