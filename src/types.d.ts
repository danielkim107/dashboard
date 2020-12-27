type Entry = {
	id: number,
	user: User,
	title: string,
	content: string,
	createdAt: string
};

type User = {
	id: number,
	username: string
}

type EntryForm = {
	userId: number,
	title: string,
	content: string
};

type UserForm = {
	username: string,
	password: string
};

interface Param {
	id: string
};