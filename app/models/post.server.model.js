var PostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		require: true
	},
	author: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Post', PostSchema);