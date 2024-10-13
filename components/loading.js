import { MoonLoader } from "react-spinners";

export default function Loading(params) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col space-y-4">
        <h1>Ładowanie...</h1>
        <MoonLoader color="#fff" className="m-auto h-10 w-10" />
      </div>
    </div>
  );
}