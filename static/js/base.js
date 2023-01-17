$(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
        $('.go-top').addClass('show')
    }
    else {
        $('.go-top').removeClass('show')
    }

    if ($(this).scrollTop() < 500) {
        $('.go-bottom').addClass('show')
    }
    else {
        $('.go-bottom').removeClass('show')
    }

    $('body').css('background-position', 'center ' + (-window.pageYOffset / 8) + 'px')
    $('.header-paralax').css('background-position', 'center ' + (-window.pageYOffset / 2) + 'px')

    $('.paralax').each(function() {
        var position = (-window.pageYOffset) + $(this).offset().top

        position = -(position / 8)

        if (position >= ($(this).height() + $(this).height() / 2)) {
            position = 'bottom'
        }
        else if (position < -($(this).height() / 2)) {
            position = 'top'
        }
        else {
            position += 'px'
        }

        console.log(position)

        $(this).css('background-position', 'center ' + position)
    })
})

(function($, window) {
    $.fn.center = function() {

        return this.each(function() {
            // Store the jQuery object for future reference
            var element = $(this)

            var parent = element.data('parent')

            function center() {
                element.css('position', 'absolute')
                element.css('top', Math.max(0, (($(parent).height() - $(element).outerHeight()) / 2) +
                        $(parent).scrollTop()) + 'px')
                element.css('left', Math.max(0, (($(parent).width() - $(element).outerWidth()) / 2) +
                        $(parent).scrollLeft()) + 'px')
            }

            center()

            $(window).resize(function() {
                center()
            })

            return element
        })

    }

    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $()

    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function(options) {

        // the element we really care about
        // is the dropdown-toggle's parent
        $allDropdowns = $allDropdowns.add(this.parent())

        return this.each(function() {
            var $this = $(this),
                $parent = $this.parent(),
                defaults = {
                    delay: 500,
                    instantlyCloseOthers: true,
                },
                data = {
                    delay: $(this).data('delay'),
                    instantlyCloseOthers: $(this).data('close-others'),
                },
                settings = $.extend(true, {}, defaults, options, data),
                timeout

            $parent.hover(function(event) {

                // so a neighbor can't open the dropdown
                if (!$parent.hasClass('open') && !$this.is(event.target)) {
                    return true
                }

                if (settings.instantlyCloseOthers === true) {
                    $allDropdowns.removeClass('open')
                }

                window.clearTimeout(timeout)
                $parent.addClass('open')
            }, function() {
                timeout = window.setTimeout(function() {
                    $parent.removeClass('open')
                }, settings.delay)
            })

            // this helps with button groups!
            $this.hover(function() {
                if (settings.instantlyCloseOthers === true) {
                    $allDropdowns.removeClass('open')
                }

                window.clearTimeout(timeout)
                $parent.addClass('open')
            })

            // handle submenus
            $parent.find('.dropdown-submenu').each(function() {
                var $this = $(this)
                var subTimeout

                $this.hover(function() {

                    window.clearTimeout(subTimeout)
                    $this.children('.dropdown-menu').show()
                    // always close submenu siblings instantly

                    $this.siblings().children('.dropdown-menu').hide()
                }, function() {
                    var $submenu = $this.children('.dropdown-menu')
                    subTimeout = window.setTimeout(function() {

                        $submenu.hide()
                    }, settings.delay)
                })
            })
        })
    }

})(jQuery, window, document)