const mongoose = require('mongoose');
const initializedDB = async () => {
	try {
        mongoose.set('strictQuery', true);
		const response = await mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log(response ? 'DB connected' : 'DB connection failed');
	} catch (error) {
		console.log(`DB error: ${error.message}`);
	}
};

module.exports = { initializedDB };
