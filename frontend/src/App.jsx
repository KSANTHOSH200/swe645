// src/App.jsx
import React, { useEffect, useState } from "react";
import api from "./api";
import SurveyForm from "./components/SurveyForm";
import SurveyList from "./components/SurveyList";

export default function App() {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  async function loadSurveys() {
    try {
      const res = await api.get("/surveys");
      setSurveys(res.data || []);
      setSelectedSurvey(null);
    } catch (err) {
      console.error("Failed to load surveys", err);
      alert("Error loading surveys. See console for details.");
    }
  }

  useEffect(() => {
    loadSurveys();
  }, []);

  function handleEdit(survey) {
    setSelectedSurvey(survey);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this survey?")) return;
    try {
      await api.delete(`/surveys/${id}`);
      await loadSurveys();
    } catch (err) {
      console.error("Failed to delete survey", err);
      alert("Error deleting survey. See console for details.");
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Student Survey</h1>
      <SurveyForm selectedSurvey={selectedSurvey} onSaved={loadSurveys} />
      <SurveyList
        surveys={surveys}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
