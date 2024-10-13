import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function YesNo({
  title,
  description,
  Yes_output,
  No_output,
  onChange,
  value
}) {
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    // Update the selectedValue when the value prop changes
    if (value !== undefined) {
      setSelectedValue(value ? "yes" : "no");
    }
  }, [value]);

  const handleToggleChange = (newValue) => {
    setSelectedValue(newValue);
    onChange(newValue === "yes");
  };

  return (
    <div className="w-full flex flex-col border rounded-xl p-5 shadow-md   space-y-2">
      <p className="text-black text-xl font-medium">
        {title ? title : "Have you vomited in the past 24 hours?"}
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
            aria-label="Toggle yes"
          >
            <p>Yes</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="no"
            className="w-full py-7 text-lg"
            aria-label="Toggle no"
          >
            <p>No</p>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="w-full p-5 bg-gray-50">
        <p>
          {selectedValue === "yes"
            ? Yes_output
            : selectedValue === "no"
            ? No_output
            : null}
        </p>
      </div>
    </div>
  );
}