export const debounce = (fn, delay) => {
	let timerId;

	return (...args) => {
		// setTimeout(() => fn(...args), delay)

		clearTimeout(timerId);
		timerId = setTimeout(fn, delay, ...args);
	};
};
