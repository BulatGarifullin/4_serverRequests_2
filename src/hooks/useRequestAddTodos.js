import { useState } from 'react';
import { addTodo } from '../utils';

export const useRequestAddTodo = (refreshTodos) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = () => {
		setIsCreating(true);

		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(addTodo()),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Заметка добавлена');
				refreshTodos();
			})
			.finally(() => setIsCreating(false));
	};

	return {
		isCreating,
		requestAddTodo,
	};
};
