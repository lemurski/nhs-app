import React from "react";

export default function Advice({ advices, day }) {
  const filteredAdvices = advices.filter((advice) => advice.day === day);

  console.log(filteredAdvices)

  return (
    <div className="w-full h-full overflow-y-scroll space-y-4">
      <h2 className="text-black text-2xl font-semibold">Advice</h2>
      {filteredAdvices.map((advice) => (
        <div key={advice.id} className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-black text-lg font-medium mb-2">
            {advice.event.Title}
          </h3>
          <p className="text-black">
            {advice.event.Description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < advice.event.Description.split("\n").length - 1 && (
                  <br />
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}
