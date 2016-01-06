
  /* Dedicated collection for contact list */
  var ContactList = Backbone.Collection.extend({
    model: ContactModel,

    /* Allow us to sort the collection */
    comparator: function(contact) {
      return contact.get('fullName');
    }
  });
