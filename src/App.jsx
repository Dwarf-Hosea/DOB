import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export const DOB = () => {
    const [name, setName] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!name) {
                if (!isFirstVisit) {
                    setError("Please enter a name");
                }
                setResults([]);
                return;
            }

            setError('');
            setLoading(true);
            setIsFirstVisit(false);

            try {
                // Perform search in the Supabase table with partial matching for the name
                let { data, error } = await supabase
                    .from('Date_of_birth') // Replace with your actual table name
                    .select('name, dob, register_number')
                    .ilike('name', `${name}%`); // `ilike` for case-insensitive matching

                if (error) throw error;

                if (data && data.length > 0) {
                    setResults(data);
                } else {
                    setResults([]);
                    setError('No matching user found.');
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setError('Error fetching data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [name]);

    const handleNameChange = (e) => {
        setName(e.target.value);
        setIsFirstVisit(false);
    };

    // Function to calculate department based on register number
    const getDeptFromRegNum = (regNum) => {
        let dept = "";
        
        // Ensure regNum is a string to avoid errors with slicing
        const regNumStr = regNum.toString().slice(0, 6); // Get first 6 digits as a string

        console.log("Register Number:", regNum);  // Debugging line to check the register number
        console.log("First 6 Digits:", regNumStr);  // Debugging line to check the sliced result

        switch (regNumStr) {
            case "221080":
                dept = "IT";
                break;

            case "221090":
                dept = "Mech";
                break;

            case "221030":
                dept = "BME";
                break;

            case "221040":
                dept = "Bio Tech";
                break;

            case "221070":
                dept = "ECE";
                break;

            case "221010":
                dept = "AGRI";
                break;

            case "221050":
            case "221060":
                dept = "CSE";
                break;
            case "221020":
                dept = "AI&DS"
                break;

            default:
                dept = "Unknown"; // Optional: set a default department if needed
                break;
        }

        return dept;
    };

    return (
        <div className="container">
            <header className="header">
                <h2>BDay Finder</h2>
            </header>
            <div className="input-container">
                <input
                    type="text"
                    name="name"
                    className="input-field"
                    placeholder="Search by Name"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="results-container">
                    {results.length > 0 ? (
                        <table className="results-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Register Number</th>
                                    <th>DOB (YYYY-MM-DD)</th>
                                    <th>Department</th>l
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((user, index) => {
                                    const dept = getDeptFromRegNum(user.register_number);
                                    return (
                                        <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.register_number}</td>
                                            <td>{user.dob}</td>
                                            <td>{dept}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-results">
                            <h3>No Results Found</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DOB;
