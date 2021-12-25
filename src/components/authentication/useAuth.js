/**
 * Provdes a scheme to verify/determine user authenticated status.
 * **/ 

import {useState} from 'react'

export default function useAuth() {
	const [authed, setAuthed] = useState(false);

	return {
		authed,
		signOut(cb) {
			if (cb) {
				return new Promise(res => {
					setAuthed(false)
					res()	
				})
			};
		},
		signIn(cb) {
			if (cb) {
				return new Promise(res => {
					setAuthed(true)
					res()	
				})
			};
		},
	}
}