export default function Advice({ advices, day }) {
  const filteredAdvices = advices.filter((advice) => advice.day === day);

  return (
    <div className="w-full space-y-4">
      <h2 className="text-black text-2xl font-semibold">Advice</h2>
      {filteredAdvices.map((advice) => (
        <div key={advice.id} className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-black text-lg font-medium mb-2">
            Day {advice.day}: {advice.event.Title}
          </h3>
          <p className="text-black">
            {advice.event.Description.replace(/^"|"$/g, "")}
          </p>
        </div>
      ))}
    </div>
  );
}
