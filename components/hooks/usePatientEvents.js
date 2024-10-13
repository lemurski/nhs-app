import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export default function usePatientEvents() {
  let patientId = null;

  if (typeof window !== "undefined") {
    patientId = localStorage.getItem("patientId");
  } else {
    console.log("we are running on the server");
  }

  const fetchPatients = async () => {
    const { data, error } = await supabase
      .from("Patient")
      .select(
        "Patient_id, First_Name, Last_Name, NHS_id, Patient_Process (id, Process_id, Start_date, Process (id, Title, Assigned_Event (id, Event_Day_id, Event_Day (id, Event_id, Day, Event (id, Title, Description, Input_type, Category, Choice_1, Choice_2, Choice_3, Choice_1_output, Choice_2_output, Choice_3_output, Yes_output, No_output, Task_output)))))"
      );

    console.log(error);

    const flattenedData = data.map((patient) => ({
      ...patient,
      NHS_id: patient.NHS_id.toString(),
      Process_id: patient.Patient_Process[0]?.Process_id,
      Process_Title: patient.Patient_Process[0]?.Process.Title,
      Process_Start_date: patient.Patient_Process[0]?.Start_date,
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
