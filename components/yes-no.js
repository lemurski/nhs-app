import { useState } from "react";
import { supabase } from "./supabaseClient";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function YesNo({ title, description, threshold, onChange }) {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleToggleChange = (value) => {
    setSelectedValue(value);
    onChange(value === "yes");
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      <p className="text-black text-xl font-medium">
        {title ? title : "Have you vomitted in the past 24 hours?"}
      </p>
      <p className="text-black font-medium">
        {description ? description : "Description goes here"}
      </p>
      <div className="flex w-full ">
        <ToggleGroup
          variant="outline"
          className="flex w-full"
          size="lg"
          type="single"
          value={selectedValue}
          onValueChange={handleToggleChange}
        >
          <ToggleGroupItem
            value="yes"
            className="w-full py-7 text-lg"
            aria-label="Toggle bold"
          >
            <p>Yes</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="no"
            className="w-full py-7 text-lg"
            aria-label="Toggle italic"
          >
            <p>No</p>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
