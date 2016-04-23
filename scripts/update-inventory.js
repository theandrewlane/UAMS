/**
 * Given a Product_ID, add/remove inventory related inventory
 *
 * @param {number} productID - The ID of the product to update
 *@param {number} inventory - The number of inventory to be added to the current inventory
 */


/**
-	Function Name: updateInventory()
-	Function Description: This function is designed to be called after an order has placed, or when a business has restocked – It will update a product’s inventory amount accordingly.
-	Input Parameter 1: ProductId (integer) – This is the corresponding ProductID, that will be updated.
-	Input Parameter 2: Inventory (integer) – This is a positive or negative integer. The value of this parameter will be added/subtracted from productInventory.

**/

'use strict';
const updateInventory = (productID, inventory) => {
    productModel.findOne({product_id: productID}, (err, prod) => {
        if (prod = null) {
        console.info(`Unable to update ProductID: ${productID}`);
            return console.error(err);
        }
        prod.productInventory += inventory;
        prod.save(err => {
            if (err) return (err);
            console.info(`Successfully updated ProductID: ${productID}. Updated inventory is now: ${prod.productInventory}`);
        });
    });
};
