import Advice from "@/components/Advice";
import Questions from "@/components/Questions";
import Range from "@/components/Range";
import Tasks from "@/components/Tasks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YesNo from "@/components/yes-no";

export default function FollowUp(params) {
  return (
    <div className="w-full flex flex-col space-y-8 h-screen bg-white p-5">
      <h1 className="text-black font-bold text-3xl">
        Day 4 of Bowel Surgery Recovery
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
          <Advice />
        </TabsContent>
        <TabsContent value="tasks">
          <Tasks />
        </TabsContent>
        <TabsContent value="questions">
          <Questions />
        </TabsContent>
      </Tabs>

    </div>
  );
}
