
  /* Dedicated view for each contact */
  var ContactView = Backbone.View.extend({

    /* Set our wrapper */
    tagName: 'li',

    /* Event listeners */
    events: {
      'click span.remove': 'remove',
      'click span.details': 'details'
    },

    /* Init tasks */
    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'remove', 'details');

      /* Bind events to their functions */
      this.model.bind('remove', this.unrender);
    },

    /* Create the HTML that will be displayed on the DOM */
    render: function(){
      $(this.el).html('<span class="details" style="cursor: pointer"><i class="glyphicon glyphicon-user"></i> <span title="See contact details" data-toggle="tooltip" data-placement="bottom">'+ this.model.get('fullName') +' - '+ this.model.get('city')+ '</span><span class="remove pull-right" style="cursor:pointer; color:red;"><i class="glyphicon glyphicon-trash" title="Remove contact" data-toggle="tooltip" data-placement="bottom"></i></span></span>');
      $(this.el).addClass("list-group-item");
      return this;
    },

    /* Remove model from the DOM */
    unrender: function(){
      $(this.el).remove();
    },

    /* Destroy the model */
    remove: function(){
      this.model.destroy();
    },

    /* Open contact details */
    details: function(){
      contactDetails.render(this.model);
    }
  });
