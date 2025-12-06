import { useDropzone } from "react-dropzone";

export default function Dropzone({ onDrop }) {
    const { getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDrop: onDrop,
        maxFiles: 1,
        maxSize: 2097152,
        accept: {
            'application/pdf': ['.pdf']
        }
    });

    return (
        <div {...getRootProps({ className: "dropzone" })} className="
        d-flex justify-content-center align-items-center">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center pt-3 pb-6">
                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">Drag & Drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF (max size 2 MB)</p>
                <button type="button" onClick={open} className="btn btn-primary mb-3">Click to upload</button>
            </div>
        </div>
    )
}