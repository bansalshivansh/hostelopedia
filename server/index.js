require("dotenv").config();
const {execSync} = require("node:child_process");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());

app.post("/search", async (req, res) => {
    try {
        const query = req.query;
        const hostelName = query.hostelName || null;
        const priceRange = query.priceRange || null;
        const location = query.location || null;
        const gender = query.gender || null;

        // Use the virtual environment Python executable
        const pythonDir = path.join(__dirname, "../python");
        const pythonExe = path.join(__dirname, "../.venv/Scripts/python.exe");
        
        // Build Python command with only non-null filter parameters
        let pythonArgs = hostelName ? `"${hostelName}"` : `"null"`;
        if (priceRange) pythonArgs += ` "${priceRange}"`;
        else pythonArgs += ` "null"`;
        
        if (location) pythonArgs += ` "${location}"`;
        else pythonArgs += ` "null"`;
        
        if (gender) pythonArgs += ` "${gender}"`;
        else pythonArgs += ` "null"`;
        
        const processRes = execSync(`"${pythonExe}" new.py ${pythonArgs}`, {
            cwd: pythonDir, 
            encoding: "utf-8",
            stdio: ["pipe", "pipe", "pipe"]
        });
        
        const output = processRes.trim().split("\n").filter(line => line.trim() && !line.startsWith("#"));
        
        // Map all results (no limit)
        const neededOutput = output.map((line) => {
            const parts = line.split(",");
            const [hostelName, location, rating, price, gender] = parts;
            return {hostelName, location, rating, price, gender};
        });
        
        return res.json(neededOutput);
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
})

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
    console.log(`Started server on Port ${PORT} (${NODE_ENV})`)
})

