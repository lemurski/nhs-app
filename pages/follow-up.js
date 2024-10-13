import Advice from "@/components/Advice";
import useUser from "@/components/hooks/useUser";
import Questions from "@/components/Questions";
import Range from "@/components/Range";
import { supabase } from "@/components/supabaseClient";
import Tasks from "@/components/Tasks";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YesNo from "@/components/yes-no";

export default function FollowUp(params) {

  const { data, isPending } = useUser();

  if (isPending) {
    return null
  }

  console.log(data);

  if (!data.Patient_Process.length) {
    return (
      <div className="w-full h-screen flex bg-white justify-center p-5">
        <h1 className="text-black font-bold text-3xl text-center"
        >
          No active follow up plans
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-8 h-screen bg-white p-5">
      <h1 className="text-black font-bold text-3xl">
        Day 1 of Bowel Surgery Recovery
      </h1>
      <Tabs defaultValue="advice" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="advice">
            Advice
          </TabsTrigger>
          <TabsTrigger className="w-full" value="tasks">
            Tasks
          </TabsTrigger>
          <TabsTrigger className="w-full" value="questions">
            Questions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="advice">
          <Advice advices={data.advices} />
        </TabsContent>
        <TabsContent value="tasks">
          <Tasks tasks={data.tasks} />
        </TabsContent>
        <TabsContent value="questions">
          <Questions />
        </TabsContent>
      </Tabs>
    </div>
  );
}
