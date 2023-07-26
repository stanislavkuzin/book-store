const CommentModel = require('../models/comment.js');

const addComment = async (date) => {
    const checkComment = await CommentModel.find({ id: date.comment.id });
    if (checkComment.length === 0) {
        console.log('New comment')
        const comment = await new CommentModel(date.comment);
        await comment.save();
        return CommentModel.find();
    } else {
        console.log('Correct comment')
        await updateComment(date.comment);
        return CommentModel.find();
    }
}

const getAllComments = async () => {
    let comment = await CommentModel.find();
    console.log('getAllComments')
    return comment;
}

const getComment = async (id) => {
    const comment = await CommentModel.findOne({ id: `${id}` });
    return comment;
}

const deleteComment = async (id) => {
    await CommentModel.deleteOne({ id: `${id}` });
}

const updateComment = async (comment) => {
    console.log('updateComment' + comment.id)
    await CommentModel.updateOne(
        { id: `${comment.id}` },
        {
            $set: {
                comments: comment.comments
            }
        });
}

module.exports = {
    addComment,
    getAllComments,
    getComment,
    updateComment,
    deleteComment
}