import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import TaskForm from "./form.jsx";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [currentFormId, setCurrentFormId] = useState(null); // Estado para armazenar o ID da tarefa ou coluna que está com o formulário visível
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tarefas, setTarefas] = useState(null);

  useEffect(() => {
    async function fetchTarefas() {
      const token = localStorage.getItem("token");
      console.log(token)
      const userId = token ? jwtDecode(token).id : null;
      console.log(userId)

      if (!userId) {
        console.error('Não foi possível obter o userId');
        return;
      }
      try {
        const response = await fetch(`http://localhost:10000/task/list/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();

        const colunas = {
          coluna0: { id: "coluna0", title: "to do", taskIds: [] },
          coluna1: { id: "coluna1", title: "fazendo", taskIds: [] },
          coluna2: { id: "coluna2", title: "feito", taskIds: [] },
        };

        const tarefa = {};

        data.forEach(task => {
          if (task.TaskStatus === 'to do') {
            colunas.coluna0.taskIds.push(task.id);
          } else if (task.TaskStatus === 'fazendo') {
            colunas.coluna1.taskIds.push(task.id);
          } else if (task.TaskStatus === 'feito') {
            colunas.coluna2.taskIds.push(task.id);
          }

          tarefa[task.id] = {
            id: String(task.id),
            title: task.title,
            content: task.content,
            status: task.TaskStatus
          };
        });

        setTarefas({ colunas, tarefa });

      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    }

    fetchTarefas();
  }, []);

  if (!tarefas || tarefas.length === 0) {
    return <p>Carregando...</p>;
  }

  function reordenar(result) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColuna = tarefas.colunas[source.droppableId];
    const finishColuna = tarefas.colunas[destination.droppableId];

    if (startColuna === finishColuna) {
      const newTaskIds = Array.from(startColuna?.taskIds || []);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColuna = {
        ...startColuna,
        taskIds: newTaskIds,
      };

      setTarefas((prevState) => ({
        ...prevState,
        colunas: {
          ...prevState.colunas,
          [newColuna.id]: newColuna,
        },
      }));

      return;
    }

    fetch(`http://localhost:10000/task/${draggableId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ TaskStatus: finishColuna.title }),
    }).then(() => {
      const newTaskIds = Array.from(startColuna.taskIds);
      newTaskIds.splice(source.index, 1);
      finishColuna.taskIds.splice(destination.index, 0, draggableId);

      setTarefas({
        ...tarefas,
        colunas: {
          ...tarefas.colunas,
          [source.droppableId]: { ...startColuna, taskIds: newTaskIds },
          [destination.droppableId]: finishColuna,
        },
      });
    });
  }

  const handleFormOpen = (formId) => {
    setCurrentFormId(formId);
  };

  const handleFormClose = () => {
    setCurrentFormId(null);
  };

  return (
    <DragDropContext onDragEnd={reordenar}>
      <div className="flex justify-around	items-center mt-14">
        {Object.values(tarefas.colunas).map((coluna) => (
          <Droppable key={coluna.id} droppableId={coluna.id}>
            {(provided) => (
              <div
                className="bg-slate-300 overflow-y-auto scrollbar-track-transparent scrollbar-thumb-slate-500 scrollbar-thin w-64 max-h-[400px] rounded-md border-black p-4 h-auto w-[350px]"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-center">{coluna.title}</h2>
                {(coluna?.taskIds || []).length === 0 ? (
                  <p>Sem tarefas</p>
                ) : (
                  (coluna?.taskIds || []).map((taskId, index) => {
                    const task = tarefas.tarefa[taskId];
                    return (
                      <Draggable
                        key={task?.id}
                        draggableId={task?.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="bg-white mt-2 border-slate-950 border-2 rounded-lg px-2 h-28"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h2 className="font-semibold ">
                              {task?.title}
                            </h2>
                            <p className="mt-1 ">
                              {task?.content}
                            </p>
                            <button onClick={() => handleFormOpen(task.id)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full  p-2 ml-64  ">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                            </button>
                            {currentFormId === task.id && (
                              <TaskForm onClose={handleFormClose} id={task.id} onUpdate={() => fetchTarefas()} />
                            )}
                          </div>
                        )}
                      </Draggable>
                    );
                  })
                )}
                {coluna?.id === 'coluna0' ? (
                  <div>
                    <button onClick={() => handleFormOpen("newTask")} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-32 mt-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                    {currentFormId === "newTask" && (
                      <TaskForm onClose={handleFormClose} onUpdate={() => fetchTarefas()} />
                    )}
                  </div>
                ) : null}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
