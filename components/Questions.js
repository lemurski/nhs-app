import Range from "./Range";
import YesNo from "./yes-no";

export default function Questions(params) {
  return (
    <div className="w-full flex flex-col space-y-4 ">
      <YesNo />
      <Range />
    </div>
  );
}
