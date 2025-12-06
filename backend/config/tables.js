const db = require('./connection');

module.exports.createTables = () => {
    
    // Create user table
    let table1 = "CREATE TABLE IF NOT EXISTS users (name VARCHAR(100), phone VARCHAR(20), email VARCHAR(255))";
    db.query(table1, (err, result) => {
        if (err) throw err;
        console.log("Users table created");
    })

    // Create reports table
    let table2 = "CREATE TABLE IF NOT EXISTS thyroid_reports (report_id INT NOT NULL AUTO_INCREMENT, patient_name VARCHAR(100), patient_age VARCHAR(10), patient_gender VARCHAR(10), file_name VARCHAR(100), file_path VARCHAR(255) UNIQUE, test_date DATE, tsh_level DECIMAL(10, 2), t3_level DECIMAL(10, 2), t4_level DECIMAL(10, 2), free_t3_level DECIMAL(10, 2), free_t4_level DECIMAL(10, 2), tpoab_level DECIMAL(10, 2), tgab_level DECIMAL(10, 2), vitamin_b12 DECIMAL(10, 2), calcium DECIMAL(10, 2), glycated_haemoglobin DECIMAL(10, 2), fasting_plasma_glucose DECIMAL(10, 2),interpretation TEXT, recommendations TEXT, additional_notes TEXT, hospital_name VARCHAR(200), hospital_contact VARCHAR(50), uploadedOn DATETIME DEFAULT NOW(), PRIMARY KEY (report_id))";
    // a file path field to be added for storing report file path
    db.query(table2, (err, result) => {
        if (err) throw err;
        console.log("Thyroid_reports table created");
    })
}
