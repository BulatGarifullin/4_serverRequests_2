import { useState } from 'react';
import { updateTodo } from '../utils';

export const useRequestUpdateTodo = (refreshTodos) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateTodo = (id) => {
		setIsUpdating(true);

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(updateTodo()),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Заметка обновилась');
				refreshTodos();
			})
			.finally(() => setIsUpdating(false));
	};

	return {
		isUpdating,
		requestUpdateTodo,
	};
};
