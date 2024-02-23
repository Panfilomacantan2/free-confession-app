const mongoose = require('mongoose');
const initializedDB = async () => {
	try {

		mongoose.connection.on('disconnected', () => {
			console.log('Mongoose default connection disconnected');
		});
		
		process.on('SIGINT', () => {
			mongoose.connection.close(() => {
				console.log('Mongoose default connection disconnected through app termination');
				process.exit(0);
			});
		});
		
        mongoose.set('strictQuery', true);
		const response = await mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log(response ? 'DB connected' : 'DB connection failed');
	} catch (error) {
		console.log(`DB error: ${error.message}`);
	}
};

module.exports = { initializedDB };
