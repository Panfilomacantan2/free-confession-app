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
	const data = await fetchData();
	let output = '';

	if (data?.length > 0) {
		data.forEach((confession) => {
			const { _id, createdAt, codeName, message, avatar } = confession;

			output += `<div class="confession-item">
				<div class="confession-header">
					<div class="img-box">
						<img src="${avatar}" class="avatar" alt="" />
					</div>
					<div class="details">
						<div class="name">
							<h4>${codeName.toUpperCase()}</h4>
						</div>
						<div class="date">
							<h4>${moment(createdAt).format('MMMM DD, YYYY | HH:mm:ssA')}</h4>
						</div>
					</div>
				</div>
				<hr/>

				<div class="confession">
					<p class="message"><b>Confession:</b>  <i class="fa fa-quote-left" aria-hidden="true"></i>  ${message}  <i class="fa fa-quote-right" aria-hidden="true"></i></p>
				</div>
			</div>`;
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

document.addEventListener('DOMContentLoaded', displayConfessions);
showConfessionsBtn.addEventListener('click', showConfessions);
