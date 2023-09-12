import {computed, reactive} from "vue";

import UserInterface from "@/interfaces/UserInterface";

export default class UserComposition {
	public firstName: string = "";
	public lastName: string = "";

	constructor() {
		// Declare reactive object
		const user: UserInterface = reactive({
			firstName: this.firstName,
			lastName: this.lastName,
			fullName: computed((): string => {
				return `${user.firstName} ${user.lastName}`;
			})
		});
		return user;
	}
}
