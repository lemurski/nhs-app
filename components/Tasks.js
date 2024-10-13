export default function Tasks({tasks}) {

  console.log(tasks)
return (
  <div className="w-full space-y-4">
    <h2 className="text-black text-2xl font-semibold">Advice</h2>
    {tasks.map((task) => (
      <div key={task.id} className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-black text-lg font-medium mb-2">
          Day {task.day}: {task.event.Title}
        </h3>
        <p className="text-black">{task.event.Description.replace(/^"|"$/g, '')}</p>
      </div>
    ))}
  </div>
);
}