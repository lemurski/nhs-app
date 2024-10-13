import useUsers from "@/components/hooks/useUsers";
import {
  ArrowRight,
  ArrowUpDown,
  ArrowUpRight,
  Delete,
  FileEdit,
  LogIn,
  MoreHorizontal,
  Store,
  Trash,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogOverlay,
  AlertDialogPortal,
} from "@radix-ui/react-alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronsUpDown } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataTableUsers } from "@/components/DataTableUsers";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { supabase } from "@/components/supabaseClient";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const processes = {
  7476: {
    id: 7476,
    title: "Bowel Surgery Recovery",
  },
  2: {
    id: 2,
    title: "Chronic Pain Management",
  },
};

const processesArray = [
  { id: 7476, title: "Bowel Surgery Recovery" },
  { id: 2, title: "Chronic Pain Management" },
];

export default function Dashboard(params) {
  const { data, isPending, refetch, error } = useUsers();

  const columns_admin = getColumnsAdmin(data, isPending, refetch);

  console.log(data);

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-0 py-10">
      <DataTableUsers columns={columns_admin} data={data} />
    </div>
  );
}

function PatientProcessAssignmentDialog({ patientId, NHS_id, onClose }) {
  const [selectedProcess, setSelectedProcess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProcess) {
      alert("Please select a process");
      return;
    }

    try {
      const { error } = await supabase.from("Patient_Process").insert({
        Patient_id: patientId,
        Process_id: selectedProcess,
        Start_date: new Date().toISOString(),
      });

      if (error) throw error;

      alert("Process assigned successfully");
      onClose();
    } catch (error) {
      console.error("Error assigning process:", error);
      alert("An error occurred while assigning the process.");
    }
  };

  return (
    <AlertDialogContent className="max-w-3xl">
      <AlertDialogHeader>
        <AlertDialogTitle>Set Process for {NHS_id}</AlertDialogTitle>
      </AlertDialogHeader>
      <div className="flex w-full items-center space-x-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="process">Process</Label>
          <Select onValueChange={(value) => setSelectedProcess(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a process">
                {processes[selectedProcess]
                  ? processes[selectedProcess].title
                  : null}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {processesArray.map((process) => (
                <SelectItem key={process.id} value={process.id}>
                  {process.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleSubmit}
          disabled={!selectedProcess}
          className="bg-primary hover:bg-primary/80"
        >
          Assign
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

function getColumnsAdmin(data, isPendingStations, refetchUsers) {
  return [
    {
      accessorKey: "First_Name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            First Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "Last_Name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "NHS_id",
      header: "NHS Number",
    },
    {
      accessorKey: "Process_Title",
      header: "Process title",
      cell: ({ row }) => {
        const title = row.getValue("Process_Title");

        return <p>{title ? title : "No process assigned"}</p>;
      },
    },
    {
      accessorKey: "Process_Start_date",
      header: "Day of the process",
      cell: ({ row }) => {
        const date = row.getValue("Process_Start_date");
        const today = new Date();

        let differenceInDays = "No process assigned";

        if (date) {
          const startDate = new Date(date);
          const timeDifference = today - startDate;
          differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        }

        return (
          <p>{date ? `Day ${differenceInDays}` : "No process assigned"}</p>
        );
      },
    },

    {
      accessorKey: "Patient_id",
      header: "Actions",
      cell: ({ row }) => {
        const title = row.getValue("Process_Title");
        const patientId = row.getValue("Patient_id");
        const NHS_id = row.getValue("NHS_id");

        const onSubmit = async (formData) => {
          if (!selectedProcess) {
            alert("Please select a process");
            return;
          }

          try {
            // Insert into Patient_Process table
            const { error: processError } = await supabase
              .from("Patient_Process")
              .insert({
                Patient_id: patientId,
                Process_id: selectedProcess,
                Start_date: new Date().toISOString(),
              });

            if (processError) throw processError;

            onSuccess();
          } catch (error) {
            console.error("Error updating data:", error);
            alert("An error occurred while updating the data.");
          }
        };

        const updateDay = async () => {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayISO = yesterday.toISOString();

          const { data, error } = await supabase
            .from("Patient_Process")
            .update({
              Start_date: yesterdayISO,
            })
            .eq("Patient_id", patientId);

          console.log(error);
          refetchUsers();
        };
        return (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Otwórz menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2" align="start">
              {title ? (
                <DropdownMenuItem onClick={updateDay}>
                  Update Day
                </DropdownMenuItem>
              ) : null}
              {title ? null : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      className=""
                      onSelect={(e) => e.preventDefault()}
                    >
                      Set Process
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogPortal>
                    <AlertDialogOverlay />
                    <PatientProcessAssignmentDialog
                      patientId={patientId}
                      NHS_id={NHS_id}
                      onClose={refetchUsers}
                    />
                  </AlertDialogPortal>
                </AlertDialog>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      id: "details",
      cell: ({ row }) => {
        const id = row.getValue("Patient_id");

        return (
          <Link href={`/dashboard/${id}`} className="text-neutral-900">
            <ArrowUpRight className="size-6" />
          </Link>
        );
      },
    },
  ];
}
