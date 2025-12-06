const db = require('../config/connection');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadFolder = 'G:\\Web Development\\QTIMinds\\qti\\medicare\\uploads';

module.exports.download = function (req, res) {
    try {
        const fileName = req.params.name;
        res.sendFile(uploadFolder + '\\' + fileName, fileName, (err) => {
            if (err) {
                res.status(500).sendFile({
                    message: "Could not download the file. " + err,
                });
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}

module.exports.delete = function (req, res) {
    try {
        const fileName = req.params.name;
        fs.unlink(uploadFolder + '\\' + fileName, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Could not delete the file. " + err,
                })
            }
            db.query(`DELETE FROM thyroid_reports where file_path="${fileName}"`,
                function (err, result) {
                    if (err) throw err;
                    console.log("Number of records deleted: " + result.affectedRows);
                }
            )
            return res.status(204).json({
                message: "File deleted successfully"
            })
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}

module.exports.getReports = function (req, res) {
    try {
        db.query("SELECT file_name, file_path FROM thyroid_reports",
            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                let files = [];
                Object.keys(result).forEach(function (key) {
                    let row = result[key];
                    files.push({ name: row.file_name, path: row.file_path });
                });
                return res.status(200).json({
                    message: "Report data fetched successfully!",
                    files: files
                })
            }
        );
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}

module.exports.create = function (req, res) {
    try {
        const data = { ...req.body }
        db.query(`INSERT INTO thyroid_reports (test_date, patient_name, patient_age, patient_gender, file_name, file_path, tsh_level, t3_level, t4_level, free_t3_level, free_t4_level, tpoab_level, tgab_level, vitamin_b12, calcium, glycated_haemoglobin, fasting_plasma_glucose, interpretation, recommendations, additional_notes, hospital_name, hospital_contact) VALUES (('${data.test_date}'), "${data.patient_name}", "${data.patient_age}", "${data.patient_gender}", "${data.name}", "${data.path}", ${getDecimal(data.tsh_level)}, ${getDecimal(data.t3_level)}, ${getDecimal(data.t4_level)}, ${getDecimal(data.free_t3_level)}, ${getDecimal(data.free_t4_level)}, ${getDecimal(data.tpoab_level)}, ${getDecimal(data.tgab_level)}, ${getDecimal(data.vitamin_b12)}, ${getDecimal(data.calcium)}, ${getDecimal(data.glycated_haemoglobin)}, ${getDecimal(data.fasting_plasma_glucose)},"${data.interpretation}", "${data.recommendations}", "${data.additional_notes}", "${data.hospital_name}", "${data.hospital_contact}")`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: err
                    })
                }
                console.log("Report row created");
                return res.status(200).json({
                    message: "Report data updated successfully!"
                })
            }
        );
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}

const getDecimal = (str) => {
    let ans = null;
    if(str !== null) {
        const match = str.match(/\d+(\.\d+)?/);
        if (match) {
            ans = parseFloat(match[0]);
        }
    }
    return ans;
}

const storage = multer.diskStorage({
    destination: function (_req, file, cb) {
        return cb(null, uploadFolder)
    },
    filename: function (_req, file, cb) {
        let origFileName = file.originalname.split('.')[0];
        let filename = origFileName + '-' + Date.now() + path.extname(file.originalname);
        return cb(null, filename)
    }
});

const upload = multer({ storage: storage }).single('file');

module.exports.uploadFile = function (req, res) {
    console.log("file received");
    try {
        upload(req, res, function (err) {
            if (err) {
                // A Multer error occurred when uploading.
                console.log('multer error: ', err);
                return res.status(500).json({
                    message: "Internal server error",
                    error: err
                })
            } else {
                return res.status(200).json({
                    message: "Report uploaded successfully!",
                    filename: res.req.file.filename
                })
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}