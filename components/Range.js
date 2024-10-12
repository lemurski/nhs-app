import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Range({ title, description, threshold }) {
  return (
    <div className="w-full flex flex-col space-y-2">
      <p className="text-black text-xl font-medium">
        {title ? title : "Whats your pain level?"}
      </p>
      <p className="text-black font-medium">
        {description ? description : "Description goes here"}
      </p>
      <div className="flex w-full ">
        <ToggleGroup
          variant="outline"
          className="grid grid-cols-5 gap-2 w-full"
          size="lg"
          type="single"
        >
          <ToggleGroupItem
            value="1"
            className="text-lg"
            aria-label="Toggle bold"
          >
            <p>1</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="2"
            className="text-lg"
            aria-label="Toggle bold"
          >
            <p>2</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="3"
            className="text-lg"
            aria-label="Toggle bold"
          >
            <p>3</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="4"
            className="text-lg"
            aria-label="Toggle bold"
          >
            <p>4</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="5"
            className="text-lg"
            aria-label="Toggle bold"
          >
            <p>5</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="6"
            className="text-lg"
            aria-label="Toggle bold"
          >
            <p>6</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="7"
            className="text-lg"
            aria-label="Toggle bold"
          >
            <p>7</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="8"
            className="text-lg"
            aria-label="Toggle bold"
          >
            <p>8</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="9"
            className="text-lg"
            aria-label="Toggle bold"
          >
            <p>9</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="10"
            className="text-lg"
            aria-label="Toggle bold"
          >
            <p>10</p>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
