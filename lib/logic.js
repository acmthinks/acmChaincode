/**
 * New script file
 * @param{com.ibm.demo.telecomm.Txn} tx
 * @transaction
 */

function txn(tx) {

    // Save the old value of the asset.
    var oldValue = tx.phone.value;

    // Update the asset with the new value.
    tx.phone.value = tx.newValue;

    // Get the asset registry for the asset.
    return getPhoneRegistry('com.ibm.demo.telecomm.Phone')
        .then(function (phoneRegistry) {

            // Update the asset in the asset registry.
            return phoneRegistry.update(tx.phone);

        })
        .then(function () {

            // Emit an event for the modified asset.
            var event = getFactory().newEvent('com.ibm.demo.telecomm', 'Activation');
            event.phone = tx.phone;
            event.oldValue = oldValue;
            event.newValue = tx.newValue;
            emit(event);

        });

}
