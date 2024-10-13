import { useState } from "react";
import CheckTask from "./check-box";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { supabase } from "./supabaseClient";
import { useQuery } from "@tanstack/react-query";

export default function Tasks({ tasks, day, patientId }) {
  const filteredTasks = tasks.filter((task) => task.day === day);
  const [formData, setFormData] = useState({});
  const event_day_ids = filteredTasks.map((question) => question.event_day_id);

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
        acc[response.Event_day_id] = response.isCompleted
          ? response.isCompleted
          : undefined;
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

  return (
    <div className="w-full space-y-8 h-full flex flex-col">
      <h2 className="text-black text-2xl font-semibold">Tasks</h2>
      {filteredTasks.map((task) => {
        const { id, event, event_day_id } = task;
        const { Task_output, Title, Description } = event;

        const value = existingResponses
          ? existingResponses[event_day_id]
          : undefined;

        return (
          <CheckTask
            key={id}
            description={Description}
            title={Title}
            Task_output={Task_output}
            onChange={(value) => handleInputChange(event_day_id, value)}
            value={value}
          />
        );
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
