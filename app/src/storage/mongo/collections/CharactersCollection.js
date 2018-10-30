import { ObjectId } from 'mongodb';
import debug from 'debug';

import { Client as StorageClient } from '../Client';

const COLLECTION_NAME = 'characters';
const Debug = debug(`app:storage:mongo:collection:${COLLECTION_NAME}`);

export default class CharactersCollection {
	static async findOne({ _id }) {
		Debug('executing findOne query');
		const single = await StorageClient.findOneQuery(COLLECTION_NAME, { _id: ObjectId(_id) });
		return StorageClient.prepareQueryResult(single);
	}

	static async findAll(queryAttrs = {}) {
		Debug('executing findAll query with params:', queryAttrs);
		const res = await StorageClient.findQuery(COLLECTION_NAME, queryAttrs);
		return res.map(StorageClient.prepareQueryResult);
	}

	static async insertOne(queryAttrs = {}) {
		Debug('executing insertOne query with params:', queryAttrs);
		const { ops } = await StorageClient.storageInsertOneQuery(COLLECTION_NAME, queryAttrs);
		return StorageClient.prepareQueryResult({ ...ops[0] });
	}

	static async deleteOne(_id = '') {
		Debug('executing deleteOne query');
		const { result } = await StorageClient.deleteOneQuery(COLLECTION_NAME, { _id: ObjectId(_id) });
		return result.ok && !!result.ok;
	}

	static async updateOne(_id = '', queryAttrs = {}) {
		Debug('executing updateOne query');
		const single = await StorageClient.findOneQuery(COLLECTION_NAME, { _id: ObjectId(_id) });
		for (const attr in queryAttrs) {
			single[attr] = queryAttrs[attr];
		}
		await StorageClient.updateOneQuery(COLLECTION_NAME, _id, single);
		return StorageClient.prepareQueryResult(single);
	}
}
