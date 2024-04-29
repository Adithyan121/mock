const Item = require('../model/itemmodel');


// Create
const addItem =  async (req, res) => {
    try {
        const newItem = req.body;
        const item = await Item.create(newItem);
        return res.status(201).json({ message: 'Item created successfully', item });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Read
const getitems = async (req, res) => {
    try {
        const items = await Item.find({});
        return res.json(items);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


// Update
const updateItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedItem = req.body;
        const item = await Item.findByIdAndUpdate(itemId, updatedItem, { new: true });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        return res.json({ item, message: "Item updated successfully" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}



// Delete
const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Item.findByIdAndDelete(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        return res.status(200).json({ message: 'Item Deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}



module.exports = {addItem,getitems,updateItem,deleteItem}
