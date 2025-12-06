import { useState, useEffect } from 'react';
import axios from 'axios';
export default function Uploads() {

    const [reports, setReports] = useState(null)

    const deleteReport = (filename) => {
        axios.delete(`http://localhost:8000/reports/${filename}`)
            .then((response) => {
                let updatedReports = reports.filter(file=> file.path !== filename);
                setReports([...updatedReports]);
            })
            .catch(error => {
                window.alert("Error occurred while deleting report!");
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
            })
    }

    const download = (filename) => {
        axios.get(`http://localhost:8000/reports/${filename}`,
            {
                responseType: "blob",
            }
        )
            .then(res => {
                const pdfBlob = new Blob([res.data], { type: "application/pdf" });
                let url = URL.createObjectURL(pdfBlob);
                window.open(url, '_blank').focus();
            })
            .catch(error => {
                window.alert("Error occurred while getting reports!");
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
    }

    useEffect(() => {
        axios.get('http://localhost:8000/reports')
            .then((response) => {
                let data = { ...response.data };
                setReports([...data.files]);
            })
            .catch(error => {
                window.alert("Error occurred while getting reports!");
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
    }, [])

    return (
        <>
            {
                reports === null ? (
                    <div className='mt-4 d-flex justify-content-center align-items-center'>
                        <h2 className='p-3'>Loading the reports..</h2>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    reports.length === 0 ? (
                        <div className='mt-4 d-flex justify-content-center align-items-center'>
                            <h2 className='p-3'>There are no reports to display..</h2>
                        </div>
                    ) : (
                        <div className='p-4'>
                            <h3 className='m-3'>Here are my uploaded reports: </h3>
                            <div className='m-3 p-2'>
                                <div className="list-group">
                                    {
                                        reports.map(report =>
                                            <div className='d-flex justify-content-between list-group-item list-group-item-light list-group-item-action'>
                                                <span className='p-1 fw-normal fs-5'>{report.name}</span>
                                                <div className=''>
                                                    <button type="button" className="btn btn-primary me-2" onClick={() => download(report.path)}>Download</button>
                                                    <button type="button" className="btn btn-danger" onClick={() => deleteReport(report.path)}>Delete</button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                    )
                )
            }
        </>
    )
}