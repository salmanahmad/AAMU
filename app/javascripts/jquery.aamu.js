(function($) {
  
  var methods = {
    init : function(options) {
      
      var settings = $.extend({
        'delay-time' : 0
      }, options);
      
      return this.each(function() {
         
        var $this = $(this);
        var data = $this.data('aamu');
        
        var menu_open = false
        
        function open_menu(item) {
          $(item).siblings("ul.aamu-menu").hide()
          
          
          var menu = $(item).next("ul.aamu-menu");
          $(menu).show();
          
          
          
          var padding_difference = parseInt($(item).css("padding-left")) / 2;
          
          
          $(menu).css("left", $(item).position().left - padding_difference)
          $(menu).css("top", $(item).position().top + $(item).outerHeight(true) - 1)
          
          $(item).siblings(".selected").removeClass("selected");
          $(item).addClass("selected");
        }
        
        function close_menu(item) {
          $(item).siblings("ul.aamu-menu").hide()
          $(item).next("ul.aamu-menu").hide();
          $(item).removeClass("selected")
        }
        
        
        $this.children("li").click(function() {
          if($(this).is(".selected")) {
            close_menu(this)
            menu_open = false
          } else {
            open_menu(this)
            menu_open = true
          }
        });
        
        $this.children("li").hover(function() {
          if(menu_open) {
            $(this).siblings(".selected").removeClass("selected")
            $(this).addClass("selected");
            open_menu(this);
          }
        })
       
      });
    },
     
    destroy : function( ) {
      return this.each(function(){
        
      })
    }
  };
  
  $.fn.aamu = function(method) {
    
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.aamu');
    }
  };
  
})( jQuery );
