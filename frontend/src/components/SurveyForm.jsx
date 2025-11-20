import React, { useState, useEffect } from "react";
import api from "../api";

const initialForm = {
  first_name: "",
  last_name: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  survey_date: "",
  liked_most: "",
  how_interested: "",
  recommendation: "",
};

export default function SurveyForm({ selectedSurvey, onSaved }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (selectedSurvey) {
      setForm({
        ...selectedSurvey,
        survey_date: selectedSurvey.survey_date?.slice(0, 10),
      });
    } else {
      setForm(initialForm);
    }
  }, [selectedSurvey]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (selectedSurvey) {
        await api.put(`/surveys/${selectedSurvey.id}`, form);
      } else {
        await api.post("/surveys", form);
      }
      setForm(initialForm);
      onSaved();
    } catch (err) {
      console.error("Failed to save survey", err);
      alert("Error saving survey. See console for details.");
    }
  }

  function handleReset() {
    setForm(initialForm);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>{selectedSurvey ? "Edit Survey" : "New Survey"}</h2>

      <div>
        <label>First Name:&nbsp;</label>
        <input
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Last Name:&nbsp;</label>
        <input
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Street:&nbsp;</label>
        <input
          name="street"
          value={form.street}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>City:&nbsp;</label>
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>State:&nbsp;</label>
        <input
          name="state"
          value={form.state}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Zip:&nbsp;</label>
        <input
          name="zip"
          value={form.zip}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Phone:&nbsp;</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email:&nbsp;</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Survey Date:&nbsp;</label>
        <input
          type="date"
          name="survey_date"
          value={form.survey_date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>What did you like most?:&nbsp;</label>
        <select
          name="liked_most"
          value={form.liked_most}
          onChange={handleChange}
          required
        >
          <option value="">Select...</option>
          <option value="students">Students</option>
          <option value="location">Location</option>
          <option value="campus">Campus</option>
          <option value="atmosphere">Atmosphere</option>
          <option value="dorm rooms">Dorm Rooms</option>
          <option value="sports">Sports</option>
        </select>
      </div>

      <div>
        <label>How did you become interested?:&nbsp;</label>
        <input
          name="how_interested"
          value={form.how_interested}
          onChange={handleChange}
          placeholder="e.g. friends,television,internet"
          required
        />
      </div>

      <div>
        <label>Likelihood of Recommendation:&nbsp;</label>
        <select
          name="recommendation"
          value={form.recommendation}
          onChange={handleChange}
          required
        >
          <option value="">Select...</option>
          <option value="Very Likely">Very Likely</option>
          <option value="Likely">Likely</option>
          <option value="Unlikely">Unlikely</option>
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button type="submit">
          {selectedSurvey ? "Update Survey" : "Submit Survey"}
        </button>
        &nbsp;
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}
