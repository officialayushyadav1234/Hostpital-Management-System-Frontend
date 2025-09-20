import { useState, useEffect } from "react";
import axios from "axios";
import style from "./patientAllMedicalReports.module.css";
import { useParams } from "react-router-dom";

const PatientAllMedicalReports = () => {
  const [notes, setNotes] = useState([]);
  const [expandedNote, setExpandedNote] = useState(null);
  const { id: patientId } = useParams(); // Fix for useParams() to use 'id'

  useEffect(() => {
    axios
      .get(`http://localhost:8181/api/doctor-notes/patient/${patientId}`)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor notes:", error);
      });
  }, [patientId]);

  const toggleNoteContent = (noteId) => {
    setExpandedNote(expandedNote === noteId ? null : noteId);
  };

  return (
    <div className={style.doctorNoteContainer}>
      <h1>
        All Medical Report of {notes.length > 0 ? notes[0].doctor.name : ""}
      </h1>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Specialization</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {notes.length === 0 ? (
            <tr>
              <td colSpan="6">No notes available for this patient.</td>
            </tr>
          ) : (
            notes.map((note) => (
              <tr key={note.noteId}>
                <td>{note.doctor.name}</td>
                <td>{note.doctor.specialization}</td>
                <td>
                  {note.patient.firstName} {note.patient.lastName}
                </td>
                <td>{new Date(note.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => toggleNoteContent(note.noteId)}>
                    {expandedNote === note.noteId ? "Hide" : "Show"}
                  </button>
                  {expandedNote === note.noteId && <p>{note.noteContent}</p>}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientAllMedicalReports;
