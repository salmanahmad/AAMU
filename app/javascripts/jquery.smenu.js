(function($) {

    var methods = {
        init: function(options) {

            return this.each(function() {

                var settings = $.extend({
                    aamu: false,
                    expand_activation_area: false,
                    delay_time: 0
                },
                options);

                var $this = $(this);
                var data = $this.data('smenu');

                var activation_area_item = null
                var activation_area = $("<canvas class='smenu-menu-activiation-area' />");
                $(activation_area).appendTo($this);


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

                    if ($(menu).size != 0) {
                        $(menu).show();
                    }

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
                    if ($(menu).size() != 0) {
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
                    if ($this.find($(event.target)).size() == 0) {
                        close_all_menus();
                    }
                });

                $this.find("ul.smenu-menu li").each(function() {

                    if ($(this).next().is("ul.smenu-menu")) {
                        var disclosure = $("<span class='smenu-item-expander'>&rsaquo;</span>")
                        $(disclosure).appendTo($(this));
                    }
                });


                $this.children("li").click(function() {
                    $(activation_area).hide();

                    if ($(this).is(".selected")) {
                        close_menu(this)
                        menu_open = false
                    } else {
                        open_menu(this)
                        menu_open = true
                    }
                });

                $this.children("li").hover(function() {
                    $(activation_area).hide();

                    if (menu_open) {
                        open_menu(this);
                    }
                })

                $this.find("ul li").mousemove(function(e) {
                    expand_menu(this)

                    var menu = $(this).next("ul.smenu-menu");

                    if (settings.aamu && $(menu).size() != 0) {

                        if ($(activation_area).is(":visible")) {
                            if (!settings.expand_activation_area) {
                                return
                            }
                        }

                        activation_area_item = $(this)

                        var x = e.pageX - $(this).offset().left;
                        var y = e.pageY - $(this).offset().top;

                        var height = $(menu).outerHeight(true)
                        var width = $(this).outerWidth(true) - x

                        $(activation_area).show();
                        $(activation_area).appendTo($(menu).parent());
                        $(activation_area).height(height)
                        $(activation_area).width(width)

                        $(activation_area).css("top", $(menu).position().top)
                        $(activation_area).css("left", $(menu).position().left - width)

                        var canvas = $(activation_area)[0]
                        canvas.height = height
                        canvas.width = width
                        if (canvas.getContext) {
                            var context = canvas.getContext('2d');

                            context.clearRect(0, 0, width, height);

                            context.fillStyle = "rgba(0,0,0,.1)"

                            context.beginPath();
                            context.moveTo(0, y);
                            //context.moveTo(0,0);
                            context.lineTo(width, 0);
                            context.lineTo(width, height);
                            context.fill();
                        }
                    } else {
                        $(activation_area).hide();
                    }

                    $(activation_area).mousemove(function(e) {

                        var x = e.pageX - $(activation_area).offset().left;
                        var y = e.pageY - $(activation_area).offset().top;

                        var canvas = $(activation_area)[0];
                        if (canvas.getContext) {
                            var context = canvas.getContext('2d');
                            var data = context.getImageData(x, y, 1, 1);
                            var pixel = data.data;
                            var color = pixel[0] + pixel[1] + pixel[2] + pixel[3]

                            if (color == 0 && y > $(activation_area_item).outerHeight()) {
                                $(this).hide();
                            }
                        }
                    });

                });

            });
        },

        destroy: function() {
            return this.each(function() {
                // TODO... Or not...
                })
        }
    };

    $.fn.smenu = function(method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.smenu');
        }
    };

})(jQuery);
