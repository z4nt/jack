import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
export default function TaskForm({ onClose, id = null }) {
  // Estado para armazenar os dados do formulário
  
  const [token, setToken] = useState(localStorage.getItem("token"));
  const userId = token ? jwtDecode(token).id : null;
  const [newTask, setNewTask] = useState({ title: '', content: '', TaskStatus: '', usuarioId: userId });
  // Função para lidar com a mudança dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setNewTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Enviar dados para o backend ou atualizar o estado local
    const url = id? `http://localhost:10000/task/${id}` : `http://localhost:10000/task`
    try {
      const response = await fetch(url, {
        method: id? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        // Limpar formulário e fechar após sucesso
        setNewTask({ title: response.title , content: response.content, status: response.TaskStatus });
        onClose(); // Fechar o formulário
        // Atualizar estado ou recarregar tarefas
      } else {
        // Lidar com erro
        console.error('Erro ao criar tarefa:', await response.text());
      }
    } catch (error) {
      console.error('Erro ao enviar tarefa:', error);
    }
  };
  // Função para lidar com o envio do formulário
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-50 relative">
        <h2 className="text-2xl font-bold mb-4">{ id ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Titulo
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={newTask.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Digite o titulo"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Conteúdo
            </label>
            <input
              id="content"
              name="content"
              type="text"
              value={newTask.content}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Digite o conteúdo"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="TaskStatus">
              Status
            </label>
            <select
              id="TaskStatus"
              name="TaskStatus"
              value={newTask.TaskStatus}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Nenhum status selecionado</option>
              <option value="to do">To do</option>
              <option value="fazendo">Fazendo</option>
              <option value="feita">Feita</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {id? 'Atualizar' : 'salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
