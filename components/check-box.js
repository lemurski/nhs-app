import { useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";

export default function CheckTask({
  title,
  description,
  Task_output,
  onChange,
  value
}) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Update the isChecked state when the value prop changes
    if (value !== undefined) {
      setIsChecked(value);
    }
  }, [value]);

  const handleToggleChange = (checked) => {
    setIsChecked(checked);
    onChange(checked);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full items-center flex justify-between">
        <div className="flex flex-col space-y-2 flex-grow mr-4">
          <p className="text-black text-xl font-medium">
            {title || "Task title"}
          </p>
          <p className="text-black font-medium">
            {description || "Task description"}
          </p>
        </div>
        <Checkbox
          checked={isChecked}
          onCheckedChange={handleToggleChange}
          className="flex-shrink-0"
        />
      </div>
      {isChecked && (
        <div className="w-full p-5 rounded-xl bg-blue-50">
          <p>{Task_output}</p>
        </div>
      )}
    </div>
  );
}