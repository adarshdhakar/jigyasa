import React, { useState, useEffect } from 'react';

const AdminAddApplicant = () => {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicantId, setSelectedApplicantId] = useState('');

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch('http://localhost:5000/applicant/all');
        const data = await response.json();
        // Assuming the response has applicants array, adjust if your API differs
        setApplicants(data.applicants || []);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, []);

  const handleChange = (e) => {
    setSelectedApplicantId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedApplicantId) {
      alert('Please select an applicant');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/applicant/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicantId: selectedApplicantId }),
      });

      if (response.ok) {
        alert('Applicant accepted successfully!');
        setSelectedApplicantId('');
      } else {
        alert('Failed to accept applicant.');
      }
    } catch (error) {
      console.error('Error submitting applicant:', error);
      alert('Error occurred while submitting');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Select Applicant</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          value={selectedApplicantId}
          onChange={handleChange}
          style={styles.select}
          required
        >
          <option value="">-- Select Applicant --</option>
          {applicants.map((applicant) => (
            <option key={applicant._id} value={applicant._id}>
              {applicant.name}
            </option>
          ))}
        </select>
        <button type="submit" style={styles.button}>
          Accept Applicant
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '8px',
    backgroundColor: '#f7f9fc',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  select: {
    padding: '10px 12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#2980b9',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default AdminAddApplicant;
