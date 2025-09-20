// src/components/doctorNotesCreate/CreateDoctorNotes.jsx

import { useState } from "react";
import { useParams } from "react-router-dom";
import style from "./createDoctorNotes.module.css";
import { toast } from "react-hot-toast"; // ✅ Correct import

const CreateDoctorNotes = () => {
  const [noteContent, setNoteContent] = useState("");
  const [noteDetails, setNoteDetails] = useState(null);
  const { id: patientId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doctorId = sessionStorage.getItem("id");

    const payload = {
      doctor: { doctorId: parseInt(doctorId) },
      patient: { patientId: parseInt(patientId) },
      noteContent: noteContent.trim(),
    };

    try {
      const response = await fetch("http://localhost:8181/api/doctor-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Note successfully created! ✅");
        setNoteDetails(data);
        setNoteContent("");
      } else {
        toast.error("Failed to create note. ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className={style.createDoctorNoteContainer}>
      <h1>Create Doctor s Note</h1>
      <form onSubmit={handleSubmit} className={style.noteForm}>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Enter note content..."
          required
          className={style.textarea}
        ></textarea>
        <button type="submit" className={style.submitButton}>
          Submit Note
        </button>
      </form>

      {noteDetails && (
        <div className={style.noteDetails}>
          <h2>Note Created Successfully!</h2>
          <p>
            <strong>Note ID:</strong> {noteDetails.noteId}
          </p>
          <p>
            <strong>Doctor:</strong> {noteDetails.doctor.name} (
            {noteDetails.doctor.specialization})
          </p>
          <p>
            <strong>Patient:</strong> {noteDetails.patient.firstName}{" "}
            {noteDetails.patient.lastName}
          </p>
          <p>
            <strong>Note Content:</strong> {noteDetails.noteContent}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(noteDetails.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateDoctorNotes;
