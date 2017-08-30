/**
 * New script file
 * @param{com.ibm.demo.telecomm.Txn} tx
 * @transaction
 */
function txn(tx) {
    // Save the old value of the asset.
    var oldValue = tx.phone.owner.firstName;

    // Update the asset with the new value.
    tx.phone.owner.firstName = tx.newValue;

    // Get the asset registry for the asset.
    return getAssetRegistry('com.ibm.demo.telecomm.Phone')
        .then(function (assetRegistry) {

            // Update the asset in the asset registry.
            return assetRegistry.update(tx.phone);

        })
        .then(function () {

            // Emit an event for the modified asset.
            var event = getFactory().newEvent('com.ibm.demo.telecomm', 'Activation');
            event.phone = tx.phone;
            event.oldValue = tx.phone.owner.firstName;
            event.newValue = tx.newValue;
            emit(event);

        });
  
}
