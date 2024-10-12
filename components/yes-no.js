import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function YesNo({ title, description, threshold }) {
  return (
    <div className="w-full flex flex-col space-y-2">
      <p className="text-black text-xl font-medium">{title ? title : 'Have you vomitted in the past 24 hours?'}</p>
      <p className='text-black font-medium'>{description ? description : 'Description goes here'}</p>
      <div className="flex w-full ">
      <ToggleGroup variant='outline' className='flex w-full' size='lg' type="single">
      <ToggleGroupItem value="bold" className='w-full py-7 text-lg' aria-label="Toggle bold">
        <p>Yes</p>
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" className='w-full py-7 text-lg' aria-label="Toggle italic">
        <p>No</p>
      </ToggleGroupItem>

    </ToggleGroup>

      </div>
    </div>
  );
}
