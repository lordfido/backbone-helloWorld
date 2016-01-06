
/* Dedicated view for contacts list */
var ContactDetailsView = Backbone.View.extend({

  /* Set our wrapper */
  el: $('#contact-details'),

  /* Event listeners */
  events: {

  },

  /* Init tasks */
  initialize: function(){

    /* Bind everything */
    _.bindAll(this, 'render');
  },

  /* Display our contact lists into the DOM */
  render: function(contact){
    var self = this;

    $(this.el).load("scripts/templates/contact-details.html");
    $('#details-fullName', this.el).html( contact.get('fullName') );
    $('#details-city', this.el).html( contact.get('city') );
  }
});

/* Init our view */
var contactDetails = new ContactDetailsView();
