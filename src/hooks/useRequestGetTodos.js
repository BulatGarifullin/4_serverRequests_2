import { useState, useEffect } from 'react';

export const UseRequestGetTodos = (refreshProductFlag) => {
	const [todos, setTodos] = useState([]);

	const [isLoading, setIsLoading] = useState(false);

	const [searchValue, setSearchValue] = useState('');

	const [filteredTodos, setFilteredTodos] = useState([]);

	const inputSearchField = ({ target }) => {
		const { value } = target;
		setSearchValue(value);

		const filtered = todos.filter((elem) => elem.title.toLowerCase().includes(value.toLowerCase()));
		setFilteredTodos(filtered);
	};
	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
				setFilteredTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshProductFlag]);

	return {
		isLoading,
		todos: filteredTodos,
		setTodos: setFilteredTodos,
		inputSearchField,
		searchValue,
	};
};
