let isLoading = false;
const submitMessageBtn = document.querySelector('#submitMessageBtn');
// UUID
const uuidv4 = () => {
	return `id-${new Date().getFullYear()}-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

const confessionsArr = [];
const fetchData = async () => {
	isLoading = true;
	checkLoading(isLoading);

	const response = await fetch('/posts');
	const data = await response.json();

	isLoading = false;
	checkLoading(isLoading);

	return data;
};

const checkLoading = (isLoaded) => {
	const confessionsContainer = document.querySelector('.confession-container');

	const noResult = document.createElement('p');
	noResult.classList.add('no-result');
	const noResultMsg = document.createTextNode('Loading...');
	noResult.appendChild(noResultMsg);
	confessionsContainer.appendChild(noResult);

	confessionsContainer.scrollTop = confessionsContainer.scrollHeight - 400;
};

const addNewConfession = async (e) => {
	const confessionsContainer = document.querySelector('.confession-container');

	e.preventDefault();
	const codeName = document.querySelector('#codeName');
	const messageBody = document.querySelector('#messageBody').value.trim();

	if (!codeName?.length > 6 || !codeName || !messageBody) {
		swal('Your message is not valid.', 'Please try again.', 'error');
		return;
	}

	axios
		.post('/posts', {
			codeName: codeName.value.trim(),
			message: messageBody,
		})
		.then((response) => {
			swal('Message sent successfully.', '', 'success');
			submitMessageBtn.innerText = 'Send';
			resetFields();
			displayConfessions();
			codeName.focus();
			confessionsContainer.scrollTop = confessionsContainer.scrollHeight - confessionsContainer.clientHeight;
		});
	submitMessageBtn.innerText = 'Sending...';
};

submitMessageBtn.addEventListener('click', addNewConfession);

const resetFields = () => {
	document.querySelector('#codeName').value = '';
	document.querySelector('#messageBody').value = '';
};

const displayConfessions = async () => {
	const confessionsContainer = document.querySelector('.confession-container');
	let data = await fetchData();

	let output = '';

	if (data?.length > 0) {
		data.reverse().map(async (confession) => {
			const { _id, createdAt, codeName, message, avatar } = confession;

			// console.log({ codeName });

			output += `<div class="hover:bg-slate-800 shadow-lg shadow-bg-gray-100 rounded-sm z-10	border 	border-slate-800 p-5 overflow-hidden">
											<div class="flex items-center justify-center w-full bg-slate-800 px-3 py-1 rounded-md">
													<div class="w-10 h-10 rounded-full overflow-hidden ">
														
														<img
														src="https://api.dicebear.com/7.x/personas/svg?seed=Felix=${codeName}
														alt="avatar"


													/>

													
																		
												</div>
													<div class="details">
															<div class="name">
																<h6 class="text-[10px]   font-bold text-gray-300">-${codeName.toUpperCase()}</h6>
																
															</div>

														
												
														</div>
														<div class="date">
														<p class="text-xs text-gray-400 text-right">${new Date(createdAt).toDateString()}</p>

													
														<p class="text-xs text-gray-400 text-right">${moment(createdAt).fromNow()}</p>
													</div>
												
												</div>
												<hr class="h-px my-2 bg-gray-700 border-0 dark:bg-gray-700">


									<div class="confession overflow-y-scroll mt-4  ">
										<p class="message text-gray-400 max-h-48 text-sm"><b class="text-gray-300">Confession:</b>   ${message} </p>
									</div>

											
								</div>`;

			// <div class="reply-form">
			// 		<form action="/reply/${_id}" method="POST">
			// 			<input type="text" name="reply" placeholder="Reply to this confession" required />
			// 			<button type="submit" class="reply-btn">Reply</button>
			// 		</form>
			// 	</div>

			// 	<button onclick="getReplies('${_id}')">View Replies</button>
		});

		confessionsContainer.scrollTop = confessionsContainer.scrollHeight - confessionsContainer.clientHeight;

		confessionsContainer.innerHTML = output;
	} else {
		const noResult = document.createElement('p');
		noResult.classList.add('no-result');
		const noResultMsg = document.createTextNode('No confessions yet.');
		noResult.appendChild(noResultMsg);
		confessionsContainer.appendChild(noResult);
	}
};

// TOGGLE CONFESSIONS CONTAINER
const showConfessionsBtn = document.querySelector('#showConfessions');

const showConfessions = () => {
	const confessionsContainer = document.querySelector('.confession-container');
	confessionsContainer.classList.toggle('show');
	showConfessionsBtn.classList.toggle('active');

	if (confessionsContainer.classList.contains('show')) {
		showConfessionsBtn.innerText = 'Hide Confessions';
	} else {
		showConfessionsBtn.innerText = 'Show Confessions';
	}
};

const getReplies = async (id) => {
	const replies = document.getElementById(id);
	let output = '';
	const url = await fetch(`/reply/${id}`);
	const res = await url.json();

	res.comments.forEach((comment) => {
		output = `<li>${comment.text}</li>`;
	});

	replies.innerHTML = output;
};

document.addEventListener('DOMContentLoaded', displayConfessions);
showConfessionsBtn.addEventListener('click', showConfessions);

const end = Date.now() + 2 * 1000;

// go Buckeyes!
var colors = ['#DEBF39', '#39DE6D', '#3957DE', '#DE39AA'](
	(function frame() {
		confetti({
			particleCount: 4,
			angle: 60,
			spread: 55,
			origin: { x: 0 },
			colors: colors,
		});
		confetti({
			particleCount: 4,
			angle: 120,
			spread: 55,
			origin: { x: 1 },
			colors: colors,
		});

		if (Date.now() < end) {
			requestAnimationFrame(frame);
		}
	})(),
);
