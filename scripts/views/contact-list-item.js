
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
      _.bindAll(this, 'render', 'remove', 'details');

      /* Bind events to their functions */
      this.model.bind('remove', this.unrender);
    },

    /* Create the HTML that will be displayed on the DOM */
    render: function(){
      $(this.el).html('<i class="glyphicon glyphicon-user"></i> <span class="details" style="cursor: pointer" title="See contact details" data-toggle="tooltip" data-placement="bottom">'+ this.model.get('fullName') +' - '+ this.model.get('city')+ '</span><span class="remove pull-right" style="cursor:pointer; color:red;"><i class="glyphicon glyphicon-trash" title="Remove contact" data-toggle="tooltip" data-placement="bottom"></i></span>');
      $(this.el).addClass("list-group-item");
      return this;
    },

    /* Destroy the model */
    remove: function(event){

      /* Destroy the model */
      this.model.destroy();

      /* Render again the list */
      listView.render();
    },

    /* Open contact details */
    details: function(){

      /* Render contact details */
      contactDetails.render(this.model);

      /* Remove previous active element */
      $(".list-group-item.active").removeClass("active");

      /* Mark as active */
      $(this.el).addClass("active");

      /* Scroll to view */
      setTimeout(function(){
        var newTop = $("#contact-details > h2").offset().top;
        $("html,body").animate({scrollTop: newTop}, "normal");
      }, 100);
    }
  });
