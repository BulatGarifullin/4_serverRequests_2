export const addTodo = () => {
	const todo = prompt('Введите заметку');
	if (!todo || todo.trim() === '') {
		return null;
	}
	return {
		title: todo.trim(),
	};
};
