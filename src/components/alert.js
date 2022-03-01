const Success = ({message}) => {
	return (
	<div className="mb-5">
		<div className="text-black text-center bg-green-100 p-2 rounded border border-1 border-green-400">
			{message}
		</div>
	</div>
	)
}

const Danger = ({message}) => {
	return (
		<div className="mb-5">
			<div className="text-black text-center bg-red-100 p-2 rounded border border-1 border-red-400">
				{message}
			</div>
		</div>
	)
}
const Warning = ({message}) => {
	return (
		<div className="mb-5">
			<div className="text-black text-center bg-yellow-100 p-2 rounded border border-1 border-yellow-400">
				{message}
			</div>
		</div>
	)
}
const Info = ({message}) => {
	return (
		<div className="mb-5">
			<div className="text-black text-center bg-blue-100 p-2 rounded border border-1 border-blue-400">
				{message}
			</div>
		</div>
	)
}

export {Success, Danger, Warning, Info}