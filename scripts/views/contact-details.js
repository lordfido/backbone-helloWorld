
/* Dedicated view for contacts list */
var ContactDetailsView = Backbone.View.extend({

  /* Set our wrapper */
  el: $('#contact-details'),

  /* Event listeners */
  events: {
    'click button#close': 'close',
    'click button#save': 'save',
    'click button#remove': 'remove'
  },

  /* Init tasks */
  initialize: function(){

    /* Bind everything */
    _.bindAll(this, 'render', 'close', 'remove');

    /* Set a variable for this contact */
    this.contact;
  },

  /* Display our contact lists into the DOM */
  render: function(contact){
    var self = this;

    /* Store the contact */
    this.contact = contact;

    /* Load the template */
    $(this.el).load("scripts/templates/contact-details.html", function(){

      /* Write contact details */
      $('#details-fullName', this.el).val( contact.get('fullName') );
      $('#details-email', this.el).val( contact.get('email') );
      $('#details-phone', this.el).val( contact.get('phone') );
      $('#details-address', this.el).val( contact.get('address') );
      $('#details-city', this.el).val( contact.get('city') );
      $('#details-state', this.el).val( contact.get('state') );
    });
  },

  /* Close details */
  close: function(){

    /* Remove details content */
    $(this.el).html("");

    /* Remove active item from the list */
    $(".list-group-item.active").removeClass("active");
  },

  /* Save contact details */
  save: function(){

    /* Stores all data */
    this.contact.set({
      fullName: $("#details-fullName").val(),
      email:    $("#details-email").val(),
      phone:    $("#details-phone").val(),
      address:  $("#details-address").val(),
      city:     $("#details-city").val(),
      state:    $("#details-state").val()
    });

    /* Look for our model, in the collection */
    for(var x in listView.contactList.models){
      var model = listView.contactList.models[x];

      /* If it's the same item */
      if(model.cid === this.contact.cid){

        /* Replace it */
        model = this.contact;
        break;
      }
    }

    /* Render the view again */
    listView.render();

    /* Create a notification */
    this.notify(false);
  },

  /* Remove this contact */
  remove: function(){

    /* Look for our model, in the collection */
    for(var x in listView.contactList.models){
      var model = listView.contactList.models[x];

      /* If it's the same item */
      if(model.cid === this.contact.cid){

        /* Destroy it */
        model.destroy();
        break;
      }
    }

    /* Render the view again */
    listView.render();

    /* Close details panel */
    this.close();
  },

  notify: function(error){

    /* Create a unique ID for this notification */
    var notifId = Math.random();

    /* Load the notification */
    if(!error){ var template = "scripts/templates/success-saving-contact.html"; }
    else{       var template = "scripts/templates/error-saving-contact.html"; }
    $("#notifications", this.el).load(template);

    /* Scroll to view */
    setTimeout(function(){

      /* Assign the ID to last notification */
      var notif = $("#notifications", this.el).children(".alert").last()[0];
      $(notif).attr("data-cust-id", notifId);

      /* Scroll to notification */
      var newTop = $(notif).offset().top;
      $("html,body").animate({scrollTop: newTop}, "normal");

      /* Autoclose notification */
      setTimeout(function(){
        $("*[data-cust-id='"+ notifId +"']").remove();
      }, 5000);
    }, 100);
  }
});

/* Init our view */
var contactDetails = new ContactDetailsView();
