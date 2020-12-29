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