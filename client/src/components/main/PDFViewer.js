//https://dev.to/danielasaboro/uploading-handling-and-storing-files-in-nodejs-using-multer-the-step-by-step-handbook-ob5
//https://dev.to/ndohjapan/file-upload-with-multer-node-js-ad-express-f1e
//https://www.linkedin.com/pulse/file-uploads-made-easy-multer-package-nodejs-vinayak-sharma/
//https://github.com/expressjs/multer/issues/302
//https://www.tutorialspoint.com/nodejs/pdf/nodejs_response_object.pdf
import { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import Dropzone from '../utils/Dropzone';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function Viewer() {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // State for storing info going to db
    const [formData, setFormData] = useState(null);

    // State for storing the path of uploaded file
    const [upload, setUpload] = useState(null);

    //State for storing attributes of report returned by AI
    const [attributes, setAttributes] = useState([]);

    //State for maintaining the File object
    const [file, setFile] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () => setPageNumber((prevPage) => prevPage - 1);
    const goToNextPage = () => setPageNumber((prevPage) => prevPage + 1);

    const reset = () => {
        setNumPages(null);
        setPageNumber(1);
        setFormData(null);
        setUpload(null);
        setAttributes([]);
        setFile(null);
    }

    useEffect(() => {
        if (upload !== null && attributes.length === 0) {
            axios.post('http://localhost:5000/extract-pdf-text', {
                filename: upload
            })
                .then((response) => {
                    let data = { ...response.data };
                    let form = {};
                    data.attributes.map(field => {
                        if (field.value === "null") form[field.id] = null;
                        else form[field.id] = field.value;
                    })
                    setFormData(form);
                    setAttributes([...data.attributes])
                })
                .catch(error => {
                    window.alert("Error occurred while parsing the PDF!");
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
                    reset();
                });
        }
    }, [upload, attributes])

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles.length == 0 || rejectedFiles.length > 0) {
            window.alert("Please check the uploaded file. Only one pdf file of maximum size 1MB can be uploaded");
        } else {
            let uploadForm = new FormData();
            uploadForm.append("file", acceptedFiles[0]);
            axios.post('http://localhost:8000/reports/upload', uploadForm, {
                headers: {
                    "Content-Type": "application/pdf"
                }
            })
                .then((response) => {
                    setUpload(response.data['filename']);
                    setFile(acceptedFiles[0]);
                })
                .catch(error => {
                    window.alert("Error occurred while uploading the PDF!");
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
                    reset();
                });
        };
    }, []);

    const updateForm = (event, field) => {
        let updatedForm = { ...formData };
        updatedForm[field] = event.target.value;
        setFormData(updatedForm);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/reports/create", {
            ...formData, name: file.name, path: upload
        })
            .then((response) => {
                reset();
            })
            .catch(error => {
                window.alert("Error occurred while creating project!");
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

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/reports/${upload}`)
            .then((response) => {
                reset();
            })
            .catch(error => {
                window.alert("Error occurred while discarding report changes!");
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

    return (
        <>
            {
                formData !== null ? (
                    (<div className="text-center">
                        <div className="row">
                            <div className="col p-5">
                                <form className='m-4 p-2 h-50 text-center d-flex flex-column 
                            justify-content-center border border-2' onSubmit={handleSubmit}>
                                    <div className='overflow-y-auto mb-2'>
                                        {
                                            attributes.map(field =>
                                                <div className="mb-3 d-flex flex-column px-2" key={`field-${field.id}`}>
                                                    <label htmlFor={`${field.id}`} className="form-label text-start">{field.id}</label>
                                                    <input type="text" className="form-control" value={`${formData[field.id] === null ? "" : formData[field.id]}`}
                                                        id={`${field.id}`} onChange={(event) => updateForm(event, field.id)}
                                                        disabled={formData[field.id] === null} />
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className='w-full text-end mt-2 px-1'>
                                        <button type="reset" className="btn btn-danger sticky-bottom me-2" onClick={handleDelete}>Discard</button>
                                        <button type="submit" className="btn btn-primary sticky-bottom">Validate</button>
                                    </div>
                                </form>
                            </div>

                            <div className="col-7 p-1" style={{ backgroundColor: "#F0F8FF" }}>
                                <nav>
                                    <button onClick={goToPrevPage}>Prev</button>
                                    <button onClick={goToNextPage}>Next</button>
                                </nav>

                                <div className='d-flex justify-content-center align-items-center'>
                                    <Document
                                        file={URL.createObjectURL(file)}
                                        onLoadSuccess={onDocumentLoadSuccess}
                                    >
                                        <Page pageNumber={pageNumber} renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                            customTextRenderer={false}
                                        />
                                    </Document>
                                </div>
                                <p>
                                    Page {pageNumber} of {numPages}
                                </p>
                            </div>
                        </div>
                    </div>)
                ) : (
                    <>
                        {
                            upload === null ? (
                                <div className='container text-center'>
                                    <img className='w-25 h-25 pt-5' src='./assets/Capture.png'></img>
                                    <div className='w-full border border-2 rounded bg-body-tertiary'>
                                        <Dropzone onDrop={onDrop} />
                                    </div>
                                </div>
                            ) : (
                                <div className='mt-4 d-flex flex-column justify-content-center align-items-center'>
                                    <h1>MediMinder is analyzing the data, please wait for 2 minutes ...</h1>
                                    <div className="spinner-border mt-4" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    );
}