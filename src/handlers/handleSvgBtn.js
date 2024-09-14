export const handleSvgBtn = (id, setCheckedTodos) => {
	setCheckedTodos((prevCheckedTodos) => ({
		...prevCheckedTodos,
		[id]: !prevCheckedTodos[id],
	}));
};
