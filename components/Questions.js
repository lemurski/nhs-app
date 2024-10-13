import { useState } from "react";
import Range from "./Range";
import YesNo from "./yes-no";

export default function Questions({ day, questions, patientId }) {
  const filteredQuestions = questions.filter(
    (question) => question.day === day
  );

  const [formData, setFormData] = useState({});

  const handleInputChange = (eventDayId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [eventDayId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const [eventDayId, value] of Object.entries(formData)) {
      try {
        const { data, error } = await supabase.from("Event_Patient").upsert(
          {
            Patient_id: patientId,
            Event_day_id: parseInt(eventDayId),
            Yes_No: typeof value === "boolean" ? value : null,
            Rating: typeof value === "number" ? value : null,
            isCompleted: true,
          },
          {
            onConflict: ["Patient_id", "Event_day_id"],
            returning: "minimal",
          }
        );

        if (error) throw error;
      } catch (error) {
        console.error("Error updating Event_Patient:", error);
        alert(`Failed to save response for question ${eventDayId}`);
      }
    }

    alert("All responses saved successfully!");
  };

  console.log({formData})

  console.log(filteredQuestions);

  return (
    <div className="w-full flex flex-col space-y-4 ">
      {filteredQuestions.map((question) => {
        const { id, event, event_day_id } = question;
        const { Title, Description, Input_type } = event;

        if (Input_type === "Y/N") {
          return (
            <YesNo
              key={id}
              title={Title}
              description={Description.replace(/^"|"$/g, "")}
              event={event_day_id}
              onChange={(value) => handleInputChange(event_day_id, value)}

            />
          );
        } else if (Input_type === "Rating") {
          return (
            <Range
              key={id}
              title={Title}
              description={Description.replace(/^"|"$/g, "")}
              event={event_day_id}
              onChange={(value) => handleInputChange(id, value)}

            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
