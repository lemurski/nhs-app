import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Range({ title, description, onChange }) {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleToggleChange = (value) => {
    setSelectedValue(value);
    onChange(parseInt(value, 10));
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      <p className="text-black text-xl font-medium">
        {title ? title : "What's your pain level?"}
      </p>
      <p className="text-black font-medium">
        {description ? description : "Description goes here"}
      </p>
      <div className="flex w-full">
        <ToggleGroup
          variant="outline"
          className="grid grid-cols-5 gap-2 w-full"
          size="lg"
          type="single"
          value={selectedValue}
          onValueChange={handleToggleChange}
        >
          {[...Array(10).keys()].map((i) => (
            <ToggleGroupItem
              key={i + 1}
              value={(i + 1).toString()}
              className="text-lg"
              aria-label={`Toggle ${i + 1}`}
            >
              <p>{i + 1}</p>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}