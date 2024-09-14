import styles from './app.module.css';
import { useState, useEffect } from 'react';
import { UseRequestGetTodos, useRequestAddTodo, useRequestDeleteTodo, useRequestUpdateTodo } from './hooks';
import { CheckIcon, CloseIcon } from './svg-icons';
import { handleSvgBtn } from './handlers';

export const App = () => {
	const [refreshProductFlag, setRefreshProductFlag] = useState(false);
	const refreshTodos = () => setRefreshProductFlag(!refreshProductFlag);

	const [checkedTodos, setCheckedTodos] = useState({});
	const [isSorted, setIsSorted] = useState(false);
	const [initialTodos, setInitialTodos] = useState([]);

	const { isLoading, todos, setTodos, inputSearchField, searchValue } = UseRequestGetTodos(refreshProductFlag);
	const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos);
	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(refreshTodos);
	const { isUpdating, requestUpdateTodo } = useRequestUpdateTodo(refreshTodos);

	useEffect(() => {
		if (!isSorted && todos.length >= 0) {
			setInitialTodos(todos);
		}
	}, [todos, isSorted]);

	const handleSortTodoList = () => {
		setIsSorted(!isSorted);

		if (!isSorted) {
			const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
			setTodos(sortedTodos);
		} else {
			setTodos(initialTodos);
		}
	};

	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<>
					<h1>Список заметок:</h1>
					<div>
						<button disabled={isCreating} onClick={requestAddTodo}>
							Добавить заметку
						</button>
						<button onClick={handleSortTodoList} className={isSorted ? styles.btnSort : ''}>
							Сортировка
						</button>
					</div>
					<form>
						<label>Поиск...</label>
						<input type="text" name="searchInput" value={searchValue} onChange={inputSearchField}></input>
					</form>
					{todos.map(({ id, title }) => (
						<div className={styles.todo} key={id}>
							<p className={`${styles.todoContent} ${checkedTodos[id] ? styles.checked : ''}`}>{title}</p>
							<div className={styles.todoBtn}>
								<button
									onClick={() => handleSvgBtn(id, setCheckedTodos)}
									className={`${checkedTodos[id] ? styles.checkedBtn : ''}`}
									disabled={checkedTodos[id]}
								>
									<CheckIcon />
								</button>
								<button
									onClick={() => handleSvgBtn(id, setCheckedTodos)}
									className={`${!checkedTodos[id] ? styles.checkedBtn : ''}`}
									disabled={!checkedTodos[id] || checkedTodos[id] === undefined}
								>
									<CloseIcon />
								</button>
								<button disabled={isUpdating} onClick={() => requestUpdateTodo(id)}>
									Обновить заметку
								</button>
								<button disabled={isDeleting} onClick={() => requestDeleteTodo(id)}>
									Удалить заметку
								</button>
							</div>
						</div>
					))}
				</>
			)}
		</div>
	);
};
