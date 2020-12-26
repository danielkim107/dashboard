type Entry = {
	id: number,
	author: string,
	title: string,
	content: string,
	createdAt: string
};

type EntryForm = {
	author: string,
	title: string,
	content: string
};

interface Param {
	id: string
};