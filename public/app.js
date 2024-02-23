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

	if (!codeName || !messageBody) {
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

			console.log({ codeName });

			output += `<div class="hover:bg-slate-800 shadow-lg shadow-bg-gray-100 rounded-sm 	border 		border-slate-800 p-5 oveflow-y-scroll">
											<div class="flex items-center justify-center w-full bg-slate-800 px-3 py-1 rounded-md">
													<div class="w-10 h-10 rounded-full overflow-hidden ">
														
														<img
														src=" https://api.dicebear.com/7.x/initials/svg?seed=${codeName} loading="lazy"
														alt="avatar"
													/>
																		
												</div>
													<div class="details">
															<div class="name">
																<h5 class="text-sm text-gray-300">-${codeName.toUpperCase()}</h5>
																
															</div>

														
												
														</div>
														<div class="date">
														<p class="text-xs text-gray-400 text-right">${new Date(createdAt).toDateString()}</p>

													
														<p class="text-xs text-gray-400 text-right">${moment(createdAt).fromNow()}</p>
													</div>
												
												</div>
									<hr/>

									<div class="overflow-auto">
										<p class="message text-gray-400"><b class="text-gray-300">Confession:</b>  <i class="fa fa-quote-left" aria-hidden="true"></i>  ${message}  <i class="fa fa-quote-right" aria-hidden="true"></i></p>
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
