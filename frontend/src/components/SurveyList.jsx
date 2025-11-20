import React from "react";

export default function SurveyList({ surveys, onEdit, onDelete }) {
  return (
    <div>
      <h2>Existing Surveys</h2>
      {surveys.length === 0 ? (
        <p>No surveys yet.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>State</th>
              <th>Date</th>
              <th>Liked Most</th>
              <th>Recommendation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>
                  {s.first_name} {s.last_name}
                </td>
                <td>{s.city}</td>
                <td>{s.state}</td>
                <td>{s.survey_date?.slice(0, 10)}</td>
                <td>{s.liked_most}</td>
                <td>{s.recommendation}</td>
                <td>
                  <button onClick={() => onEdit(s)}>Edit</button>
                  &nbsp;
                  <button onClick={() => onDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
