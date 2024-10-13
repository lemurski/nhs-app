import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export default function useUsers() {
  const fetchPatients = async () => {
    const { data, error } = await supabase
      .from("Patient")
      .select(
        "Patient_id, First_Name, Last_Name, NHS_id, Patient_Process (id, Process_id, Start_date, Process (id, Title, Assigned_Event (id, Event_Day_id, Event_Day (id, Event_id, Day, Event (id, Title, Description, Input_type, Category)))))"
      );

    console.log(error);

    const flattenedData = data.map((patient) => ({
      ...patient,
      NHS_id: patient.NHS_id.toString(),
      Process_id: patient.Patient_Process[0]?.Process_id,
      Process_Title: patient.Patient_Process[0]?.Process.Title,
      Process_Start_date: patient.Patient_Process[0]?.Start_date
    }));

    return flattenedData;
  };

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await fetchPatients();
      return data;
    },
  });
}
