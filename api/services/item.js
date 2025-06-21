const Item = require('../models/item');

// Create item function
const createItem = async (itemData) => {
    try {
        const item = new Item(itemData);
        const savedItem = await item.save();
        return savedItem;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error(`Validation Error: ${error.message}`);
        }
        throw new Error(`Error creating item: ${error.message}`);
    }
};

// Get all items function
const getAllItems = async (filters = {}) => {
    try {
        const items = await Item.find(filters).populate('name').populate('resource');
        return items;
    } catch (error) {
        throw new Error(`Error fetching items: ${error.message}`);
    }
};

// Get item by ID function
const getItemById = async (id) => {
    try {
        const item = await Item.findById(id).populate('name').populate('resource');
        if (!item) {
            throw new Error('Item not found');
        }
        return item;
    } catch (error) {
        if (error.name === 'CastError') {
            throw new Error('Invalid item ID format');
        }
        throw new Error(`Error fetching item: ${error.message}`);
    }
};

// Update item function
const updateItem = async (id, updateData) => {
    try {
        const item = await Item.findByIdAndUpdate(
            id,
            updateData,
            { 
                new: true,
                runValidators: true
            }
        ).populate('name').populate('resource');
        
        if (!item) {
            throw new Error('Item not found');
        }
        
        return item;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error(`Validation Error: ${error.message}`);
        }
        if (error.name === 'CastError') {
            throw new Error('Invalid item ID format');
        }
        throw new Error(`Error updating item: ${error.message}`);
    }
};

// Delete item function
const deleteItem = async (id) => {
    try {
        const item = await Item.findByIdAndDelete(id);
        if (!item) {
            throw new Error('Item not found');
        }
        return item;
    } catch (error) {
        if (error.name === 'CastError') {
            throw new Error('Invalid item ID format');
        }
        throw new Error(`Error deleting item: ${error.message}`);
    }
};

// Add resource to item function
const addResourceToItem = async (itemId, resourceId) => {
    try {
        const item = await Item.findByIdAndUpdate(
            itemId,
            { $addToSet: { resource: resourceId } },
            { 
                new: true,
                runValidators: true
            }
        ).populate('name').populate('resource');
        
        if (!item) {
            throw new Error('Item not found');
        }
        
        return item;
    } catch (error) {
        if (error.name === 'CastError') {
            throw new Error('Invalid ID format');
        }
        throw new Error(`Error adding resource to item: ${error.message}`);
    }
};

// Remove resource from item function
const removeResourceFromItem = async (itemId, resourceId) => {
    try {
        const item = await Item.findByIdAndUpdate(
            itemId,
            { $pull: { resource: resourceId } },
            { 
                new: true,
                runValidators: true
            }
        ).populate('name').populate('resource');
        
        if (!item) {
            throw new Error('Item not found');
        }
        
        return item;
    } catch (error) {
        if (error.name === 'CastError') {
            throw new Error('Invalid ID format');
        }
        throw new Error(`Error removing resource from item: ${error.message}`);
    }
};

// Get items by name reference function
const getItemsByName = async (nameId) => {
    try {
        const items = await Item.find({ name: nameId }).populate('name').populate('resource');
        return items;
    } catch (error) {
        if (error.name === 'CastError') {
            throw new Error('Invalid name ID format');
        }
        throw new Error(`Error fetching items by name: ${error.message}`);
    }
};

// Validate item data function
const validateItemData = (itemData) => {
    const errors = {};

    if (!itemData.name) {
        errors.name = 'Name reference is required';
    }

    if (itemData.resource && !Array.isArray(itemData.resource)) {
        errors.resource = 'Resource must be an array';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Export all functions as ItemService object
const ItemService = {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    addResourceToItem,
    removeResourceFromItem,
    getItemsByName,
    validateItemData
};

module.exports = ItemService;
