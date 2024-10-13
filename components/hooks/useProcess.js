import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export default function useProcess() {
  const fetchPatients = async () => {
    const { data, error } = await supabase.from("Process").select("*");

    return data;
  };

  return useQuery({
    queryKey: ["process"],
    queryFn: async () => {
      const data = await fetchPatients();
      return data;
    },
  });
}
