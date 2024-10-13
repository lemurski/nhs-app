import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export default function MultipleChoice({
  Choice_1,
  Choice_2,
  Choice_3,
  Choice_1_output,
  Choice_2_output,
  Choice_3_output,
  title,
  description,
  onChange,
  value
}) {
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    // Update the selectedValue when the value prop changes
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleToggleChange = (newValue) => {
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full flex flex-col border rounded-xl p-5 shadow-md space-y-2">
      
      <p className="text-black text-xl font-medium">
        {title ? title : "Select an option:"}
      </p>
      <p className="text-black font-medium">
        {description ? description : "Please choose one of the following options."}
      </p>
      <div className="flex w-full ">
        <ToggleGroup
          variant="outline"
          className="flex flex-col space-y-2 w-full"
          size="lg"
          type="single"
          value={selectedValue}
          onValueChange={handleToggleChange}
        >
          <ToggleGroupItem
            value={Choice_1}
            className="w-full py-10 text-lg"
            aria-label={`Toggle ${Choice_1}`}
          >
            {Choice_1}
          </ToggleGroupItem>
          <ToggleGroupItem
            value={Choice_2}
            className="w-full py-10 text-lg"
            aria-label={`Toggle ${Choice_2}`}
          >
            {Choice_2}
          </ToggleGroupItem>
          <ToggleGroupItem
            value={Choice_3}
            className="w-full py-10 text-lg"
            aria-label={`Toggle ${Choice_3}`}
          >
            {Choice_3}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {selectedValue && (
        <div className={cn("w-full p-5 rounded-lg", 
          selectedValue === Choice_1 ? 'bg-blue-100' : 
          selectedValue === Choice_2 ? 'bg-yellow-200' : 
          selectedValue === Choice_3 ? 'bg-red-200' : null
        )}>
          <p>
            {selectedValue === Choice_1
              ? Choice_1_output
              : selectedValue === Choice_2
              ? Choice_2_output
              : selectedValue === Choice_3
              ? Choice_3_output
              : null}
          </p>
        </div>
      )}
    </div>
  );
}