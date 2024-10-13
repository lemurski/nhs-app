import { useState } from "react";
import Range from "./Range";
import YesNo from "./yes-no";
import { Button } from "./ui/button";
import { supabase } from "./supabaseClient";
import MultipleChoice from "./multiple-choice";
import { useQuery } from "@tanstack/react-query";

export default function Questions({ day, questions, patientId }) {
  const filteredQuestions = questions.filter(
    (question) => question.day === day
  );

  const event_day_ids = filteredQuestions.map(
    (question) => question.event_day_id
  );

  const [formData, setFormData] = useState({});

  const handleInputChange = (eventDayId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [eventDayId]: value,
    }));
  };

  const { data: existingResponses, isLoading } = useQuery({
    queryKey: ["patientResponses", patientId, event_day_ids],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Event_Patient")
        .select("*")
        .eq("Patient_id", patientId)
        .in("Event_day_id", event_day_ids);

      if (error) throw error;

      // Convert the array of responses to an object keyed by Event_day_id
      return data.reduce((acc, response) => {
        acc[response.Event_day_id] =
          response.Yes_No !== null ? response.Yes_No : response.MultipleAnswer;
        return acc;
      }, {});
    },
  });

  console.log(existingResponses);

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const [eventDayId, value] of Object.entries(formData)) {
      try {
        const { data, error } = await supabase.from("Event_Patient").upsert({
          Patient_id: patientId,
          Event_day_id: parseInt(eventDayId),
          Yes_No: typeof value === "boolean" ? value : null,
          MultipleAnswer: typeof value === "string" ? value : null,
          isCompleted: true,
        });

        if (error) throw error;
      } catch (error) {
        console.error("Error updating Event_Patient:", error);
        alert(`Failed to save response for question ${eventDayId}`);
      }
    }

    alert("All responses saved successfully!");
  };

  const event_day = filteredQuestions.map((question) => {
    return question.event_day_id;
  });

  console.log(event_day);

  return (
    <div className="w-full flex flex-col h-full space-y-8 ">
      <h2 className="text-black text-2xl font-semibold">Questions</h2>

      {filteredQuestions.map((question) => {
        const { id, event, event_day_id } = question;
        const { Title, Description, Input_type } = event;

        const value = existingResponses
          ? existingResponses[event_day_id]
          : undefined;

        if (Input_type === "Y/N") {
          const { Yes_output, No_output } = event;

          return (
            <YesNo
              key={id}
              title={Title}
              Yes_output={Yes_output}
              No_output={No_output}
              description={Description.replace(/^"|"$/g, "")}
              event={event_day_id}
              value={value}
              onChange={(value) => handleInputChange(event_day_id, value)}
            />
          );
        } else if (Input_type === "Multiple") {
          const {
            Choice_1,
            Choice_2,
            Choice_3,
            Choice_1_output,
            Choice_2_output,
            Choice_3_output,
          } = event;
          return (
            <MultipleChoice
              key={id}
              Choice_1={Choice_1}
              Choice_1_output={Choice_1_output}
              Choice_2={Choice_2}
              Choice_2_output={Choice_2_output}
              Choice_3={Choice_3}
              Choice_3_output={Choice_3_output}
              title={Title}
              description={Description}
              onChange={(value) => handleInputChange(event_day_id, value)}
              value={value}
            />
          );
        } else {
          return null;
        }
      })}
      <Button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-500/80 py-7 !mb-40 "
      >
        Submit
      </Button>
    </div>
  );
}
