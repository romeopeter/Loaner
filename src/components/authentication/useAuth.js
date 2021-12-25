/**
 * Provdes a scheme to verify/determine user authenticated status.
 * **/

import { useState } from "react";

export default function useAuth() {
	const [authed, setAuthed] = useState(false);

	return {
		authed,
		signOut() {
			setAuthed(false);
			return authed;
		},
		signIn() {
			setAuthed(true);
			return authed;
		},
	};
}