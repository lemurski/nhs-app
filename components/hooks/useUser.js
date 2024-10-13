import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export default function useUser() {

  let patientId = null

  if (typeof window !== 'undefined') {
    patientId = localStorage.getItem('patientId')
} else {
    console.log('we are running on the server');
}

  const fetchPatients = async () => {
    const { data, error } = await supabase
      .from("Patient")
      .select(
        "Patient_id, First_Name, Last_Name, NHS_id, Patient_Process (id, Process_id, Start_date, Process (id, Title, Assigned_Event (id, Event_Day_id, Event_Day (id, Event_id, Day, Event (id, Title, Description, Input_type, Category)))))"
      )
      .eq("Patient_id", patientId);

    console.log(error);

    const questionEvents = data
      .flatMap((patient) => patient.Patient_Process)
      .flatMap((process) => process.Process.Assigned_Event)
      .filter(
        (assignedEvent) => assignedEvent.Event_Day.Event.Category === "Question"
      )
      .map((assignedEvent) => ({
        id: assignedEvent.id,
        event_day_id: assignedEvent.Event_Day_id,
        day: assignedEvent.Event_Day.Day,
        event: assignedEvent.Event_Day.Event,
      }));

    const taskEvents = data
      .flatMap((patient) => patient.Patient_Process)
      .flatMap((process) => process.Process.Assigned_Event)
      .filter(
        (assignedEvent) => assignedEvent.Event_Day.Event.Category === "Task"
      )
      .map((assignedEvent) => ({
        id: assignedEvent.id,
        event_day_id: assignedEvent.Event_Day_id,
        day: assignedEvent.Event_Day.Day,
        event: assignedEvent.Event_Day.Event,
      }));

    const adviceEvents = data
      .flatMap((patient) => patient.Patient_Process)
      .flatMap((process) => process.Process.Assigned_Event)
      .filter(
        (assignedEvent) => assignedEvent.Event_Day.Event.Category === "Advice"
      )
      .map((assignedEvent) => ({
        id: assignedEvent.id,
        event_day_id: assignedEvent.Event_Day_id,
        day: assignedEvent.Event_Day.Day,
        event: assignedEvent.Event_Day.Event,
      }));

    console.log(questionEvents);

    const all = {
      ...data[0],
      questions: questionEvents,
      tasks: taskEvents,
      advices: adviceEvents,
    };

    return all;
  };

  return useQuery({
    queryKey: ["user", patientId],
    enabled: !!patientId,
    queryFn: async () => {
      const data = await fetchPatients();
      return data;
    },
    staleTime: 1000 * 60 * 60 * 5,
    gcTime: 1000 * 60 * 60 * 5,
  });
}
