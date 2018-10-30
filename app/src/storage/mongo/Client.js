import { MongoClient, ObjectId } from 'mongodb';
import debug from 'debug';

const Debug = debug('app:storage:mongo');

const DEFAULT_DB_HOST = 'storage';
const DEFAULT_DB_NAME = 'star_wars_movies';
const DEFAULT_DB_PORT = 27017;

export class Client {
	static get dbName() {
		return process.env.STORAGE_DB_NAME || DEFAULT_DB_NAME;
	}

	static get host() {
		return process.env.STORAGE_HOST || DEFAULT_DB_HOST;
	}

	static get port() {
		return parseInt(process.env.STRAGE_PORT, 10) || DEFAULT_DB_PORT;
	}

	static get url() {
		return `mongodb://${Client.host}:${Client.port}`;
	}

	static async getClient() {
		Debug('MongoDb connection url:', Client.url);
		Debug('MongoDb database name:', Client.dbName);
		const MongoClientInstance = new MongoClient(Client.url, { useNewUrlParser: true });
		try {
			await MongoClientInstance.connect();
			Debug('MongoDb connection successfully established.');
		} catch (e) {
			Debug('MongoDb connection failure.', e);
			throw e;
		}
		return MongoClientInstance.db(Client.dbName);
	}

	static async getCollection(name = '') {
		let collection;
		try {
			collection = (await Client.getClient()).collection(name);
		} catch (e) {
			Debug('MongoDb get collection failure:', e);
			throw e;
		}
		return collection;
	}


	static async findQuery(collectionName = '', queryAttrs = {}) {
		let queryResult;
		try {
			queryResult = (await Client.getCollection(collectionName)).find(queryAttrs).toArray();
		} catch (e) {
			Debug('MongoDb find query failure:', e);
			throw e;
		}
		return queryResult;
	}

	static async findOneQuery(collectionName = '', queryAttrs = {}) {
		let queryResult;
		try {
			queryResult = (await Client.getCollection(collectionName)).findOne(queryAttrs);
		} catch (e) {
			Debug('MongoDb find query failure:', e);
			throw e;
		}
		return queryResult;
	}

	static async storageInsertOneQuery(collectionName = '', queryAttrs = {}) {
		let queryResult;
		try {
			queryResult = await (await Client.getCollection(collectionName)).insertOne(queryAttrs);
		} catch (e) {
			Debug('MongoDb insert query failure:', e);
			throw e;
		}
		return queryResult;
	}

	static async updateOneQuery(collectionName = '', _id = '', queryAttrs = {}) {
		let queryResult;
		try {
			queryResult = await (await Client.getCollection(collectionName)).updateOne({ _id: ObjectId(_id) }, { $set: queryAttrs });
		} catch (e) {
			Debug('MongoDb update query failure:', e);
			throw e;
		}
		return queryResult;
	}

	static async deleteOneQuery(collectionName = '', { _id }) {
		let queryResult;
		try {
			queryResult = await (await Client.getCollection(collectionName)).deleteOne({ _id: ObjectId(_id) });
		} catch (e) {
			Debug('MongoDb delete query failure:', e);
			throw e;
		}
		return queryResult;
	}

	static prepareQueryResult(result) {
		const record = result;
		record._id = record._id.toString();
		return record;
	}
}
