
/* Dedicated view for contacts list */
var ContactListView = Backbone.View.extend({

  /* Set our wrapper */
  el: $('#contact-list'),

  /* Event listeners */
  events: {
    'click button#new': 'newContact',
    'keyup #full-name': 'nextField',
    'keyup #city': 'submitForm'
  },

  /* Init tasks */
  initialize: function(){

    /* Bind everything */
    _.bindAll(this, 'render', 'newContact', 'appendContact', 'cleanList', 'nextField', 'submitForm');

    /* Create a new collection */
    this.contactList = new ContactList();
    this.contactList.bind('add', this.appendContact);

    /* Set the focus on this field */
    $("#full-name").focus();

    this.render();
  },

  /* Display our contact lists into the DOM */
  render: function(){
    var self = this;

    /* Clean previous drawed list */
    this.cleanList();

    /* Append all items from our collection */
    _(this.contactList.models).each(function(contact){
      self.appendContact(contact);
    }, this);

    /* Enables bootstrap tooltips */
    $('[data-toggle="tooltip"]').tooltip();
  },

  /* Add a new contact to our collection */
  newContact: function(){

    /* Create new contact model, and get data */
    var contact = new ContactModel();
    contact.set({
      fullName: $("#full-name").val(),
      city: $("#city").val()
    });

    /* Add it to the collection */
    this.contactList.add(contact);

    /* Render the list again (including the new item) */
    this.render();

    /* Empty form fields */
    $("#full-name").val("");
    $("#city").val("");

    /* Set the focus on this field */
    $("#full-name").focus();
  },

  /* Append the contact into the DOM */
  appendContact: function(contact){

    /* Create a new view for this contact */
    var contactView = new ContactView({
      model: contact
    });

    /* Append the contact's view into the DOM
    /* more info on scripts/views/contact-list-item.js */
    $('ul.list-group', this.el).append(contactView.render().el);
  },

  /* Clean the contacts list (DOM) */
  cleanList: function(){
    $('ul.list-group', this.el).html('');
  },

  /* Detect if the user press Enter on "fullName" field, and autofocus "city" field */
  nextField: function(event){
    if(event.keyCode == 13){
      $("#city").focus();
    }
  },

  /* Detect if the user press Enter on "city" and create a new contact */
  submitForm: function(event){
    if(event.keyCode == 13){
      this.newContact();
    }
  }
});

/* Init our view */
var listView = new ContactListView();
