function App() {
  const lists = [
    {
      id: 1,
      title: "Task 1",
      description: "This is description",
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is description",
    },
    {
      id: 3,
      title: "Task 3",
      description: "This is description",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center">
        {lists.map((list) => (
          <div
            className="border-2 border-sky-50 rounded-lg flex flex-row items-center justify-between p-8 gap-4"
            key={list.id}
          >
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-xl font-bold">{list.title}</h2>
              <p className="text-md font-semibold">{list.description}</p>
            </div>
            <button className="px-4 py-2 border rounded-xl bg-red-500 hover:bg-red-400 text-white">
              Delete
            </button>
            <button className="px-4 py-2 border rounded-xl bg-green-500 hover:bg-green-400 text-white">
              Finish
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
