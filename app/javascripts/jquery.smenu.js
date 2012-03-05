(function($) {
  
  var methods = {
    init : function(options) {
      
      var settings = $.extend({
        aamu : false,
        delay_time : 0,
      }, options);
      
      return this.each(function() {
        
        
        
        var $this = $(this);
        var data = $this.data('smenu');
        
        var menu_open = false
        
        function close_all_menus() {
          $this.find("ul").hide();
          $this.find(".selected").removeClass("selected");
          menu_open = false;
        }
        
        function open_menu(item) {
          $(item).siblings("ul.smenu-menu").hide()
          
          $(item).parent().find(".selected").removeClass("selected");
          $(item).parent().find("ul.smenu-menu").hide();
          
          var menu = $(item).next("ul.smenu-menu");
          $(menu).show();
          
          var padding_difference = parseInt($(item).css("padding-left")) / 2;
          
          $(menu).css("left", $(item).position().left - padding_difference)
          $(menu).css("top", $(item).position().top + $(item).outerHeight(true) - 1)
          
          $(item).siblings(".selected").removeClass("selected");
          $(item).addClass("selected");
        }
        
        function close_menu(item) {
          $(item).siblings("ul.smenu-menu").hide()
          $(item).next("ul.smenu-menu").hide();
          $(item).removeClass("selected");
        }
        
        
        function expand_menu(item) {
          open_menu(item);
          var menu = $(item).next("ul.smenu-menu");
          if(menu) {
            var width = $(menu).width();
            $(menu).css("left", $(item).position().left + $(item).outerWidth(true))
            $(menu).css("top", $(item).position().top - 1)
            $(menu).css("width", width)
          }
        }
        
        function collapse_menu(item) {
          close_menu(item);
        }
        
        $(document).click(function(event) {
          
          if($this.find($(event.target)).size() == 0) {
            close_all_menus();
          }
          
        });
        
        $this.find("ul.smenu-menu li").each(function() {
          
          if($(this).next().is("ul.smenu-menu")) {
            var disclosure = $("<span class='smenu-item-expander'>&rsaquo;</span>")
            $(disclosure).appendTo($(this));
          }
        });
        
        
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
            open_menu(this);
          }
        })
        
        $this.find("ul li").hover(function() {
          expand_menu(this)
        });
       
      });
    },
     
    destroy : function( ) {
      return this.each(function(){
        // TODO... Or not...
      })
    }
  };
  
  $.fn.smenu = function(method) {
    
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.smenu');
    }
  };
  
})( jQuery );
