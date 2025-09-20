import { useState, useEffect } from "react";
import axios from "axios";
import style from "./DoctorNote.module.css";
import { jsPDF } from "jspdf";

const DoctorNote = () => {
  const [notes, setNotes] = useState([]);
  const [expandedNote, setExpandedNote] = useState(null);
  const patientId = sessionStorage.getItem("id");

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

  const handlePrint = () => {
    if (expandedNote) {
      const note = notes.find((n) => n.noteId === expandedNote);
      if (note) {
        const doc = new jsPDF();
        doc.text("Doctor Notes", 20, 10);
        doc.text(
          `Doctor: ${note.doctor.name}, Specialization: ${note.doctor.specialization}`,
          20,
          20
        );
        doc.text(
          `Patient: ${note.patient.firstName} ${note.patient.lastName}`,
          20,
          30
        );
        doc.text(`Date: ${new Date(note.createdAt).toLocaleString()}`, 20, 40);
        doc.text(`Note: ${note.noteContent}`, 20, 50);
        doc.save(
          `Patient ${note.patient.firstName} ${note.patient.lastName} Report ${note.doctor.name} ${note.doctor.specialization}.pdf`
        );
      }
    }
  };

  return (
    <div className={style.doctorNoteContainer}>
      <h1>Patient Reports</h1>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Specialization</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
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
              <td>
                <button onClick={handlePrint}>Print / Download PDF</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorNote;
