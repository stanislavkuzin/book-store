const RetingModel = require('../models/reting.js');

const addReting = async (date) => {
    const checkReting = await RetingModel.find({ id: date.reting.id });
    if (checkReting.length === 0) {
        console.log('New reting')
        const reting = await new RetingModel(date.reting);
        await reting.save();
        return RetingModel.find();
    } else {
        console.log('Correct reting');
        await updateReting(date.reting);
        return RetingModel.find();
    }
}

const getAllRetings = async () => {
    let reting = await RetingModel.find();
    console.log('getAllRetings');
    return reting;
}

const getReting = async (id) => {
    const reting = await RetingModel.findOne({ id: `${id}` });
    return reting;
}

const deleteReting = async (id) => {
    await RetingModel.deleteOne({ id: `${id}` });
}

const updateReting = async (reting) => {
    console.log('updateReting' + reting.id)
    await RetingModel.updateOne(
        { id: `${reting.id}` },
        {
            $set: {
                arrReting: reting.arrReting
            }
        });
}

module.exports = {
    addReting,
    getAllRetings,
    getReting,
    updateReting,
    deleteReting
}