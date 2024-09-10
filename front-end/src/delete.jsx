// delete.js

import { jwtDecode } from "jwt-decode";

// Função para excluir uma tarefa
export default async function deleteTask(draggableId) {
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).id : null;

  if (!token || !userId) {
    console.error('Token ou userId ausente.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:10000/task/${draggableId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      console.log('Tarefa excluída com sucesso!');
    } else {
      console.error('Erro ao excluir tarefa:', await response.text());
    }
  } catch (error) {
    console.error('Erro ao enviar tarefa:', error);
  }
}
