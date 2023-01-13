const generateRandomWords = () => {
	const randomWords = 'abcdefghijklmnopqrstuvwxyz';
	let words = '';
	for (let i = 0; i < 5; i++) {
		words += randomWords.charAt(Math.floor(Math.random() * randomWords.length));
	}
	return words;
};


module.exports = generateRandomWords;