var addthis_config={data_track_addressbar:!0};

$(window).load(function() {
    $('.before-after').twentytwenty()
})

$(document).ready(function() {

    // Animate the scroll to top
    $('.anchor').on('click', function(event) {
        event.preventDefault()
        var hash = $(this).data('href')

        $('html, body').animate({scrollTop: $(hash).offset().top}, 300, function() {
            //window.location.hash = hash
        })
    })

    $('body').tooltip({
        selector: '[data-toggle="tooltip"]',
    })

    $('#main-navigation .dropdown-menu').bind('click', function(e) {
        e.stopPropagation()
    })

    var $tabs = $('.nav-tabs li')

    $('#prevtab:not(.skip), .prevtab:not(.skip)').on('click', function() {
        $tabs.filter('.active').prevAll('li:not(.skip)').first().find('a[data-toggle="tab"]').tab('show')
    })

    $('#nexttab:not(.skip), .nexttab:not(.skip)').on('click', function() {
        $tabs.filter('.active').nextAll('li:not(.skip)').first().find('a[data-toggle="tab"]').tab('show')
    })

    $('.nav .disabled').on('click', function(e) {
        e.preventDefault()
        return false
    })

    $('.vertical-scroll').mCustomScrollbar({
        scrollButtons: {
            enable: false,
        },
        scrollInertia: 200,
        advanced: {autoExpandVerticalScroll: true, updateOnContentResize: true},
        mouseWheelPixels: 'auto',
    })
    $('.horizontal-scroll').mCustomScrollbar({
        horizontalScroll: true,
        scrollButtons: {
            enable: false,
        },
        scrollInertia: 200,
        advanced: {autoExpandHorizontalScroll: true, updateOnContentResize: true},
    })
})

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

$(document).on('click', '[data-remove-remember]', function(e) {
    $.cookie($(this).data('remove-remember'), '-1', {expires: 9999, path: '/', secure: false})
});

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

$('.carousel').on('slide.bs.carousel', function() {

    $(this).find('iframe').remove()
})

$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
    event.preventDefault()
    $(this).ekkoLightbox()
})

$(document).delegate('*[data-toggle="lightbox-hover"]', 'mouseover', function(event) {
    event.preventDefault()
    $(this).ekkoLightbox()
})

$(document).delegate('*[data-remote]', 'mouseenter', function() {
    var element = $(this)

    var remoteData = element.attr('data-content')

    function showPopup(data) {
        element.popover({
            html: true,
            content: data,
            placement: 'auto top',
            class: 'unit-popover',
            container: 'body',
            template: '<div class="popover unit-popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
            delay: {
                show: '500',
                hide: '100',
            },
        }).popover('show')
    }

    setTimeout(function() {

        if (element.is(':hover')) {

            if (!remoteData || element.attr('data-group-cached') != element.attr('data-group')) {
                element.attr('data-content', '')
                showPopup('<i class="fa fa-circle-o-notch fa-spin text-white"></i>')

                $.ajax({
                    url: element.attr('data-remote'),
                    dataType: 'html',
                    cache: true,
                    success: function(data) {
                        element.attr('data-content', data)
                        showPopup(data)
                        element.attr('data-group-cached', element.attr('data-group'))
                    },
                })
            } else {
                showPopup(remoteData)
            }

            element.mouseleave(function() {
                $('.popover:visible').popover('destroy')
            })
        }

    }, 500)
})

// Animate the scroll to top
$('.anchor-link').click(function(event) {
    event.preventDefault()
    var hash = $(this).attr('href')
    $('html, body').animate({scrollTop: $(hash).offset().top}, 300, function() {
        window.location.hash = hash
    })
})

$(window).load(function() {
    $('.js-center').center()
})
$(document).on('click', '[data-image]', function (e) {

    e.preventDefault();

    var element = $(this);
    insertImage(element);
});

function insertImage (element) {

    var container = element;
    var video = '<a href="' + element.data('image') + '" target="_blank"><img src="' + element.data('image') + '" class="img-thumbnail"></a>';

    if (element.data('container') != undefined) {
        container = $(element.data('container'));
    }

    if (element.data('removeitem') != undefined) {
        $(element.data('removeitem')).remove();
    }

    if (element.data('replacecontent') != undefined) {
        container.html(video);
    }
    else {
        container.append(video);
    }

    if (element.data('removeitem') != undefined) {
        container = $(element.data('container')).find(element.data('removeitem')).remove();
    }
}
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([ 'jquery' ], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode (s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode (s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue (value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue (s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {}
    }

    function read (s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[ i ].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[ name ] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));

// jquery.event.move
//
// 1.3.6
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.


(function (module) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], module);
	} else {
		// Browser globals
		module(jQuery);
	}
})(function(jQuery, undefined){

	var // Number of pixels a pressed pointer travels before movestart
	    // event is fired.
	    threshold = 6,
	
	    add = jQuery.event.add,
	
	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    // Shim for requestAnimationFrame, falling back to timer. See:
	    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    requestFrame = (function(){
	    	return (
	    		window.requestAnimationFrame ||
	    		window.webkitRequestAnimationFrame ||
	    		window.mozRequestAnimationFrame ||
	    		window.oRequestAnimationFrame ||
	    		window.msRequestAnimationFrame ||
	    		function(fn, element){
	    			return window.setTimeout(function(){
	    				fn();
	    			}, 25);
	    		}
	    	);
	    })(),
	    
	    ignoreTags = {
	    	textarea: true,
	    	input: true,
	    	select: true,
	    	button: true
	    },
	    
	    mouseevents = {
	    	move: 'mousemove',
	    	cancel: 'mouseup dragstart',
	    	end: 'mouseup'
	    },
	    
	    touchevents = {
	    	move: 'touchmove',
	    	cancel: 'touchend',
	    	end: 'touchend'
	    };


	// Constructors
	
	function Timer(fn){
		var callback = fn,
		    active = false,
		    running = false;
		
		function trigger(time) {
			if (active){
				callback();
				requestFrame(trigger);
				running = true;
				active = false;
			}
			else {
				running = false;
			}
		}
		
		this.kick = function(fn) {
			active = true;
			if (!running) { trigger(); }
		};
		
		this.end = function(fn) {
			var cb = callback;
			
			if (!fn) { return; }
			
			// If the timer is not running, simply call the end callback.
			if (!running) {
				fn();
			}
			// If the timer is running, and has been kicked lately, then
			// queue up the current callback and the end callback, otherwise
			// just the end callback.
			else {
				callback = active ?
					function(){ cb(); fn(); } : 
					fn ;
				
				active = true;
			}
		};
	}


	// Functions
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	function preventDefault(e) {
		e.preventDefault();
	}
	
	function preventIgnoreTags(e) {
		// Don't prevent interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }
		
		e.preventDefault();
	}

	function isLeftButton(e) {
		// Ignore mousedowns on any button other than the left (or primary)
		// mouse button, or when a modifier key is pressed.
		return (e.which === 1 && !e.ctrlKey && !e.altKey);
	}

	function identifiedTouch(touchList, id) {
		var i, l;

		if (touchList.identifiedTouch) {
			return touchList.identifiedTouch(id);
		}
		
		// touchList.identifiedTouch() does not exist in
		// webkit yet… we must do the search ourselves...
		
		i = -1;
		l = touchList.length;
		
		while (++i < l) {
			if (touchList[i].identifier === id) {
				return touchList[i];
			}
		}
	}

	function changedTouch(e, event) {
		var touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		// Chrome Android (at least) includes touches that have not
		// changed in e.changedTouches. That's a bit annoying. Check
		// that this touch has changed.
		if (touch.pageX === event.pageX && touch.pageY === event.pageY) { return; }

		return touch;
	}


	// Handlers that decide when the first movestart is triggered
	
	function mousedown(e){
		var data;

		if (!isLeftButton(e)) { return; }

		data = {
			target: e.target,
			startX: e.pageX,
			startY: e.pageY,
			timeStamp: e.timeStamp
		};

		add(document, mouseevents.move, mousemove, data);
		add(document, mouseevents.cancel, mouseend, data);
	}

	function mousemove(e){
		var data = e.data;

		checkThreshold(e, data, e, removeMouse);
	}

	function mouseend(e) {
		removeMouse();
	}

	function removeMouse() {
		remove(document, mouseevents.move, mousemove);
		remove(document, mouseevents.cancel, mouseend);
	}

	function touchstart(e) {
		var touch, template;

		// Don't get in the way of interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

		touch = e.changedTouches[0];
		
		// iOS live updates the touch objects whereas Android gives us copies.
		// That means we can't trust the touchstart object to stay the same,
		// so we must copy the data. This object acts as a template for
		// movestart, move and moveend event objects.
		template = {
			target: touch.target,
			startX: touch.pageX,
			startY: touch.pageY,
			timeStamp: e.timeStamp,
			identifier: touch.identifier
		};

		// Use the touch identifier as a namespace, so that we can later
		// remove handlers pertaining only to this touch.
		add(document, touchevents.move + '.' + touch.identifier, touchmove, template);
		add(document, touchevents.cancel + '.' + touch.identifier, touchend, template);
	}

	function touchmove(e){
		var data = e.data,
		    touch = changedTouch(e, data);

		if (!touch) { return; }

		checkThreshold(e, data, touch, removeTouch);
	}

	function touchend(e) {
		var template = e.data,
		    touch = identifiedTouch(e.changedTouches, template.identifier);

		if (!touch) { return; }

		removeTouch(template.identifier);
	}

	function removeTouch(identifier) {
		remove(document, '.' + identifier, touchmove);
		remove(document, '.' + identifier, touchend);
	}


	// Logic for deciding when to trigger a movestart.

	function checkThreshold(e, template, touch, fn) {
		var distX = touch.pageX - template.startX,
		    distY = touch.pageY - template.startY;

		// Do nothing if the threshold has not been crossed.
		if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

		triggerStart(e, template, touch, distX, distY, fn);
	}

	function handled() {
		// this._handled should return false once, and after return true.
		this._handled = returnTrue;
		return false;
	}

	function flagAsHandled(e) {
		e._handled();
	}

	function triggerStart(e, template, touch, distX, distY, fn) {
		var node = template.target,
		    touches, time;

		touches = e.targetTouches;
		time = e.timeStamp - template.timeStamp;

		// Create a movestart object with some special properties that
		// are passed only to the movestart handlers.
		template.type = 'movestart';
		template.distX = distX;
		template.distY = distY;
		template.deltaX = distX;
		template.deltaY = distY;
		template.pageX = touch.pageX;
		template.pageY = touch.pageY;
		template.velocityX = distX / time;
		template.velocityY = distY / time;
		template.targetTouches = touches;
		template.finger = touches ?
			touches.length :
			1 ;

		// The _handled method is fired to tell the default movestart
		// handler that one of the move events is bound.
		template._handled = handled;
			
		// Pass the touchmove event so it can be prevented if or when
		// movestart is handled.
		template._preventTouchmoveDefault = function() {
			e.preventDefault();
		};

		// Trigger the movestart event.
		trigger(template.target, template);

		// Unbind handlers that tracked the touch or mouse up till now.
		fn(template.identifier);
	}


	// Handlers that control what happens following a movestart

	function activeMousemove(e) {
		var timer = e.data.timer;

		e.data.touch = e;
		e.data.timeStamp = e.timeStamp;
		timer.kick();
	}

	function activeMouseend(e) {
		var event = e.data.event,
		    timer = e.data.timer;
		
		removeActiveMouse();

		endEvent(event, timer, function() {
			// Unbind the click suppressor, waiting until after mouseup
			// has been handled.
			setTimeout(function(){
				remove(event.target, 'click', returnFalse);
			}, 0);
		});
	}

	function removeActiveMouse(event) {
		remove(document, mouseevents.move, activeMousemove);
		remove(document, mouseevents.end, activeMouseend);
	}

	function activeTouchmove(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = changedTouch(e, event);

		if (!touch) { return; }

		// Stop the interface from gesturing
		e.preventDefault();

		event.targetTouches = e.targetTouches;
		e.data.touch = touch;
		e.data.timeStamp = e.timeStamp;
		timer.kick();
	}

	function activeTouchend(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		removeActiveTouch(event);
		endEvent(event, timer);
	}

	function removeActiveTouch(event) {
		remove(document, '.' + event.identifier, activeTouchmove);
		remove(document, '.' + event.identifier, activeTouchend);
	}


	// Logic for triggering move and moveend events

	function updateEvent(event, touch, timeStamp, timer) {
		var time = timeStamp - event.timeStamp;

		event.type = 'move';
		event.distX =  touch.pageX - event.startX;
		event.distY =  touch.pageY - event.startY;
		event.deltaX = touch.pageX - event.pageX;
		event.deltaY = touch.pageY - event.pageY;
		
		// Average the velocity of the last few events using a decay
		// curve to even out spurious jumps in values.
		event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
		event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
		event.pageX =  touch.pageX;
		event.pageY =  touch.pageY;
	}

	function endEvent(event, timer, fn) {
		timer.end(function(){
			event.type = 'moveend';

			trigger(event.target, event);
			
			return fn && fn();
		});
	}


	// jQuery special event definition

	function setup(data, namespaces, eventHandle) {
		// Stop the node from being dragged
		//add(this, 'dragstart.move drag.move', preventDefault);
		
		// Prevent text selection and touch interface scrolling
		//add(this, 'mousedown.move', preventIgnoreTags);
		
		// Tell movestart default handler that we've handled this
		add(this, 'movestart.move', flagAsHandled);

		// Don't bind to the DOM. For speed.
		return true;
	}
	
	function teardown(namespaces) {
		remove(this, 'dragstart drag', preventDefault);
		remove(this, 'mousedown touchstart', preventIgnoreTags);
		remove(this, 'movestart', flagAsHandled);
		
		// Don't bind to the DOM. For speed.
		return true;
	}
	
	function addMethod(handleObj) {
		// We're not interested in preventing defaults for handlers that
		// come from internal move or moveend bindings
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		// Stop the node from being dragged
		add(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid, preventDefault, undefined, handleObj.selector);
		
		// Prevent text selection and touch interface scrolling
		add(this, 'mousedown.' + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
	}
	
	function removeMethod(handleObj) {
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		remove(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid);
		remove(this, 'mousedown.' + handleObj.guid);
	}
	
	jQuery.event.special.movestart = {
		setup: setup,
		teardown: teardown,
		add: addMethod,
		remove: removeMethod,

		_default: function(e) {
			var event, data;
			
			// If no move events were bound to any ancestors of this
			// target, high tail it out of here.
			if (!e._handled()) { return; }

			function update(time) {
				updateEvent(event, data.touch, data.timeStamp);
				trigger(e.target, event);
			}

			event = {
				target: e.target,
				startX: e.startX,
				startY: e.startY,
				pageX: e.pageX,
				pageY: e.pageY,
				distX: e.distX,
				distY: e.distY,
				deltaX: e.deltaX,
				deltaY: e.deltaY,
				velocityX: e.velocityX,
				velocityY: e.velocityY,
				timeStamp: e.timeStamp,
				identifier: e.identifier,
				targetTouches: e.targetTouches,
				finger: e.finger
			};

			data = {
				event: event,
				timer: new Timer(update),
				touch: undefined,
				timeStamp: undefined
			};
			
			if (e.identifier === undefined) {
				// We're dealing with a mouse
				// Stop clicks from propagating during a move
				add(e.target, 'click', returnFalse);
				add(document, mouseevents.move, activeMousemove, data);
				add(document, mouseevents.end, activeMouseend, data);
			}
			else {
				// We're dealing with a touch. Stop touchmove doing
				// anything defaulty.
				e._preventTouchmoveDefault();
				add(document, touchevents.move + '.' + e.identifier, activeTouchmove, data);
				add(document, touchevents.end + '.' + e.identifier, activeTouchend, data);
			}
		}
	};

	jQuery.event.special.move = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.move', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.move', jQuery.noop);
		}
	};
	
	jQuery.event.special.moveend = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.moveend', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.moveend', jQuery.noop);
		}
	};

	add(document, 'mousedown.move', mousedown);
	add(document, 'touchstart.move', touchstart);

	// Make jQuery copy touch event properties over to the jQuery event
	// object, if they are not already listed. But only do the ones we
	// really need. IE7/8 do not have Array#indexOf(), but nor do they
	// have touch events, so let's assume we can ignore them.
	if (typeof Array.prototype.indexOf === 'function') {
		(function(jQuery, undefined){
			var props = ["changedTouches", "targetTouches"],
			    l = props.length;
			
			while (l--) {
				if (jQuery.event.props.indexOf(props[l]) === -1) {
					jQuery.event.props.push(props[l]);
				}
			}
		})(jQuery);
	};
});

/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),n&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=e("#mCSB_"+n.idx),s=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&Q(t),o&&n&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r)),n.overflowed=y.call(this),M.call(this),i.autoDraggerLength&&S.call(this),b.call(this),T.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?s[0].height()>s[0].parent().height()?B.call(this):(G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(B.call(this),"y"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[1]&&G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?s[1].width()>s[1].parent().width()?B.call(this):(G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(B.call(this),"x"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[0]&&G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),N.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=Y.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=X.call(this,c[0],"y"),c[1]=X.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=ne()?0:d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",G(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",G(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&Q(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){o.data(a);N.call(this,"remove"),k.call(this),t&&B.call(this),M.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),N.call(this,"remove"),k.call(this),B.call(this),n.removeData(a),$(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),$(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir='"+n.langDir+"' /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){var o=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],a=t.parent().width();return o[0]>a?o[0]:o[1]>a?o[1]:"100%"},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=oe(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' "+r+" />","<a href='#' class='"+d[14]+"' "+r+" />","<a href='#' class='"+d[15]+"' "+r+" />","<a href='#' class='"+d[16]+"' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},C=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},y=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>n.height(),l>n.width()]},B=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(Q(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),G(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),G(t,"_resetX")}},T=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),W.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(I.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}P.call(this),U.call(this),i.advanced.autoScrollOnFocus&&H.call(this),i.scrollButtons.enable&&F.call(this),i.keyboard.enable&&q.call(this),n.bindEvents=!0}},k=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),n.advanced.extraDraggableSelectors&&l.add(e(n.advanced.extraDraggableSelectors)),o.bindEvents&&(e(document).add(e(!A()||top.document)).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),$(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),$(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),$(s[0],"onCompleteTimeout"),o.bindEvents=!1)},M=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},O=function(t){var o=t.type,a=t.target.ownerDocument!==document&&null!==frameElement?[e(frameElement).offset().top,e(frameElement).offset().left]:null,n=A()&&t.target.ownerDocument!==top.document&&null!==frameElement?[e(t.view.frameElement).offset().top,e(t.view.frameElement).offset().left]:[0,0];switch(o){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return a?[t.originalEvent.pageY-a[0]+n[0],t.originalEvent.pageX-a[1]+n[1],!1]:[t.originalEvent.pageY,t.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],r=t.originalEvent.touches.length||t.originalEvent.changedTouches.length;return t.target.ownerDocument!==document?[i.screenY,i.screenX,r>1]:[i.pageY,i.pageX,r>1];default:return a?[t.pageY-a[0]+n[0],t.pageX-a[1]+n[1],!1]:[t.pageY,t.pageX,!1]}},I=function(){function t(e,t,a,n){if(h[0].idleTimer=d.scrollInertia<233?250:0,o.attr("id")===f[1])var i="x",s=(o[0].offsetLeft-t+n)*l.scrollRatio.x;else var i="y",s=(o[0].offsetTop-e+a)*l.scrollRatio.y;G(r,s.toString(),{dir:i,drag:!0})}var o,n,i,r=e(this),l=r.data(a),d=l.opt,u=a+"_"+l.idx,f=["mCSB_"+l.idx+"_dragger_vertical","mCSB_"+l.idx+"_dragger_horizontal"],h=e("#mCSB_"+l.idx+"_container"),m=e("#"+f[0]+",#"+f[1]),p=d.advanced.releaseDraggableSelectors?m.add(e(d.advanced.releaseDraggableSelectors)):m,g=d.advanced.extraDraggableSelectors?e(!A()||top.document).add(e(d.advanced.extraDraggableSelectors)):e(!A()||top.document);m.bind("contextmenu."+u,function(e){e.preventDefault()}).bind("mousedown."+u+" touchstart."+u+" pointerdown."+u+" MSPointerDown."+u,function(t){if(t.stopImmediatePropagation(),t.preventDefault(),ee(t)){c=!0,s&&(document.onselectstart=function(){return!1}),L.call(h,!1),Q(r),o=e(this);var a=o.offset(),l=O(t)[0]-a.top,u=O(t)[1]-a.left,f=o.height()+a.top,m=o.width()+a.left;f>l&&l>0&&m>u&&u>0&&(n=l,i=u),C(o,"active",d.autoExpandScrollbar)}}).bind("touchmove."+u,function(e){e.stopImmediatePropagation(),e.preventDefault();var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;t(n,i,r,l)}),e(document).add(g).bind("mousemove."+u+" pointermove."+u+" MSPointerMove."+u,function(e){if(o){var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;if(n===r&&i===l)return;t(n,i,r,l)}}).add(p).bind("mouseup."+u+" touchend."+u+" pointerup."+u+" MSPointerUp."+u,function(){o&&(C(o,"active",d.autoExpandScrollbar),o=null),c=!1,s&&(document.onselectstart=null),L.call(h,!0)})},D=function(){function o(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,b=0,C=0,d=1,y.removeClass("mCS_touch_action");var o=I.offset();u=O(e)[0]-o.top,f=O(e)[1]-o.left,z=[O(e)[0],O(e)[1]]}function n(e){if(te(e)&&!c&&!O(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||b)&&d)){g=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left,n="mcsLinearOut";if(E.push(o),W.push(a),z[2]=Math.abs(O(e)[0]-z[0]),z[3]=Math.abs(O(e)[1]-z[1]),B.overflowed[0])var i=D[0].parent().height()-D[0].height(),r=u-o>0&&o-u>-(i*B.scrollRatio.y)&&(2*z[3]<z[2]||"yx"===T.axis);if(B.overflowed[1])var l=D[1].parent().width()-D[1].width(),h=f-a>0&&a-f>-(l*B.scrollRatio.x)&&(2*z[2]<z[3]||"yx"===T.axis);r||h?(U||e.preventDefault(),b=1):(C=1,y.addClass("mCS_touch_action")),U&&e.preventDefault(),w="yx"===T.axis?[u-o,f-a]:"x"===T.axis?[null,f-a]:[u-o,null],I[0].idleTimer=250,B.overflowed[0]&&s(w[0],R,n,"y","all",!0),B.overflowed[1]&&s(w[1],R,n,"x",L,!0)}}function i(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),Q(y),p=K();var o=M.offset();h=O(e)[0]-o.top,m=O(e)[1]-o.left,E=[],W=[]}function r(e){if(te(e)&&!c&&!O(e)[2]){d=0,e.stopImmediatePropagation(),b=0,C=0,v=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left;if(!(v-g>30)){_=1e3/(v-p);var n="mcsEaseOut",i=2.5>_,r=i?[E[E.length-2],W[W.length-2]]:[0,0];x=i?[o-r[0],a-r[1]]:[o-h,a-m];var u=[Math.abs(x[0]),Math.abs(x[1])];_=i?[Math.abs(x[0]/4),Math.abs(x[1]/4)]:[_,_];var f=[Math.abs(I[0].offsetTop)-x[0]*l(u[0]/_[0],_[0]),Math.abs(I[0].offsetLeft)-x[1]*l(u[1]/_[1],_[1])];w="yx"===T.axis?[f[0],f[1]]:"x"===T.axis?[null,f[1]]:[f[0],null],S=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var y=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>y?w[0]:0,w[1]=u[1]>y?w[1]:0,B.overflowed[0]&&s(w[0],S[0],n,"y",L,!1),B.overflowed[1]&&s(w[1],S[1],n,"x",L,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&G(y,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C,y=e(this),B=y.data(a),T=B.opt,k=a+"_"+B.idx,M=e("#mCSB_"+B.idx),I=e("#mCSB_"+B.idx+"_container"),D=[e("#mCSB_"+B.idx+"_dragger_vertical"),e("#mCSB_"+B.idx+"_dragger_horizontal")],E=[],W=[],R=0,L="yx"===T.axis?"none":"all",z=[],P=I.find("iframe"),H=["touchstart."+k+" pointerdown."+k+" MSPointerDown."+k,"touchmove."+k+" pointermove."+k+" MSPointerMove."+k,"touchend."+k+" pointerup."+k+" MSPointerUp."+k],U=void 0!==document.body.style.touchAction&&""!==document.body.style.touchAction;I.bind(H[0],function(e){o(e)}).bind(H[1],function(e){n(e)}),M.bind(H[0],function(e){i(e)}).bind(H[2],function(e){r(e)}),P.length&&P.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(H[0],function(e){o(e),i(e)}).bind(H[1],function(e){n(e)}).bind(H[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,j(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=O(e)[0]-a.top+f[0].offsetTop,c=O(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(){t||(i&&(i=0,n("off",null)),c=!1)})},W=function(){function t(t,a){if(Q(o),!z(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v="y"===i.mouseWheel.axis?t.deltaY||a:t.deltaX;else var u="y",f=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||a;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<5&&!i.mouseWheel.normalizeDelta&&(h=t.deltaFactor,d=17),G(o,(m-v*h).toString(),{dir:u,dur:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},R=new Object,A=function(t){var o=!1,a=!1,n=null;if(void 0===t?a="#empty":void 0!==e(t).attr("id")&&(a=e(t).attr("id")),a!==!1&&void 0!==R[a])return R[a];if(t){try{var i=t.contentDocument||t.contentWindow.document;n=i.body.innerHTML}catch(r){}o=null!==n}else{try{var i=top.document;n=i.body.innerHTML}catch(r){}o=null!==n}return a!==!1&&(R[a]=o),o},L=function(e){var t=this.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}},z=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},P=function(){var t,o=e(this),n=o.data(a),i=a+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent(),s=e(".mCSB_"+n.idx+"_scrollbar ."+d[12]);s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(o){c=!0,e(o.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(){c=!1}).bind("click."+i,function(a){if(t&&(t=0,e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail"))){Q(o);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var c="x",u=a.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-u*(.9*l.width())}else{if(!n.overflowed[0])return;var c="y",u=a.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-u*(.9*l.height())}G(o,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},H=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(){var o=e(document.activeElement),a=r.find(".mCustomScrollBox").length,i=0;o.is(n.advanced.autoScrollOnFocus)&&(Q(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=a?(i+17)*a:0,t[0]._focusTimeout=setTimeout(function(){var e=[ae(o)[0],ae(o)[1]],a=[r[0].offsetTop,r[0].offsetLeft],s=[a[0]+e[0]>=0&&a[0]+e[0]<l.height()-o.outerHeight(!1),a[1]+e[1]>=0&&a[0]+e[1]<l.width()-o.outerWidth(!1)],c="yx"!==n.axis||s[0]||s[1]?"all":"none";"x"===n.axis||s[0]||G(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i}),"y"===n.axis||s[1]||G(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i})},t[0]._focusTimer))})},U=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(){0===i.scrollTop()&&0===i.scrollLeft()||e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},F=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("contextmenu."+r,function(e){e.preventDefault()}).bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.scrollButtons.scrollAmount,j(t,e,o)}if(a.preventDefault(),ee(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},q=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||j(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){Q(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-f*(.9*d.width());else var h="y",m=Math.abs(c[0].offsetTop)-f*(.9*d.height());G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},j=function(t,o,n,i,r){function l(e){u.snapAmount&&(f.scrollAmount=u.snapAmount instanceof Array?"x"===f.dir[0]?u.snapAmount[1]:u.snapAmount[0]:u.snapAmount);var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],m="x"===f.dir[0]?s[1]+f.dir[1]*(d[1]*n):s[0]+f.dir[1]*(d[0]*n),v="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),x="auto"!==f.scrollAmount?v:m,_=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",w=!!e;return e&&17>a&&(x="x"===f.dir[0]?s[1]:s[0]),G(t,x.toString(),{dir:f.dir[0],scrollEasing:_,dur:a,onComplete:w}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),$(f,"step"),Q(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],Q(t),oe(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},Y=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},X=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1)-s.width():l.outerHeight(!1)-s.height(),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?ae(m)[1]:ae(m)[0];case"string":case"number":if(oe(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&oe(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?ae(m)[1]:ae(m)[0]}return e(t).length?"x"===o?ae(e(t))[1]:ae(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},N=function(t){function o(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight+l[0].offsetWidth,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&o()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){n(this)}))},c.advanced.autoUpdateTimeout))}function n(t){function o(e,t){return function(){
    return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var n=new Image;n.onload=o(n,a),n.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(a),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void $(f[0],"autoUpdate")):void o()},V=function(e,t,o){return Math.round(e/t)*t-o},Q=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){Z.call(this)})},G=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||w>=S[0]+y,c.callbacks.alwaysTriggerOffsets||-B>=w]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[x[0].offsetTop,x[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?Y.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?Y.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,0===m.scrollTop()&&0===m.scrollLeft()||(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){if(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount){var v=c.snapAmount instanceof Array?"x"===n.dir?c.snapAmount[1]:c.snapAmount[0]:c.snapAmount;o=V(o,v,c.snapOffset)}switch(n.dir){case"x":var x=e("#mCSB_"+s.idx+"_dragger_horizontal"),_="left",w=h[0].offsetLeft,S=[f.width()-h.outerWidth(!1),x.parent().width()-x.width()],b=[o,0===o?0:o/s.scrollRatio.x],y=p[1],B=g[1],T=y>0?y/s.scrollRatio.x:0,k=B>0?B/s.scrollRatio.x:0;break;case"y":var x=e("#mCSB_"+s.idx+"_dragger_vertical"),_="top",w=h[0].offsetTop,S=[f.height()-h.outerHeight(!1),x.parent().height()-x.height()],b=[o,0===o?0:o/s.scrollRatio.y],y=p[0],B=g[0],T=y>0?y/s.scrollRatio.y:0,k=B>0?B/s.scrollRatio.y:0}b[1]<0||0===b[0]&&0===b[1]?b=[0,0]:b[1]>=S[1]?b=[S[0],S[1]]:b[0]=-b[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),J(x[0],_,Math.round(b[1]),u[1],n.scrollEasing),!s.tweenRunning&&(0===w&&b[0]>=0||w===S[0]&&b[0]<=S[0])||J(h[0],_,Math.round(b[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,C(x),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&b[1]>=S[1]-T&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&b[1]<=k&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,C(x,"hide")},e)}}})}},J=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=K()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=K(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},K=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},Z=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},$=function(e,t){try{delete e[t]}catch(o){e[t]=null}},ee=function(e){return!(e.which&&1!==e.which)},te=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},oe=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},ae=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]},ne=function(){function e(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}var t=e();return t?document[t]:!1};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).bind("load",function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+ae(n)[0]>=0&&a[0]+ae(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+ae(n)[1]>=0&&a[1]+ae(n)[1]<o.width()-n.outerWidth(!1)},mcsInSight:e.expr[":"].mcsInSight||function(t,o,a){var n,i,r,l,s=e(t),c=s.parents(".mCSB_container"),d="exact"===a[3]?[[1,0],[1,0]]:[[.9,.1],[.6,.4]];if(c.length)return n=[s.outerHeight(!1),s.outerWidth(!1)],r=[c[0].offsetTop+ae(s)[0],c[0].offsetLeft+ae(s)[1]],i=[c.parent()[0].offsetHeight,c.parent()[0].offsetWidth],l=[n[0]<i[0]?d[0]:d[1],n[1]<i[1]?d[0]:d[1]],r[0]-i[0]*l[0][0]<0&&r[0]+n[0]-i[0]*l[0][1]>=0&&r[1]-i[1]*l[1][0]<0&&r[1]+n[1]-i[1]*l[1][1]>=0},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});
/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});


(function($){

  $.fn.twentytwenty = function(options) {
    var options = $.extend({default_offset_pct: 0.5, orientation: 'horizontal'}, options);
    return this.each(function() {

      var sliderPct = options.default_offset_pct;
      var container = $(this);
      var sliderOrientation = options.orientation;
      var beforeDirection = (sliderOrientation === 'vertical') ? 'down' : 'left';
      var afterDirection = (sliderOrientation === 'vertical') ? 'up' : 'right';


      container.wrap("<div class='twentytwenty-wrapper twentytwenty-" + sliderOrientation + "'></div>");
      container.append("<div class='twentytwenty-overlay'></div>");
      var beforeImg = container.find("img:first");
      var afterImg = container.find("img:last");
      container.append("<div class='twentytwenty-handle'></div>");
      var slider = container.find(".twentytwenty-handle");
      slider.append("<span class='twentytwenty-" + beforeDirection + "-arrow'></span>");
      slider.append("<span class='twentytwenty-" + afterDirection + "-arrow'></span>");
      container.addClass("twentytwenty-container");
      beforeImg.addClass("twentytwenty-before");
      afterImg.addClass("twentytwenty-after");

      var overlay = container.find(".twentytwenty-overlay");
      overlay.append("<div class='twentytwenty-before-label'></div>");
      overlay.append("<div class='twentytwenty-after-label'></div>");

      var calcOffset = function(dimensionPct) {
        var w = beforeImg.width();
        var h = beforeImg.height();
        return {
          w: w+"px",
          h: h+"px",
          cw: (dimensionPct*w)+"px",
          ch: (dimensionPct*h)+"px"
        };
      };

      var adjustContainer = function(offset) {
      	if (sliderOrientation === 'vertical') {
      	  beforeImg.css("clip", "rect(0,"+offset.w+","+offset.ch+",0)");
      	}
      	else {
          beforeImg.css("clip", "rect(0,"+offset.cw+","+offset.h+",0)");
    	}
        container.css("height", offset.h);
      };

      var adjustSlider = function(pct) {
        var offset = calcOffset(pct);
        slider.css((sliderOrientation==="vertical") ? "top" : "left", (sliderOrientation==="vertical") ? offset.ch : offset.cw);
        adjustContainer(offset);
      }

      $(window).on("resize.twentytwenty", function(e) {
        adjustSlider(sliderPct);
      });

      var offsetX = 0;
      var imgWidth = 0;

      slider.on("movestart", function(e) {
        if (((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) && sliderOrientation !== 'vertical') {
          e.preventDefault();
        }
        else if (((e.distX < e.distY && e.distX < -e.distY) || (e.distX > e.distY && e.distX > -e.distY)) && sliderOrientation === 'vertical') {
          e.preventDefault();
        }
        container.addClass("active");
        offsetX = container.offset().left;
        offsetY = container.offset().top;
        imgWidth = beforeImg.width();
        imgHeight = beforeImg.height();
      });

      slider.on("moveend", function(e) {
        container.removeClass("active");
      });

      slider.on("move", function(e) {
        if (container.hasClass("active")) {
          sliderPct = (sliderOrientation === 'vertical') ? (e.pageY-offsetY)/imgHeight : (e.pageX-offsetX)/imgWidth;
          if (sliderPct < 0) {
            sliderPct = 0;
          }
          if (sliderPct > 1) {
            sliderPct = 1;
          }
          adjustSlider(sliderPct);
        }
      });

      container.find("img").on("mousedown", function(event) {
        event.preventDefault();
      });

      $(window).trigger("resize.twentytwenty");
    });
  };

})(jQuery);

$(document).ready(function () {
    $('[data-hover="dropdown"]').dropdownHover();
});
// Snap.svg 0.4.1
//
// Copyright (c) 2013 – 2015 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// build: 2015-04-13

!function(a){var b,c,d="0.4.2",e="hasOwnProperty",f=/[\.\/]/,g=/\s*,\s*/,h="*",i=function(a,b){return a-b},j={n:{}},k=function(){for(var a=0,b=this.length;b>a;a++)if("undefined"!=typeof this[a])return this[a]},l=function(){for(var a=this.length;--a;)if("undefined"!=typeof this[a])return this[a]},m=function(a,d){a=String(a);var e,f=c,g=Array.prototype.slice.call(arguments,2),h=m.listeners(a),j=0,n=[],o={},p=[],q=b;p.firstDefined=k,p.lastDefined=l,b=a,c=0;for(var r=0,s=h.length;s>r;r++)"zIndex"in h[r]&&(n.push(h[r].zIndex),h[r].zIndex<0&&(o[h[r].zIndex]=h[r]));for(n.sort(i);n[j]<0;)if(e=o[n[j++]],p.push(e.apply(d,g)),c)return c=f,p;for(r=0;s>r;r++)if(e=h[r],"zIndex"in e)if(e.zIndex==n[j]){if(p.push(e.apply(d,g)),c)break;do if(j++,e=o[n[j]],e&&p.push(e.apply(d,g)),c)break;while(e)}else o[e.zIndex]=e;else if(p.push(e.apply(d,g)),c)break;return c=f,b=q,p};m._events=j,m.listeners=function(a){var b,c,d,e,g,i,k,l,m=a.split(f),n=j,o=[n],p=[];for(e=0,g=m.length;g>e;e++){for(l=[],i=0,k=o.length;k>i;i++)for(n=o[i].n,c=[n[m[e]],n[h]],d=2;d--;)b=c[d],b&&(l.push(b),p=p.concat(b.f||[]));o=l}return p},m.on=function(a,b){if(a=String(a),"function"!=typeof b)return function(){};for(var c=a.split(g),d=0,e=c.length;e>d;d++)!function(a){for(var c,d=a.split(f),e=j,g=0,h=d.length;h>g;g++)e=e.n,e=e.hasOwnProperty(d[g])&&e[d[g]]||(e[d[g]]={n:{}});for(e.f=e.f||[],g=0,h=e.f.length;h>g;g++)if(e.f[g]==b){c=!0;break}!c&&e.f.push(b)}(c[d]);return function(a){+a==+a&&(b.zIndex=+a)}},m.f=function(a){var b=[].slice.call(arguments,1);return function(){m.apply(null,[a,null].concat(b).concat([].slice.call(arguments,0)))}},m.stop=function(){c=1},m.nt=function(a){return a?new RegExp("(?:\\.|\\/|^)"+a+"(?:\\.|\\/|$)").test(b):b},m.nts=function(){return b.split(f)},m.off=m.unbind=function(a,b){if(!a)return void(m._events=j={n:{}});var c=a.split(g);if(c.length>1)for(var d=0,i=c.length;i>d;d++)m.off(c[d],b);else{c=a.split(f);var k,l,n,d,i,o,p,q=[j];for(d=0,i=c.length;i>d;d++)for(o=0;o<q.length;o+=n.length-2){if(n=[o,1],k=q[o].n,c[d]!=h)k[c[d]]&&n.push(k[c[d]]);else for(l in k)k[e](l)&&n.push(k[l]);q.splice.apply(q,n)}for(d=0,i=q.length;i>d;d++)for(k=q[d];k.n;){if(b){if(k.f){for(o=0,p=k.f.length;p>o;o++)if(k.f[o]==b){k.f.splice(o,1);break}!k.f.length&&delete k.f}for(l in k.n)if(k.n[e](l)&&k.n[l].f){var r=k.n[l].f;for(o=0,p=r.length;p>o;o++)if(r[o]==b){r.splice(o,1);break}!r.length&&delete k.n[l].f}}else{delete k.f;for(l in k.n)k.n[e](l)&&k.n[l].f&&delete k.n[l].f}k=k.n}}},m.once=function(a,b){var c=function(){return m.unbind(a,c),b.apply(this,arguments)};return m.on(a,c)},m.version=d,m.toString=function(){return"You are running Eve "+d},"undefined"!=typeof module&&module.exports?module.exports=m:"function"==typeof define&&define.amd?define("eve",[],function(){return m}):a.eve=m}(this),function(a,b){if("function"==typeof define&&define.amd)define(["eve"],function(c){return b(a,c)});else if("undefined"!=typeof exports){var c=require("eve");module.exports=b(a,c)}else b(a,a.eve)}(window||this,function(a,b){var c=function(b){var c={},d=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame||a.msRequestAnimationFrame||function(a){setTimeout(a,16)},e=Array.isArray||function(a){return a instanceof Array||"[object Array]"==Object.prototype.toString.call(a)},f=0,g="M"+(+new Date).toString(36),h=function(){return g+(f++).toString(36)},i=Date.now||function(){return+new Date},j=function(a){var b=this;if(null==a)return b.s;var c=b.s-a;b.b+=b.dur*c,b.B+=b.dur*c,b.s=a},k=function(a){var b=this;return null==a?b.spd:void(b.spd=a)},l=function(a){var b=this;return null==a?b.dur:(b.s=b.s*a/b.dur,void(b.dur=a))},m=function(){var a=this;delete c[a.id],a.update(),b("mina.stop."+a.id,a)},n=function(){var a=this;a.pdif||(delete c[a.id],a.update(),a.pdif=a.get()-a.b)},o=function(){var a=this;a.pdif&&(a.b=a.get()-a.pdif,delete a.pdif,c[a.id]=a)},p=function(){var a,b=this;if(e(b.start)){a=[];for(var c=0,d=b.start.length;d>c;c++)a[c]=+b.start[c]+(b.end[c]-b.start[c])*b.easing(b.s)}else a=+b.start+(b.end-b.start)*b.easing(b.s);b.set(a)},q=function(){var a=0;for(var e in c)if(c.hasOwnProperty(e)){var f=c[e],g=f.get();a++,f.s=(g-f.b)/(f.dur/f.spd),f.s>=1&&(delete c[e],f.s=1,a--,function(a){setTimeout(function(){b("mina.finish."+a.id,a)})}(f)),f.update()}a&&d(q)},r=function(a,b,e,f,g,i,s){var t={id:h(),start:a,end:b,b:e,s:0,dur:f-e,spd:1,get:g,set:i,easing:s||r.linear,status:j,speed:k,duration:l,stop:m,pause:n,resume:o,update:p};c[t.id]=t;var u,v=0;for(u in c)if(c.hasOwnProperty(u)&&(v++,2==v))break;return 1==v&&d(q),t};return r.time=i,r.getById=function(a){return c[a]||null},r.linear=function(a){return a},r.easeout=function(a){return Math.pow(a,1.7)},r.easein=function(a){return Math.pow(a,.48)},r.easeinout=function(a){if(1==a)return 1;if(0==a)return 0;var b=.48-a/1.04,c=Math.sqrt(.1734+b*b),d=c-b,e=Math.pow(Math.abs(d),1/3)*(0>d?-1:1),f=-c-b,g=Math.pow(Math.abs(f),1/3)*(0>f?-1:1),h=e+g+.5;return 3*(1-h)*h*h+h*h*h},r.backin=function(a){if(1==a)return 1;var b=1.70158;return a*a*((b+1)*a-b)},r.backout=function(a){if(0==a)return 0;a-=1;var b=1.70158;return a*a*((b+1)*a+b)+1},r.elastic=function(a){return a==!!a?a:Math.pow(2,-10*a)*Math.sin(2*(a-.075)*Math.PI/.3)+1},r.bounce=function(a){var b,c=7.5625,d=2.75;return 1/d>a?b=c*a*a:2/d>a?(a-=1.5/d,b=c*a*a+.75):2.5/d>a?(a-=2.25/d,b=c*a*a+.9375):(a-=2.625/d,b=c*a*a+.984375),b},a.mina=r,r}("undefined"==typeof b?function(){}:b),d=function(a){function c(a,b){if(a){if(a.nodeType)return w(a);if(e(a,"array")&&c.set)return c.set.apply(c,a);if(a instanceof s)return a;if(null==b)return a=y.doc.querySelector(String(a)),w(a)}return a=null==a?"100%":a,b=null==b?"100%":b,new v(a,b)}function d(a,b){if(b){if("#text"==a&&(a=y.doc.createTextNode(b.text||b["#text"]||"")),"#comment"==a&&(a=y.doc.createComment(b.text||b["#text"]||"")),"string"==typeof a&&(a=d(a)),"string"==typeof b)return 1==a.nodeType?"xlink:"==b.substring(0,6)?a.getAttributeNS(T,b.substring(6)):"xml:"==b.substring(0,4)?a.getAttributeNS(U,b.substring(4)):a.getAttribute(b):"text"==b?a.nodeValue:null;if(1==a.nodeType){for(var c in b)if(b[z](c)){var e=A(b[c]);e?"xlink:"==c.substring(0,6)?a.setAttributeNS(T,c.substring(6),e):"xml:"==c.substring(0,4)?a.setAttributeNS(U,c.substring(4),e):a.setAttribute(c,e):a.removeAttribute(c)}}else"text"in b&&(a.nodeValue=b.text)}else a=y.doc.createElementNS(U,a);return a}function e(a,b){return b=A.prototype.toLowerCase.call(b),"finite"==b?isFinite(a):"array"==b&&(a instanceof Array||Array.isArray&&Array.isArray(a))?!0:"null"==b&&null===a||b==typeof a&&null!==a||"object"==b&&a===Object(a)||J.call(a).slice(8,-1).toLowerCase()==b}function f(a){if("function"==typeof a||Object(a)!==a)return a;var b=new a.constructor;for(var c in a)a[z](c)&&(b[c]=f(a[c]));return b}function h(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return a.push(a.splice(c,1)[0])}function i(a,b,c){function d(){var e=Array.prototype.slice.call(arguments,0),f=e.join("␀"),g=d.cache=d.cache||{},i=d.count=d.count||[];return g[z](f)?(h(i,f),c?c(g[f]):g[f]):(i.length>=1e3&&delete g[i.shift()],i.push(f),g[f]=a.apply(b,e),c?c(g[f]):g[f])}return d}function j(a,b,c,d,e,f){if(null==e){var g=a-c,h=b-d;return g||h?(180+180*D.atan2(-h,-g)/H+360)%360:0}return j(a,b,e,f)-j(c,d,e,f)}function k(a){return a%360*H/180}function l(a){return 180*a/H%360}function m(a){var b=[];return a=a.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g,function(a,c,d){return d=d.split(/\s*,\s*|\s+/),"rotate"==c&&1==d.length&&d.push(0,0),"scale"==c&&(d.length>2?d=d.slice(0,2):2==d.length&&d.push(0,0),1==d.length&&d.push(d[0],0,0)),b.push("skewX"==c?["m",1,0,D.tan(k(d[0])),1,0,0]:"skewY"==c?["m",1,D.tan(k(d[0])),0,1,0,0]:[c.charAt(0)].concat(d)),a}),b}function n(a,b){var d=ab(a),e=new c.Matrix;if(d)for(var f=0,g=d.length;g>f;f++){var h,i,j,k,l,m=d[f],n=m.length,o=A(m[0]).toLowerCase(),p=m[0]!=o,q=p?e.invert():0;"t"==o&&2==n?e.translate(m[1],0):"t"==o&&3==n?p?(h=q.x(0,0),i=q.y(0,0),j=q.x(m[1],m[2]),k=q.y(m[1],m[2]),e.translate(j-h,k-i)):e.translate(m[1],m[2]):"r"==o?2==n?(l=l||b,e.rotate(m[1],l.x+l.width/2,l.y+l.height/2)):4==n&&(p?(j=q.x(m[2],m[3]),k=q.y(m[2],m[3]),e.rotate(m[1],j,k)):e.rotate(m[1],m[2],m[3])):"s"==o?2==n||3==n?(l=l||b,e.scale(m[1],m[n-1],l.x+l.width/2,l.y+l.height/2)):4==n?p?(j=q.x(m[2],m[3]),k=q.y(m[2],m[3]),e.scale(m[1],m[1],j,k)):e.scale(m[1],m[1],m[2],m[3]):5==n&&(p?(j=q.x(m[3],m[4]),k=q.y(m[3],m[4]),e.scale(m[1],m[2],j,k)):e.scale(m[1],m[2],m[3],m[4])):"m"==o&&7==n&&e.add(m[1],m[2],m[3],m[4],m[5],m[6])}return e}function o(a){var b=a.node.ownerSVGElement&&w(a.node.ownerSVGElement)||a.node.parentNode&&w(a.node.parentNode)||c.select("svg")||c(0,0),d=b.select("defs"),e=null==d?!1:d.node;return e||(e=u("defs",b.node).node),e}function p(a){return a.node.ownerSVGElement&&w(a.node.ownerSVGElement)||c.select("svg")}function q(a,b,c){function e(a){if(null==a)return I;if(a==+a)return a;d(j,{width:a});try{return j.getBBox().width}catch(b){return 0}}function f(a){if(null==a)return I;if(a==+a)return a;d(j,{height:a});try{return j.getBBox().height}catch(b){return 0}}function g(d,e){null==b?i[d]=e(a.attr(d)||0):d==b&&(i=e(null==c?a.attr(d)||0:c))}var h=p(a).node,i={},j=h.querySelector(".svg---mgr");switch(j||(j=d("rect"),d(j,{x:-9e9,y:-9e9,width:10,height:10,"class":"svg---mgr",fill:"none"}),h.appendChild(j)),a.type){case"rect":g("rx",e),g("ry",f);case"image":g("width",e),g("height",f);case"text":g("x",e),g("y",f);break;case"circle":g("cx",e),g("cy",f),g("r",e);break;case"ellipse":g("cx",e),g("cy",f),g("rx",e),g("ry",f);break;case"line":g("x1",e),g("x2",e),g("y1",f),g("y2",f);break;case"marker":g("refX",e),g("markerWidth",e),g("refY",f),g("markerHeight",f);break;case"radialGradient":g("fx",e),g("fy",f);break;case"tspan":g("dx",e),g("dy",f);break;default:g(b,e)}return h.removeChild(j),i}function r(a){e(a,"array")||(a=Array.prototype.slice.call(arguments,0));for(var b=0,c=0,d=this.node;this[b];)delete this[b++];for(b=0;b<a.length;b++)"set"==a[b].type?a[b].forEach(function(a){d.appendChild(a.node)}):d.appendChild(a[b].node);var f=d.childNodes;for(b=0;b<f.length;b++)this[c++]=w(f[b]);return this}function s(a){if(a.snap in V)return V[a.snap];var b;try{b=a.ownerSVGElement}catch(c){}this.node=a,b&&(this.paper=new v(b)),this.type=a.tagName||a.nodeName;var d=this.id=S(this);if(this.anims={},this._={transform:[]},a.snap=d,V[d]=this,"g"==this.type&&(this.add=r),this.type in{g:1,mask:1,pattern:1,symbol:1})for(var e in v.prototype)v.prototype[z](e)&&(this[e]=v.prototype[e])}function t(a){this.node=a}function u(a,b){var c=d(a);b.appendChild(c);var e=w(c);return e}function v(a,b){var c,e,f,g=v.prototype;if(a&&"svg"==a.tagName){if(a.snap in V)return V[a.snap];var h=a.ownerDocument;c=new s(a),e=a.getElementsByTagName("desc")[0],f=a.getElementsByTagName("defs")[0],e||(e=d("desc"),e.appendChild(h.createTextNode("Created with Snap")),c.node.appendChild(e)),f||(f=d("defs"),c.node.appendChild(f)),c.defs=f;for(var i in g)g[z](i)&&(c[i]=g[i]);c.paper=c.root=c}else c=u("svg",y.doc.body),d(c.node,{height:b,version:1.1,width:a,xmlns:U});return c}function w(a){return a?a instanceof s||a instanceof t?a:a.tagName&&"svg"==a.tagName.toLowerCase()?new v(a):a.tagName&&"object"==a.tagName.toLowerCase()&&"image/svg+xml"==a.type?new v(a.contentDocument.getElementsByTagName("svg")[0]):new s(a):a}function x(a,b){for(var c=0,d=a.length;d>c;c++){var e={type:a[c].type,attr:a[c].attr()},f=a[c].children();b.push(e),f.length&&x(f,e.childNodes=[])}}c.version="0.4.0",c.toString=function(){return"Snap v"+this.version},c._={};var y={win:a.window,doc:a.window.document};c._.glob=y;{var z="hasOwnProperty",A=String,B=parseFloat,C=parseInt,D=Math,E=D.max,F=D.min,G=D.abs,H=(D.pow,D.PI),I=(D.round,""),J=Object.prototype.toString,K=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,L=(c._.separator=/[,\s]+/,/[\s]*,[\s]*/),M={hs:1,rg:1},N=/([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi,O=/([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi,P=/(-?\d*\.?\d*(?:e[\-+]?\\d+)?)[\s]*,?[\s]*/gi,Q=0,R="S"+(+new Date).toString(36),S=function(a){return(a&&a.type?a.type:I)+R+(Q++).toString(36)},T="http://www.w3.org/1999/xlink",U="http://www.w3.org/2000/svg",V={};c.url=function(a){return"url('#"+a+"')"}}c._.$=d,c._.id=S,c.format=function(){var a=/\{([^\}]+)\}/g,b=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,c=function(a,c,d){var e=d;return c.replace(b,function(a,b,c,d,f){b=b||d,e&&(b in e&&(e=e[b]),"function"==typeof e&&f&&(e=e()))}),e=(null==e||e==d?a:e)+""};return function(b,d){return A(b).replace(a,function(a,b){return c(a,b,d)})}}(),c._.clone=f,c._.cacher=i,c.rad=k,c.deg=l,c.sin=function(a){return D.sin(c.rad(a))},c.tan=function(a){return D.tan(c.rad(a))},c.cos=function(a){return D.cos(c.rad(a))},c.asin=function(a){return c.deg(D.asin(a))},c.acos=function(a){return c.deg(D.acos(a))},c.atan=function(a){return c.deg(D.atan(a))},c.atan2=function(a){return c.deg(D.atan2(a))},c.angle=j,c.len=function(a,b,d,e){return Math.sqrt(c.len2(a,b,d,e))},c.len2=function(a,b,c,d){return(a-c)*(a-c)+(b-d)*(b-d)},c.closestPoint=function(a,b,c){function d(a){var d=a.x-b,e=a.y-c;return d*d+e*e}for(var e,f,g,h,i=a.node,j=i.getTotalLength(),k=j/i.pathSegList.numberOfItems*.125,l=1/0,m=0;j>=m;m+=k)(h=d(g=i.getPointAtLength(m)))<l&&(e=g,f=m,l=h);for(k*=.5;k>.5;){var n,o,p,q,r,s;(p=f-k)>=0&&(r=d(n=i.getPointAtLength(p)))<l?(e=n,f=p,l=r):(q=f+k)<=j&&(s=d(o=i.getPointAtLength(q)))<l?(e=o,f=q,l=s):k*=.5}return e={x:e.x,y:e.y,length:f,distance:Math.sqrt(l)}},c.is=e,c.snapTo=function(a,b,c){if(c=e(c,"finite")?c:10,e(a,"array")){for(var d=a.length;d--;)if(G(a[d]-b)<=c)return a[d]}else{a=+a;var f=b%a;if(c>f)return b-f;if(f>a-c)return b-f+a}return b},c.getRGB=i(function(a){if(!a||(a=A(a)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:Z};if("none"==a)return{r:-1,g:-1,b:-1,hex:"none",toString:Z};if(!(M[z](a.toLowerCase().substring(0,2))||"#"==a.charAt())&&(a=W(a)),!a)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:Z};var b,d,f,g,h,i,j=a.match(K);return j?(j[2]&&(f=C(j[2].substring(5),16),d=C(j[2].substring(3,5),16),b=C(j[2].substring(1,3),16)),j[3]&&(f=C((h=j[3].charAt(3))+h,16),d=C((h=j[3].charAt(2))+h,16),b=C((h=j[3].charAt(1))+h,16)),j[4]&&(i=j[4].split(L),b=B(i[0]),"%"==i[0].slice(-1)&&(b*=2.55),d=B(i[1]),"%"==i[1].slice(-1)&&(d*=2.55),f=B(i[2]),"%"==i[2].slice(-1)&&(f*=2.55),"rgba"==j[1].toLowerCase().slice(0,4)&&(g=B(i[3])),i[3]&&"%"==i[3].slice(-1)&&(g/=100)),j[5]?(i=j[5].split(L),b=B(i[0]),"%"==i[0].slice(-1)&&(b/=100),d=B(i[1]),"%"==i[1].slice(-1)&&(d/=100),f=B(i[2]),"%"==i[2].slice(-1)&&(f/=100),("deg"==i[0].slice(-3)||"°"==i[0].slice(-1))&&(b/=360),"hsba"==j[1].toLowerCase().slice(0,4)&&(g=B(i[3])),i[3]&&"%"==i[3].slice(-1)&&(g/=100),c.hsb2rgb(b,d,f,g)):j[6]?(i=j[6].split(L),b=B(i[0]),"%"==i[0].slice(-1)&&(b/=100),d=B(i[1]),"%"==i[1].slice(-1)&&(d/=100),f=B(i[2]),"%"==i[2].slice(-1)&&(f/=100),("deg"==i[0].slice(-3)||"°"==i[0].slice(-1))&&(b/=360),"hsla"==j[1].toLowerCase().slice(0,4)&&(g=B(i[3])),i[3]&&"%"==i[3].slice(-1)&&(g/=100),c.hsl2rgb(b,d,f,g)):(b=F(D.round(b),255),d=F(D.round(d),255),f=F(D.round(f),255),g=F(E(g,0),1),j={r:b,g:d,b:f,toString:Z},j.hex="#"+(16777216|f|d<<8|b<<16).toString(16).slice(1),j.opacity=e(g,"finite")?g:1,j)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:Z}},c),c.hsb=i(function(a,b,d){return c.hsb2rgb(a,b,d).hex}),c.hsl=i(function(a,b,d){return c.hsl2rgb(a,b,d).hex}),c.rgb=i(function(a,b,c,d){if(e(d,"finite")){var f=D.round;return"rgba("+[f(a),f(b),f(c),+d.toFixed(2)]+")"}return"#"+(16777216|c|b<<8|a<<16).toString(16).slice(1)});var W=function(a){var b=y.doc.getElementsByTagName("head")[0]||y.doc.getElementsByTagName("svg")[0],c="rgb(255, 0, 0)";return(W=i(function(a){if("red"==a.toLowerCase())return c;b.style.color=c,b.style.color=a;var d=y.doc.defaultView.getComputedStyle(b,I).getPropertyValue("color");return d==c?null:d}))(a)},X=function(){return"hsb("+[this.h,this.s,this.b]+")"},Y=function(){return"hsl("+[this.h,this.s,this.l]+")"},Z=function(){return 1==this.opacity||null==this.opacity?this.hex:"rgba("+[this.r,this.g,this.b,this.opacity]+")"},$=function(a,b,d){if(null==b&&e(a,"object")&&"r"in a&&"g"in a&&"b"in a&&(d=a.b,b=a.g,a=a.r),null==b&&e(a,string)){var f=c.getRGB(a);a=f.r,b=f.g,d=f.b}return(a>1||b>1||d>1)&&(a/=255,b/=255,d/=255),[a,b,d]},_=function(a,b,d,f){a=D.round(255*a),b=D.round(255*b),d=D.round(255*d);var g={r:a,g:b,b:d,opacity:e(f,"finite")?f:1,hex:c.rgb(a,b,d),toString:Z};return e(f,"finite")&&(g.opacity=f),g};c.color=function(a){var b;return e(a,"object")&&"h"in a&&"s"in a&&"b"in a?(b=c.hsb2rgb(a),a.r=b.r,a.g=b.g,a.b=b.b,a.opacity=1,a.hex=b.hex):e(a,"object")&&"h"in a&&"s"in a&&"l"in a?(b=c.hsl2rgb(a),a.r=b.r,a.g=b.g,a.b=b.b,a.opacity=1,a.hex=b.hex):(e(a,"string")&&(a=c.getRGB(a)),e(a,"object")&&"r"in a&&"g"in a&&"b"in a&&!("error"in a)?(b=c.rgb2hsl(a),a.h=b.h,a.s=b.s,a.l=b.l,b=c.rgb2hsb(a),a.v=b.b):(a={hex:"none"},a.r=a.g=a.b=a.h=a.s=a.v=a.l=-1,a.error=1)),a.toString=Z,a},c.hsb2rgb=function(a,b,c,d){e(a,"object")&&"h"in a&&"s"in a&&"b"in a&&(c=a.b,b=a.s,d=a.o,a=a.h),a*=360;var f,g,h,i,j;return a=a%360/60,j=c*b,i=j*(1-G(a%2-1)),f=g=h=c-j,a=~~a,f+=[j,i,0,0,i,j][a],g+=[i,j,j,i,0,0][a],h+=[0,0,i,j,j,i][a],_(f,g,h,d)},c.hsl2rgb=function(a,b,c,d){e(a,"object")&&"h"in a&&"s"in a&&"l"in a&&(c=a.l,b=a.s,a=a.h),(a>1||b>1||c>1)&&(a/=360,b/=100,c/=100),a*=360;var f,g,h,i,j;return a=a%360/60,j=2*b*(.5>c?c:1-c),i=j*(1-G(a%2-1)),f=g=h=c-j/2,a=~~a,f+=[j,i,0,0,i,j][a],g+=[i,j,j,i,0,0][a],h+=[0,0,i,j,j,i][a],_(f,g,h,d)},c.rgb2hsb=function(a,b,c){c=$(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g;return f=E(a,b,c),g=f-F(a,b,c),d=0==g?null:f==a?(b-c)/g:f==b?(c-a)/g+2:(a-b)/g+4,d=(d+360)%6*60/360,e=0==g?0:g/f,{h:d,s:e,b:f,toString:X}},c.rgb2hsl=function(a,b,c){c=$(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g,h,i;return g=E(a,b,c),h=F(a,b,c),i=g-h,d=0==i?null:g==a?(b-c)/i:g==b?(c-a)/i+2:(a-b)/i+4,d=(d+360)%6*60/360,f=(g+h)/2,e=0==i?0:.5>f?i/(2*f):i/(2-2*f),{h:d,s:e,l:f,toString:Y}},c.parsePathString=function(a){if(!a)return null;var b=c.path(a);if(b.arr)return c.path.clone(b.arr);var d={a:7,c:6,o:2,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,u:3,z:0},f=[];return e(a,"array")&&e(a[0],"array")&&(f=c.path.clone(a)),f.length||A(a).replace(N,function(a,b,c){var e=[],g=b.toLowerCase();if(c.replace(P,function(a,b){b&&e.push(+b)}),"m"==g&&e.length>2&&(f.push([b].concat(e.splice(0,2))),g="l",b="m"==b?"l":"L"),"o"==g&&1==e.length&&f.push([b,e[0]]),"r"==g)f.push([b].concat(e));else for(;e.length>=d[g]&&(f.push([b].concat(e.splice(0,d[g]))),d[g]););}),f.toString=c.path.toString,b.arr=c.path.clone(f),f};var ab=c.parseTransformString=function(a){if(!a)return null;var b=[];return e(a,"array")&&e(a[0],"array")&&(b=c.path.clone(a)),b.length||A(a).replace(O,function(a,c,d){{var e=[];c.toLowerCase()}d.replace(P,function(a,b){b&&e.push(+b)}),b.push([c].concat(e))}),b.toString=c.path.toString,b};c._.svgTransform2string=m,c._.rgTransform=/^[a-z][\s]*-?\.?\d/i,c._.transform2matrix=n,c._unit2px=q;y.doc.contains||y.doc.compareDocumentPosition?function(a,b){var c=9==a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a==d||!(!d||1!=d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)for(;b;)if(b=b.parentNode,b==a)return!0;return!1};c._.getSomeDefs=o,c._.getSomeSVG=p,c.select=function(a){return a=A(a).replace(/([^\\]):/g,"$1\\:"),w(y.doc.querySelector(a))},c.selectAll=function(a){for(var b=y.doc.querySelectorAll(a),d=(c.set||Array)(),e=0;e<b.length;e++)d.push(w(b[e]));return d},setInterval(function(){for(var a in V)if(V[z](a)){var b=V[a],c=b.node;("svg"!=b.type&&!c.ownerSVGElement||"svg"==b.type&&(!c.parentNode||"ownerSVGElement"in c.parentNode&&!c.ownerSVGElement))&&delete V[a]}},1e4),s.prototype.attr=function(a,c){var d=this,f=d.node;if(!a){if(1!=f.nodeType)return{text:f.nodeValue};for(var g=f.attributes,h={},i=0,j=g.length;j>i;i++)h[g[i].nodeName]=g[i].nodeValue;return h}if(e(a,"string")){if(!(arguments.length>1))return b("snap.util.getattr."+a,d).firstDefined();var k={};k[a]=c,a=k}for(var l in a)a[z](l)&&b("snap.util.attr."+l,d,a[l]);return d},c.parse=function(a){var b=y.doc.createDocumentFragment(),c=!0,d=y.doc.createElement("div");if(a=A(a),a.match(/^\s*<\s*svg(?:\s|>)/)||(a="<svg>"+a+"</svg>",c=!1),d.innerHTML=a,a=d.getElementsByTagName("svg")[0])if(c)b=a;else for(;a.firstChild;)b.appendChild(a.firstChild);return new t(b)},c.fragment=function(){for(var a=Array.prototype.slice.call(arguments,0),b=y.doc.createDocumentFragment(),d=0,e=a.length;e>d;d++){var f=a[d];f.node&&f.node.nodeType&&b.appendChild(f.node),f.nodeType&&b.appendChild(f),"string"==typeof f&&b.appendChild(c.parse(f).node)}return new t(b)},c._.make=u,c._.wrap=w,v.prototype.el=function(a,b){var c=u(a,this.node);return b&&c.attr(b),c},s.prototype.children=function(){for(var a=[],b=this.node.childNodes,d=0,e=b.length;e>d;d++)a[d]=c(b[d]);return a},s.prototype.toJSON=function(){var a=[];return x([this],a),a[0]},b.on("snap.util.getattr",function(){var a=b.nt();a=a.substring(a.lastIndexOf(".")+1);var c=a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()});return bb[z](c)?this.node.ownerDocument.defaultView.getComputedStyle(this.node,null).getPropertyValue(c):d(this.node,a)});var bb={"alignment-baseline":0,"baseline-shift":0,clip:0,"clip-path":0,"clip-rule":0,color:0,"color-interpolation":0,"color-interpolation-filters":0,"color-profile":0,"color-rendering":0,cursor:0,direction:0,display:0,"dominant-baseline":0,"enable-background":0,fill:0,"fill-opacity":0,"fill-rule":0,filter:0,"flood-color":0,"flood-opacity":0,font:0,"font-family":0,"font-size":0,"font-size-adjust":0,"font-stretch":0,"font-style":0,"font-variant":0,"font-weight":0,"glyph-orientation-horizontal":0,"glyph-orientation-vertical":0,"image-rendering":0,kerning:0,"letter-spacing":0,"lighting-color":0,marker:0,"marker-end":0,"marker-mid":0,"marker-start":0,mask:0,opacity:0,overflow:0,"pointer-events":0,"shape-rendering":0,"stop-color":0,"stop-opacity":0,stroke:0,"stroke-dasharray":0,"stroke-dashoffset":0,"stroke-linecap":0,"stroke-linejoin":0,"stroke-miterlimit":0,"stroke-opacity":0,"stroke-width":0,"text-anchor":0,"text-decoration":0,"text-rendering":0,"unicode-bidi":0,visibility:0,"word-spacing":0,"writing-mode":0};b.on("snap.util.attr",function(a){var c=b.nt(),e={};c=c.substring(c.lastIndexOf(".")+1),e[c]=a;var f=c.replace(/-(\w)/gi,function(a,b){return b.toUpperCase()}),g=c.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()});bb[z](g)?this.node.style[f]=null==a?I:a:d(this.node,e)}),function(){}(v.prototype),c.ajax=function(a,c,d,f){var g=new XMLHttpRequest,h=S();if(g){if(e(c,"function"))f=d,d=c,c=null;else if(e(c,"object")){var i=[];for(var j in c)c.hasOwnProperty(j)&&i.push(encodeURIComponent(j)+"="+encodeURIComponent(c[j]));c=i.join("&")}return g.open(c?"POST":"GET",a,!0),c&&(g.setRequestHeader("X-Requested-With","XMLHttpRequest"),g.setRequestHeader("Content-type","application/x-www-form-urlencoded")),d&&(b.once("snap.ajax."+h+".0",d),b.once("snap.ajax."+h+".200",d),b.once("snap.ajax."+h+".304",d)),g.onreadystatechange=function(){4==g.readyState&&b("snap.ajax."+h+"."+g.status,f,g)},4==g.readyState?g:(g.send(c),g)}},c.load=function(a,b,d){c.ajax(a,function(a){var e=c.parse(a.responseText);d?b.call(d,e):b(e)})};var cb=function(a){var b=a.getBoundingClientRect(),c=a.ownerDocument,d=c.body,e=c.documentElement,f=e.clientTop||d.clientTop||0,h=e.clientLeft||d.clientLeft||0,i=b.top+(g.win.pageYOffset||e.scrollTop||d.scrollTop)-f,j=b.left+(g.win.pageXOffset||e.scrollLeft||d.scrollLeft)-h;return{y:i,x:j}};return c.getElementByPoint=function(a,b){var c=this,d=(c.canvas,y.doc.elementFromPoint(a,b));if(y.win.opera&&"svg"==d.tagName){var e=cb(d),f=d.createSVGRect();f.x=a-e.x,f.y=b-e.y,f.width=f.height=1;var g=d.getIntersectionList(f,null);g.length&&(d=g[g.length-1])}return d?w(d):null},c.plugin=function(a){a(c,s,v,y,t)},y.win.Snap=c,c}(a||this);return d.plugin(function(d,e,f,g,h){function i(a,b){if(null==b){var c=!0;if(b=a.node.getAttribute("linearGradient"==a.type||"radialGradient"==a.type?"gradientTransform":"pattern"==a.type?"patternTransform":"transform"),!b)return new d.Matrix;b=d._.svgTransform2string(b)}else b=d._.rgTransform.test(b)?o(b).replace(/\.{3}|\u2026/g,a._.transform||""):d._.svgTransform2string(b),n(b,"array")&&(b=d.path?d.path.toString.call(b):o(b)),a._.transform=b;var e=d._.transform2matrix(b,a.getBBox(1));return c?e:void(a.matrix=e)}function j(a){function b(a,b){var c=q(a.node,b);c=c&&c.match(f),c=c&&c[2],c&&"#"==c.charAt()&&(c=c.substring(1),c&&(h[c]=(h[c]||[]).concat(function(c){var d={};d[b]=URL(c),q(a.node,d)})))}function c(a){var b=q(a.node,"xlink:href");b&&"#"==b.charAt()&&(b=b.substring(1),b&&(h[b]=(h[b]||[]).concat(function(b){a.attr("xlink:href","#"+b)})))}for(var d,e=a.selectAll("*"),f=/^\s*url\(("|'|)(.*)\1\)\s*$/,g=[],h={},i=0,j=e.length;j>i;i++){d=e[i],b(d,"fill"),b(d,"stroke"),b(d,"filter"),b(d,"mask"),b(d,"clip-path"),c(d);var k=q(d.node,"id");k&&(q(d.node,{id:d.id}),g.push({old:k,id:d.id}))}for(i=0,j=g.length;j>i;i++){var l=h[g[i].old];if(l)for(var m=0,n=l.length;n>m;m++)l[m](g[i].id)}}function k(a,b,c){return function(d){var e=d.slice(a,b);return 1==e.length&&(e=e[0]),c?c(e):e}}function l(a){return function(){var b=a?"<"+this.type:"",c=this.node.attributes,d=this.node.childNodes;if(a)for(var e=0,f=c.length;f>e;e++)b+=" "+c[e].name+'="'+c[e].value.replace(/"/g,'\\"')+'"';if(d.length){for(a&&(b+=">"),e=0,f=d.length;f>e;e++)3==d[e].nodeType?b+=d[e].nodeValue:1==d[e].nodeType&&(b+=u(d[e]).toString());a&&(b+="</"+this.type+">")}else a&&(b+="/>");return b}}var m=e.prototype,n=d.is,o=String,p=d._unit2px,q=d._.$,r=d._.make,s=d._.getSomeDefs,t="hasOwnProperty",u=d._.wrap;m.getBBox=function(a){if(!d.Matrix||!d.path)return this.node.getBBox();var b=this,c=new d.Matrix;if(b.removed)return d._.box();for(;"use"==b.type;)if(a||(c=c.add(b.transform().localMatrix.translate(b.attr("x")||0,b.attr("y")||0))),b.original)b=b.original;else{var e=b.attr("xlink:href");b=b.original=b.node.ownerDocument.getElementById(e.substring(e.indexOf("#")+1))}var f=b._,g=d.path.get[b.type]||d.path.get.deflt;try{return a?(f.bboxwt=g?d.path.getBBox(b.realPath=g(b)):d._.box(b.node.getBBox()),d._.box(f.bboxwt)):(b.realPath=g(b),b.matrix=b.transform().localMatrix,f.bbox=d.path.getBBox(d.path.map(b.realPath,c.add(b.matrix))),d._.box(f.bbox))}catch(h){return d._.box()}};var v=function(){return this.string};m.transform=function(a){var b=this._;if(null==a){for(var c,e=this,f=new d.Matrix(this.node.getCTM()),g=i(this),h=[g],j=new d.Matrix,k=g.toTransformString(),l=o(g)==o(this.matrix)?o(b.transform):k;"svg"!=e.type&&(e=e.parent());)h.push(i(e));for(c=h.length;c--;)j.add(h[c]);return{string:l,globalMatrix:f,totalMatrix:j,localMatrix:g,diffMatrix:f.clone().add(g.invert()),global:f.toTransformString(),total:j.toTransformString(),local:k,toString:v}}return a instanceof d.Matrix?(this.matrix=a,this._.transform=a.toTransformString()):i(this,a),this.node&&("linearGradient"==this.type||"radialGradient"==this.type?q(this.node,{gradientTransform:this.matrix}):"pattern"==this.type?q(this.node,{patternTransform:this.matrix}):q(this.node,{transform:this.matrix})),this},m.parent=function(){return u(this.node.parentNode)},m.append=m.add=function(a){if(a){if("set"==a.type){var b=this;return a.forEach(function(a){b.add(a)}),this}a=u(a),this.node.appendChild(a.node),a.paper=this.paper}return this},m.appendTo=function(a){return a&&(a=u(a),a.append(this)),this},m.prepend=function(a){if(a){if("set"==a.type){var b,c=this;return a.forEach(function(a){b?b.after(a):c.prepend(a),b=a}),this}a=u(a);var d=a.parent();this.node.insertBefore(a.node,this.node.firstChild),this.add&&this.add(),a.paper=this.paper,this.parent()&&this.parent().add(),d&&d.add()}return this},m.prependTo=function(a){return a=u(a),a.prepend(this),this},m.before=function(a){if("set"==a.type){var b=this;return a.forEach(function(a){var c=a.parent();b.node.parentNode.insertBefore(a.node,b.node),c&&c.add()}),this.parent().add(),this}a=u(a);var c=a.parent();return this.node.parentNode.insertBefore(a.node,this.node),this.parent()&&this.parent().add(),c&&c.add(),a.paper=this.paper,this},m.after=function(a){a=u(a);var b=a.parent();return this.node.nextSibling?this.node.parentNode.insertBefore(a.node,this.node.nextSibling):this.node.parentNode.appendChild(a.node),this.parent()&&this.parent().add(),b&&b.add(),a.paper=this.paper,this},m.insertBefore=function(a){a=u(a);var b=this.parent();return a.node.parentNode.insertBefore(this.node,a.node),this.paper=a.paper,b&&b.add(),a.parent()&&a.parent().add(),this},m.insertAfter=function(a){a=u(a);var b=this.parent();return a.node.parentNode.insertBefore(this.node,a.node.nextSibling),this.paper=a.paper,b&&b.add(),a.parent()&&a.parent().add(),this},m.remove=function(){var a=this.parent();return this.node.parentNode&&this.node.parentNode.removeChild(this.node),delete this.paper,this.removed=!0,a&&a.add(),this},m.select=function(a){return u(this.node.querySelector(a))},m.selectAll=function(a){for(var b=this.node.querySelectorAll(a),c=(d.set||Array)(),e=0;e<b.length;e++)c.push(u(b[e]));return c},m.asPX=function(a,b){return null==b&&(b=this.attr(a)),+p(this,a,b)},m.use=function(){var a,b=this.node.id;return b||(b=this.id,q(this.node,{id:b})),a="linearGradient"==this.type||"radialGradient"==this.type||"pattern"==this.type?r(this.type,this.node.parentNode):r("use",this.node.parentNode),q(a.node,{"xlink:href":"#"+b}),a.original=this,a},m.clone=function(){var a=u(this.node.cloneNode(!0));return q(a.node,"id")&&q(a.node,{id:a.id}),j(a),a.insertAfter(this),a},m.toDefs=function(){var a=s(this);return a.appendChild(this.node),this},m.pattern=m.toPattern=function(a,b,c,d){var e=r("pattern",s(this));return null==a&&(a=this.getBBox()),n(a,"object")&&"x"in a&&(b=a.y,c=a.width,d=a.height,a=a.x),q(e.node,{x:a,y:b,width:c,height:d,patternUnits:"userSpaceOnUse",id:e.id,viewBox:[a,b,c,d].join(" ")}),e.node.appendChild(this.node),e},m.marker=function(a,b,c,d,e,f){var g=r("marker",s(this));return null==a&&(a=this.getBBox()),n(a,"object")&&"x"in a&&(b=a.y,c=a.width,d=a.height,e=a.refX||a.cx,f=a.refY||a.cy,a=a.x),q(g.node,{viewBox:[a,b,c,d].join(" "),markerWidth:c,markerHeight:d,orient:"auto",refX:e||0,refY:f||0,id:g.id}),g.node.appendChild(this.node),g};var w=function(a,b,d,e){"function"!=typeof d||d.length||(e=d,d=c.linear),this.attr=a,this.dur=b,d&&(this.easing=d),e&&(this.callback=e)};d._.Animation=w,d.animation=function(a,b,c,d){return new w(a,b,c,d)},m.inAnim=function(){var a=this,b=[];for(var c in a.anims)a.anims[t](c)&&!function(a){b.push({anim:new w(a._attrs,a.dur,a.easing,a._callback),mina:a,curStatus:a.status(),status:function(b){return a.status(b)},stop:function(){a.stop()}})}(a.anims[c]);return b},d.animate=function(a,d,e,f,g,h){"function"!=typeof g||g.length||(h=g,g=c.linear);var i=c.time(),j=c(a,d,i,i+f,c.time,e,g);return h&&b.once("mina.finish."+j.id,h),j},m.stop=function(){for(var a=this.inAnim(),b=0,c=a.length;c>b;b++)a[b].stop();return this},m.animate=function(a,d,e,f){"function"!=typeof e||e.length||(f=e,e=c.linear),a instanceof w&&(f=a.callback,e=a.easing,d=a.dur,a=a.attr);var g,h,i,j,l=[],m=[],p={},q=this;for(var r in a)if(a[t](r)){q.equal?(j=q.equal(r,o(a[r])),g=j.from,h=j.to,i=j.f):(g=+q.attr(r),h=+a[r]);var s=n(g,"array")?g.length:1;p[r]=k(l.length,l.length+s,i),l=l.concat(g),m=m.concat(h)}var u=c.time(),v=c(l,m,u,u+d,c.time,function(a){var b={};for(var c in p)p[t](c)&&(b[c]=p[c](a));q.attr(b)},e);return q.anims[v.id]=v,v._attrs=a,v._callback=f,b("snap.animcreated."+q.id,v),b.once("mina.finish."+v.id,function(){delete q.anims[v.id],f&&f.call(q)}),b.once("mina.stop."+v.id,function(){delete q.anims[v.id]}),q};var x={};m.data=function(a,c){var e=x[this.id]=x[this.id]||{};if(0==arguments.length)return b("snap.data.get."+this.id,this,e,null),e;
    if(1==arguments.length){if(d.is(a,"object")){for(var f in a)a[t](f)&&this.data(f,a[f]);return this}return b("snap.data.get."+this.id,this,e[a],a),e[a]}return e[a]=c,b("snap.data.set."+this.id,this,c,a),this},m.removeData=function(a){return null==a?x[this.id]={}:x[this.id]&&delete x[this.id][a],this},m.outerSVG=m.toString=l(1),m.innerSVG=l(),m.toDataURL=function(){if(a&&a.btoa){var b=this.getBBox(),c=d.format('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}</svg>',{x:+b.x.toFixed(3),y:+b.y.toFixed(3),width:+b.width.toFixed(3),height:+b.height.toFixed(3),contents:this.outerSVG()});return"data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(c)))}},h.prototype.select=m.select,h.prototype.selectAll=m.selectAll}),d.plugin(function(a){function b(a,b,d,e,f,g){return null==b&&"[object SVGMatrix]"==c.call(a)?(this.a=a.a,this.b=a.b,this.c=a.c,this.d=a.d,this.e=a.e,void(this.f=a.f)):void(null!=a?(this.a=+a,this.b=+b,this.c=+d,this.d=+e,this.e=+f,this.f=+g):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0))}var c=Object.prototype.toString,d=String,e=Math,f="";!function(c){function g(a){return a[0]*a[0]+a[1]*a[1]}function h(a){var b=e.sqrt(g(a));a[0]&&(a[0]/=b),a[1]&&(a[1]/=b)}c.add=function(a,c,d,e,f,g){var h,i,j,k,l=[[],[],[]],m=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],n=[[a,d,f],[c,e,g],[0,0,1]];for(a&&a instanceof b&&(n=[[a.a,a.c,a.e],[a.b,a.d,a.f],[0,0,1]]),h=0;3>h;h++)for(i=0;3>i;i++){for(k=0,j=0;3>j;j++)k+=m[h][j]*n[j][i];l[h][i]=k}return this.a=l[0][0],this.b=l[1][0],this.c=l[0][1],this.d=l[1][1],this.e=l[0][2],this.f=l[1][2],this},c.invert=function(){var a=this,c=a.a*a.d-a.b*a.c;return new b(a.d/c,-a.b/c,-a.c/c,a.a/c,(a.c*a.f-a.d*a.e)/c,(a.b*a.e-a.a*a.f)/c)},c.clone=function(){return new b(this.a,this.b,this.c,this.d,this.e,this.f)},c.translate=function(a,b){return this.add(1,0,0,1,a,b)},c.scale=function(a,b,c,d){return null==b&&(b=a),(c||d)&&this.add(1,0,0,1,c,d),this.add(a,0,0,b,0,0),(c||d)&&this.add(1,0,0,1,-c,-d),this},c.rotate=function(b,c,d){b=a.rad(b),c=c||0,d=d||0;var f=+e.cos(b).toFixed(9),g=+e.sin(b).toFixed(9);return this.add(f,g,-g,f,c,d),this.add(1,0,0,1,-c,-d)},c.x=function(a,b){return a*this.a+b*this.c+this.e},c.y=function(a,b){return a*this.b+b*this.d+this.f},c.get=function(a){return+this[d.fromCharCode(97+a)].toFixed(4)},c.toString=function(){return"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")"},c.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},c.determinant=function(){return this.a*this.d-this.b*this.c},c.split=function(){var b={};b.dx=this.e,b.dy=this.f;var c=[[this.a,this.c],[this.b,this.d]];b.scalex=e.sqrt(g(c[0])),h(c[0]),b.shear=c[0][0]*c[1][0]+c[0][1]*c[1][1],c[1]=[c[1][0]-c[0][0]*b.shear,c[1][1]-c[0][1]*b.shear],b.scaley=e.sqrt(g(c[1])),h(c[1]),b.shear/=b.scaley,this.determinant()<0&&(b.scalex=-b.scalex);var d=-c[0][1],f=c[1][1];return 0>f?(b.rotate=a.deg(e.acos(f)),0>d&&(b.rotate=360-b.rotate)):b.rotate=a.deg(e.asin(d)),b.isSimple=!(+b.shear.toFixed(9)||b.scalex.toFixed(9)!=b.scaley.toFixed(9)&&b.rotate),b.isSuperSimple=!+b.shear.toFixed(9)&&b.scalex.toFixed(9)==b.scaley.toFixed(9)&&!b.rotate,b.noRotation=!+b.shear.toFixed(9)&&!b.rotate,b},c.toTransformString=function(a){var b=a||this.split();return+b.shear.toFixed(9)?"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]:(b.scalex=+b.scalex.toFixed(4),b.scaley=+b.scaley.toFixed(4),b.rotate=+b.rotate.toFixed(4),(b.dx||b.dy?"t"+[+b.dx.toFixed(4),+b.dy.toFixed(4)]:f)+(1!=b.scalex||1!=b.scaley?"s"+[b.scalex,b.scaley,0,0]:f)+(b.rotate?"r"+[+b.rotate.toFixed(4),0,0]:f))}}(b.prototype),a.Matrix=b,a.matrix=function(a,c,d,e,f,g){return new b(a,c,d,e,f,g)}}),d.plugin(function(a,c,d,e,f){function g(d){return function(e){if(b.stop(),e instanceof f&&1==e.node.childNodes.length&&("radialGradient"==e.node.firstChild.tagName||"linearGradient"==e.node.firstChild.tagName||"pattern"==e.node.firstChild.tagName)&&(e=e.node.firstChild,n(this).appendChild(e),e=l(e)),e instanceof c)if("radialGradient"==e.type||"linearGradient"==e.type||"pattern"==e.type){e.node.id||p(e.node,{id:e.id});var g=q(e.node.id)}else g=e.attr(d);else if(g=a.color(e),g.error){var h=a(n(this).ownerSVGElement).gradient(e);h?(h.node.id||p(h.node,{id:h.id}),g=q(h.node.id)):g=e}else g=r(g);var i={};i[d]=g,p(this.node,i),this.node.style[d]=t}}function h(a){b.stop(),a==+a&&(a+="px"),this.node.style.fontSize=a}function i(a){for(var b=[],c=a.childNodes,d=0,e=c.length;e>d;d++){var f=c[d];3==f.nodeType&&b.push(f.nodeValue),"tspan"==f.tagName&&b.push(1==f.childNodes.length&&3==f.firstChild.nodeType?f.firstChild.nodeValue:i(f))}return b}function j(){return b.stop(),this.node.style.fontSize}var k=a._.make,l=a._.wrap,m=a.is,n=a._.getSomeDefs,o=/^url\(#?([^)]+)\)$/,p=a._.$,q=a.url,r=String,s=a._.separator,t="";b.on("snap.util.attr.mask",function(a){if(a instanceof c||a instanceof f){if(b.stop(),a instanceof f&&1==a.node.childNodes.length&&(a=a.node.firstChild,n(this).appendChild(a),a=l(a)),"mask"==a.type)var d=a;else d=k("mask",n(this)),d.node.appendChild(a.node);!d.node.id&&p(d.node,{id:d.id}),p(this.node,{mask:q(d.id)})}}),function(a){b.on("snap.util.attr.clip",a),b.on("snap.util.attr.clip-path",a),b.on("snap.util.attr.clipPath",a)}(function(a){if(a instanceof c||a instanceof f){if(b.stop(),"clipPath"==a.type)var d=a;else d=k("clipPath",n(this)),d.node.appendChild(a.node),!d.node.id&&p(d.node,{id:d.id});p(this.node,{"clip-path":q(d.node.id||d.id)})}}),b.on("snap.util.attr.fill",g("fill")),b.on("snap.util.attr.stroke",g("stroke"));var u=/^([lr])(?:\(([^)]*)\))?(.*)$/i;b.on("snap.util.grad.parse",function(a){a=r(a);var b=a.match(u);if(!b)return null;var c=b[1],d=b[2],e=b[3];return d=d.split(/\s*,\s*/).map(function(a){return+a==a?+a:a}),1==d.length&&0==d[0]&&(d=[]),e=e.split("-"),e=e.map(function(a){a=a.split(":");var b={color:a[0]};return a[1]&&(b.offset=parseFloat(a[1])),b}),{type:c,params:d,stops:e}}),b.on("snap.util.attr.d",function(c){b.stop(),m(c,"array")&&m(c[0],"array")&&(c=a.path.toString.call(c)),c=r(c),c.match(/[ruo]/i)&&(c=a.path.toAbsolute(c)),p(this.node,{d:c})})(-1),b.on("snap.util.attr.#text",function(a){b.stop(),a=r(a);for(var c=e.doc.createTextNode(a);this.node.firstChild;)this.node.removeChild(this.node.firstChild);this.node.appendChild(c)})(-1),b.on("snap.util.attr.path",function(a){b.stop(),this.attr({d:a})})(-1),b.on("snap.util.attr.class",function(a){b.stop(),this.node.className.baseVal=a})(-1),b.on("snap.util.attr.viewBox",function(a){var c;c=m(a,"object")&&"x"in a?[a.x,a.y,a.width,a.height].join(" "):m(a,"array")?a.join(" "):a,p(this.node,{viewBox:c}),b.stop()})(-1),b.on("snap.util.attr.transform",function(a){this.transform(a),b.stop()})(-1),b.on("snap.util.attr.r",function(a){"rect"==this.type&&(b.stop(),p(this.node,{rx:a,ry:a}))})(-1),b.on("snap.util.attr.textpath",function(a){if(b.stop(),"text"==this.type){var d,e,f;if(!a&&this.textPath){for(e=this.textPath;e.node.firstChild;)this.node.appendChild(e.node.firstChild);return e.remove(),void delete this.textPath}if(m(a,"string")){var g=n(this),h=l(g.parentNode).path(a);g.appendChild(h.node),d=h.id,h.attr({id:d})}else a=l(a),a instanceof c&&(d=a.attr("id"),d||(d=a.id,a.attr({id:d})));if(d)if(e=this.textPath,f=this.node,e)e.attr({"xlink:href":"#"+d});else{for(e=p("textPath",{"xlink:href":"#"+d});f.firstChild;)e.appendChild(f.firstChild);f.appendChild(e),this.textPath=l(e)}}})(-1),b.on("snap.util.attr.text",function(a){if("text"==this.type){for(var c=this.node,d=function(a){var b=p("tspan");if(m(a,"array"))for(var c=0;c<a.length;c++)b.appendChild(d(a[c]));else b.appendChild(e.doc.createTextNode(a));return b.normalize&&b.normalize(),b};c.firstChild;)c.removeChild(c.firstChild);for(var f=d(a);f.firstChild;)c.appendChild(f.firstChild)}b.stop()})(-1),b.on("snap.util.attr.fontSize",h)(-1),b.on("snap.util.attr.font-size",h)(-1),b.on("snap.util.getattr.transform",function(){return b.stop(),this.transform()})(-1),b.on("snap.util.getattr.textpath",function(){return b.stop(),this.textPath})(-1),function(){function c(c){return function(){b.stop();var d=e.doc.defaultView.getComputedStyle(this.node,null).getPropertyValue("marker-"+c);return"none"==d?d:a(e.doc.getElementById(d.match(o)[1]))}}function d(a){return function(c){b.stop();var d="marker"+a.charAt(0).toUpperCase()+a.substring(1);if(""==c||!c)return void(this.node.style[d]="none");if("marker"==c.type){var e=c.node.id;return e||p(c.node,{id:c.id}),void(this.node.style[d]=q(e))}}}b.on("snap.util.getattr.marker-end",c("end"))(-1),b.on("snap.util.getattr.markerEnd",c("end"))(-1),b.on("snap.util.getattr.marker-start",c("start"))(-1),b.on("snap.util.getattr.markerStart",c("start"))(-1),b.on("snap.util.getattr.marker-mid",c("mid"))(-1),b.on("snap.util.getattr.markerMid",c("mid"))(-1),b.on("snap.util.attr.marker-end",d("end"))(-1),b.on("snap.util.attr.markerEnd",d("end"))(-1),b.on("snap.util.attr.marker-start",d("start"))(-1),b.on("snap.util.attr.markerStart",d("start"))(-1),b.on("snap.util.attr.marker-mid",d("mid"))(-1),b.on("snap.util.attr.markerMid",d("mid"))(-1)}(),b.on("snap.util.getattr.r",function(){return"rect"==this.type&&p(this.node,"rx")==p(this.node,"ry")?(b.stop(),p(this.node,"rx")):void 0})(-1),b.on("snap.util.getattr.text",function(){if("text"==this.type||"tspan"==this.type){b.stop();var a=i(this.node);return 1==a.length?a[0]:a}})(-1),b.on("snap.util.getattr.#text",function(){return this.node.textContent})(-1),b.on("snap.util.getattr.viewBox",function(){b.stop();var c=p(this.node,"viewBox");return c?(c=c.split(s),a._.box(+c[0],+c[1],+c[2],+c[3])):void 0})(-1),b.on("snap.util.getattr.points",function(){var a=p(this.node,"points");return b.stop(),a?a.split(s):void 0})(-1),b.on("snap.util.getattr.path",function(){var a=p(this.node,"d");return b.stop(),a})(-1),b.on("snap.util.getattr.class",function(){return this.node.className.baseVal})(-1),b.on("snap.util.getattr.fontSize",j)(-1),b.on("snap.util.getattr.font-size",j)(-1)}),d.plugin(function(a,b){var c=/\S+/g,d=String,e=b.prototype;e.addClass=function(a){var b,e,f,g,h=d(a||"").match(c)||[],i=this.node,j=i.className.baseVal,k=j.match(c)||[];if(h.length){for(b=0;f=h[b++];)e=k.indexOf(f),~e||k.push(f);g=k.join(" "),j!=g&&(i.className.baseVal=g)}return this},e.removeClass=function(a){var b,e,f,g,h=d(a||"").match(c)||[],i=this.node,j=i.className.baseVal,k=j.match(c)||[];if(k.length){for(b=0;f=h[b++];)e=k.indexOf(f),~e&&k.splice(e,1);g=k.join(" "),j!=g&&(i.className.baseVal=g)}return this},e.hasClass=function(a){var b=this.node,d=b.className.baseVal,e=d.match(c)||[];return!!~e.indexOf(a)},e.toggleClass=function(a,b){if(null!=b)return b?this.addClass(a):this.removeClass(a);var d,e,f,g,h=(a||"").match(c)||[],i=this.node,j=i.className.baseVal,k=j.match(c)||[];for(d=0;f=h[d++];)e=k.indexOf(f),~e?k.splice(e,1):k.push(f);return g=k.join(" "),j!=g&&(i.className.baseVal=g),this}}),d.plugin(function(){function a(a){return a}function c(a){return function(b){return+b.toFixed(3)+a}}var d={"+":function(a,b){return a+b},"-":function(a,b){return a-b},"/":function(a,b){return a/b},"*":function(a,b){return a*b}},e=String,f=/[a-z]+$/i,g=/^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;b.on("snap.util.attr",function(a){var c=e(a).match(g);if(c){var h=b.nt(),i=h.substring(h.lastIndexOf(".")+1),j=this.attr(i),k={};b.stop();var l=c[3]||"",m=j.match(f),n=d[c[1]];if(m&&m==l?a=n(parseFloat(j),+c[2]):(j=this.asPX(i),a=n(this.asPX(i),this.asPX(i,c[2]+l))),isNaN(j)||isNaN(a))return;k[i]=a,this.attr(k)}})(-10),b.on("snap.util.equal",function(h,i){var j=e(this.attr(h)||""),k=e(i).match(g);if(k){b.stop();var l=k[3]||"",m=j.match(f),n=d[k[1]];return m&&m==l?{from:parseFloat(j),to:n(parseFloat(j),+k[2]),f:c(m)}:(j=this.asPX(h),{from:j,to:n(j,this.asPX(h,k[2]+l)),f:a})}})(-10)}),d.plugin(function(c,d,e,f){var g=e.prototype,h=c.is;g.rect=function(a,b,c,d,e,f){var g;return null==f&&(f=e),h(a,"object")&&"[object Object]"==a?g=a:null!=a&&(g={x:a,y:b,width:c,height:d},null!=e&&(g.rx=e,g.ry=f)),this.el("rect",g)},g.circle=function(a,b,c){var d;return h(a,"object")&&"[object Object]"==a?d=a:null!=a&&(d={cx:a,cy:b,r:c}),this.el("circle",d)};var i=function(){function a(){this.parentNode.removeChild(this)}return function(b,c){var d=f.doc.createElement("img"),e=f.doc.body;d.style.cssText="position:absolute;left:-9999em;top:-9999em",d.onload=function(){c.call(d),d.onload=d.onerror=null,e.removeChild(d)},d.onerror=a,e.appendChild(d),d.src=b}}();g.image=function(a,b,d,e,f){var g=this.el("image");if(h(a,"object")&&"src"in a)g.attr(a);else if(null!=a){var j={"xlink:href":a,preserveAspectRatio:"none"};null!=b&&null!=d&&(j.x=b,j.y=d),null!=e&&null!=f?(j.width=e,j.height=f):i(a,function(){c._.$(g.node,{width:this.offsetWidth,height:this.offsetHeight})}),c._.$(g.node,j)}return g},g.ellipse=function(a,b,c,d){var e;return h(a,"object")&&"[object Object]"==a?e=a:null!=a&&(e={cx:a,cy:b,rx:c,ry:d}),this.el("ellipse",e)},g.path=function(a){var b;return h(a,"object")&&!h(a,"array")?b=a:a&&(b={d:a}),this.el("path",b)},g.group=g.g=function(a){var b=this.el("g");return 1==arguments.length&&a&&!a.type?b.attr(a):arguments.length&&b.add(Array.prototype.slice.call(arguments,0)),b},g.svg=function(a,b,c,d,e,f,g,i){var j={};return h(a,"object")&&null==b?j=a:(null!=a&&(j.x=a),null!=b&&(j.y=b),null!=c&&(j.width=c),null!=d&&(j.height=d),null!=e&&null!=f&&null!=g&&null!=i&&(j.viewBox=[e,f,g,i])),this.el("svg",j)},g.mask=function(a){var b=this.el("mask");return 1==arguments.length&&a&&!a.type?b.attr(a):arguments.length&&b.add(Array.prototype.slice.call(arguments,0)),b},g.ptrn=function(a,b,c,d,e,f,g,i){if(h(a,"object"))var j=a;else j={patternUnits:"userSpaceOnUse"},a&&(j.x=a),b&&(j.y=b),null!=c&&(j.width=c),null!=d&&(j.height=d),j.viewBox=null!=e&&null!=f&&null!=g&&null!=i?[e,f,g,i]:[a||0,b||0,c||0,d||0];return this.el("pattern",j)},g.use=function(a){return null!=a?(a instanceof d&&(a.attr("id")||a.attr({id:c._.id(a)}),a=a.attr("id")),"#"==String(a).charAt()&&(a=a.substring(1)),this.el("use",{"xlink:href":"#"+a})):d.prototype.use.call(this)},g.symbol=function(a,b,c,d){var e={};return null!=a&&null!=b&&null!=c&&null!=d&&(e.viewBox=[a,b,c,d]),this.el("symbol",e)},g.text=function(a,b,c){var d={};return h(a,"object")?d=a:null!=a&&(d={x:a,y:b,text:c||""}),this.el("text",d)},g.line=function(a,b,c,d){var e={};return h(a,"object")?e=a:null!=a&&(e={x1:a,x2:c,y1:b,y2:d}),this.el("line",e)},g.polyline=function(a){arguments.length>1&&(a=Array.prototype.slice.call(arguments,0));var b={};return h(a,"object")&&!h(a,"array")?b=a:null!=a&&(b={points:a}),this.el("polyline",b)},g.polygon=function(a){arguments.length>1&&(a=Array.prototype.slice.call(arguments,0));var b={};return h(a,"object")&&!h(a,"array")?b=a:null!=a&&(b={points:a}),this.el("polygon",b)},function(){function d(){return this.selectAll("stop")}function e(a,b){var d=k("stop"),e={offset:+b+"%"};return a=c.color(a),e["stop-color"]=a.hex,a.opacity<1&&(e["stop-opacity"]=a.opacity),k(d,e),this.node.appendChild(d),this}function f(){if("linearGradient"==this.type){var a=k(this.node,"x1")||0,b=k(this.node,"x2")||1,d=k(this.node,"y1")||0,e=k(this.node,"y2")||0;return c._.box(a,d,math.abs(b-a),math.abs(e-d))}var f=this.node.cx||.5,g=this.node.cy||.5,h=this.node.r||0;return c._.box(f-h,g-h,2*h,2*h)}function h(a,c){function d(a,b){for(var c=(b-l)/(a-m),d=m;a>d;d++)g[d].offset=+(+l+c*(d-m)).toFixed(2);m=a,l=b}var e,f=b("snap.util.grad.parse",null,c).firstDefined();if(!f)return null;f.params.unshift(a),e="l"==f.type.toLowerCase()?i.apply(0,f.params):j.apply(0,f.params),f.type!=f.type.toLowerCase()&&k(e.node,{gradientUnits:"userSpaceOnUse"});var g=f.stops,h=g.length,l=0,m=0;h--;for(var n=0;h>n;n++)"offset"in g[n]&&d(n,g[n].offset);for(g[h].offset=g[h].offset||100,d(h,g[h].offset),n=0;h>=n;n++){var o=g[n];e.addStop(o.color,o.offset)}return e}function i(a,b,g,h,i){var j=c._.make("linearGradient",a);return j.stops=d,j.addStop=e,j.getBBox=f,null!=b&&k(j.node,{x1:b,y1:g,x2:h,y2:i}),j}function j(a,b,g,h,i,j){var l=c._.make("radialGradient",a);return l.stops=d,l.addStop=e,l.getBBox=f,null!=b&&k(l.node,{cx:b,cy:g,r:h}),null!=i&&null!=j&&k(l.node,{fx:i,fy:j}),l}var k=c._.$;g.gradient=function(a){return h(this.defs,a)},g.gradientLinear=function(a,b,c,d){return i(this.defs,a,b,c,d)},g.gradientRadial=function(a,b,c,d,e){return j(this.defs,a,b,c,d,e)},g.toString=function(){var a,b=this.node.ownerDocument,d=b.createDocumentFragment(),e=b.createElement("div"),f=this.node.cloneNode(!0);return d.appendChild(e),e.appendChild(f),c._.$(f,{xmlns:"http://www.w3.org/2000/svg"}),a=e.innerHTML,d.removeChild(d.firstChild),a},g.toDataURL=function(){return a&&a.btoa?"data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(this))):void 0},g.clear=function(){for(var a,b=this.node.firstChild;b;)a=b.nextSibling,"defs"!=b.tagName?b.parentNode.removeChild(b):g.clear.call({node:b}),b=a}}()}),d.plugin(function(a,b){function c(a){var b=c.ps=c.ps||{};return b[a]?b[a].sleep=100:b[a]={sleep:100},setTimeout(function(){for(var c in b)b[K](c)&&c!=a&&(b[c].sleep--,!b[c].sleep&&delete b[c])}),b[a]}function d(a,b,c,d){return null==a&&(a=b=c=d=0),null==b&&(b=a.y,c=a.width,d=a.height,a=a.x),{x:a,y:b,width:c,w:c,height:d,h:d,x2:a+c,y2:b+d,cx:a+c/2,cy:b+d/2,r1:N.min(c,d)/2,r2:N.max(c,d)/2,r0:N.sqrt(c*c+d*d)/2,path:w(a,b,c,d),vb:[a,b,c,d].join(" ")}}function e(){return this.join(",").replace(L,"$1")}function f(a){var b=J(a);return b.toString=e,b}function g(a,b,c,d,e,f,g,h,j){return null==j?n(a,b,c,d,e,f,g,h):i(a,b,c,d,e,f,g,h,o(a,b,c,d,e,f,g,h,j))}function h(c,d){function e(a){return+(+a).toFixed(3)}return a._.cacher(function(a,f,h){a instanceof b&&(a=a.attr("d")),a=E(a);for(var j,k,l,m,n,o="",p={},q=0,r=0,s=a.length;s>r;r++){if(l=a[r],"M"==l[0])j=+l[1],k=+l[2];else{if(m=g(j,k,l[1],l[2],l[3],l[4],l[5],l[6]),q+m>f){if(d&&!p.start){if(n=g(j,k,l[1],l[2],l[3],l[4],l[5],l[6],f-q),o+=["C"+e(n.start.x),e(n.start.y),e(n.m.x),e(n.m.y),e(n.x),e(n.y)],h)return o;p.start=o,o=["M"+e(n.x),e(n.y)+"C"+e(n.n.x),e(n.n.y),e(n.end.x),e(n.end.y),e(l[5]),e(l[6])].join(),q+=m,j=+l[5],k=+l[6];continue}if(!c&&!d)return n=g(j,k,l[1],l[2],l[3],l[4],l[5],l[6],f-q)}q+=m,j=+l[5],k=+l[6]}o+=l.shift()+l}return p.end=o,n=c?q:d?p:i(j,k,l[0],l[1],l[2],l[3],l[4],l[5],1)},null,a._.clone)}function i(a,b,c,d,e,f,g,h,i){var j=1-i,k=R(j,3),l=R(j,2),m=i*i,n=m*i,o=k*a+3*l*i*c+3*j*i*i*e+n*g,p=k*b+3*l*i*d+3*j*i*i*f+n*h,q=a+2*i*(c-a)+m*(e-2*c+a),r=b+2*i*(d-b)+m*(f-2*d+b),s=c+2*i*(e-c)+m*(g-2*e+c),t=d+2*i*(f-d)+m*(h-2*f+d),u=j*a+i*c,v=j*b+i*d,w=j*e+i*g,x=j*f+i*h,y=90-180*N.atan2(q-s,r-t)/O;return{x:o,y:p,m:{x:q,y:r},n:{x:s,y:t},start:{x:u,y:v},end:{x:w,y:x},alpha:y}}function j(b,c,e,f,g,h,i,j){a.is(b,"array")||(b=[b,c,e,f,g,h,i,j]);var k=D.apply(null,b);return d(k.min.x,k.min.y,k.max.x-k.min.x,k.max.y-k.min.y)}function k(a,b,c){return b>=a.x&&b<=a.x+a.width&&c>=a.y&&c<=a.y+a.height}function l(a,b){return a=d(a),b=d(b),k(b,a.x,a.y)||k(b,a.x2,a.y)||k(b,a.x,a.y2)||k(b,a.x2,a.y2)||k(a,b.x,b.y)||k(a,b.x2,b.y)||k(a,b.x,b.y2)||k(a,b.x2,b.y2)||(a.x<b.x2&&a.x>b.x||b.x<a.x2&&b.x>a.x)&&(a.y<b.y2&&a.y>b.y||b.y<a.y2&&b.y>a.y)}function m(a,b,c,d,e){var f=-3*b+9*c-9*d+3*e,g=a*f+6*b-12*c+6*d;return a*g-3*b+3*c}function n(a,b,c,d,e,f,g,h,i){null==i&&(i=1),i=i>1?1:0>i?0:i;for(var j=i/2,k=12,l=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],n=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],o=0,p=0;k>p;p++){var q=j*l[p]+j,r=m(q,a,c,e,g),s=m(q,b,d,f,h),t=r*r+s*s;o+=n[p]*N.sqrt(t)}return j*o}function o(a,b,c,d,e,f,g,h,i){if(!(0>i||n(a,b,c,d,e,f,g,h)<i)){var j,k=1,l=k/2,m=k-l,o=.01;for(j=n(a,b,c,d,e,f,g,h,m);S(j-i)>o;)l/=2,m+=(i>j?1:-1)*l,j=n(a,b,c,d,e,f,g,h,m);return m}}function p(a,b,c,d,e,f,g,h){if(!(Q(a,c)<P(e,g)||P(a,c)>Q(e,g)||Q(b,d)<P(f,h)||P(b,d)>Q(f,h))){var i=(a*d-b*c)*(e-g)-(a-c)*(e*h-f*g),j=(a*d-b*c)*(f-h)-(b-d)*(e*h-f*g),k=(a-c)*(f-h)-(b-d)*(e-g);if(k){var l=i/k,m=j/k,n=+l.toFixed(2),o=+m.toFixed(2);if(!(n<+P(a,c).toFixed(2)||n>+Q(a,c).toFixed(2)||n<+P(e,g).toFixed(2)||n>+Q(e,g).toFixed(2)||o<+P(b,d).toFixed(2)||o>+Q(b,d).toFixed(2)||o<+P(f,h).toFixed(2)||o>+Q(f,h).toFixed(2)))return{x:l,y:m}}}}function q(a,b,c){var d=j(a),e=j(b);if(!l(d,e))return c?0:[];for(var f=n.apply(0,a),g=n.apply(0,b),h=~~(f/8),k=~~(g/8),m=[],o=[],q={},r=c?0:[],s=0;h+1>s;s++){var t=i.apply(0,a.concat(s/h));m.push({x:t.x,y:t.y,t:s/h})}for(s=0;k+1>s;s++)t=i.apply(0,b.concat(s/k)),o.push({x:t.x,y:t.y,t:s/k});for(s=0;h>s;s++)for(var u=0;k>u;u++){var v=m[s],w=m[s+1],x=o[u],y=o[u+1],z=S(w.x-v.x)<.001?"y":"x",A=S(y.x-x.x)<.001?"y":"x",B=p(v.x,v.y,w.x,w.y,x.x,x.y,y.x,y.y);if(B){if(q[B.x.toFixed(4)]==B.y.toFixed(4))continue;q[B.x.toFixed(4)]=B.y.toFixed(4);var C=v.t+S((B[z]-v[z])/(w[z]-v[z]))*(w.t-v.t),D=x.t+S((B[A]-x[A])/(y[A]-x[A]))*(y.t-x.t);C>=0&&1>=C&&D>=0&&1>=D&&(c?r++:r.push({x:B.x,y:B.y,t1:C,t2:D}))}}return r}function r(a,b){return t(a,b)}function s(a,b){return t(a,b,1)}function t(a,b,c){a=E(a),b=E(b);for(var d,e,f,g,h,i,j,k,l,m,n=c?0:[],o=0,p=a.length;p>o;o++){var r=a[o];if("M"==r[0])d=h=r[1],e=i=r[2];else{"C"==r[0]?(l=[d,e].concat(r.slice(1)),d=l[6],e=l[7]):(l=[d,e,d,e,h,i,h,i],d=h,e=i);for(var s=0,t=b.length;t>s;s++){var u=b[s];if("M"==u[0])f=j=u[1],g=k=u[2];else{"C"==u[0]?(m=[f,g].concat(u.slice(1)),f=m[6],g=m[7]):(m=[f,g,f,g,j,k,j,k],f=j,g=k);var v=q(l,m,c);if(c)n+=v;else{for(var w=0,x=v.length;x>w;w++)v[w].segment1=o,v[w].segment2=s,v[w].bez1=l,v[w].bez2=m;n=n.concat(v)}}}}}return n}function u(a,b,c){var d=v(a);return k(d,b,c)&&t(a,[["M",b,c],["H",d.x2+10]],1)%2==1}function v(a){var b=c(a);if(b.bbox)return J(b.bbox);if(!a)return d();a=E(a);for(var e,f=0,g=0,h=[],i=[],j=0,k=a.length;k>j;j++)if(e=a[j],"M"==e[0])f=e[1],g=e[2],h.push(f),i.push(g);else{var l=D(f,g,e[1],e[2],e[3],e[4],e[5],e[6]);h=h.concat(l.min.x,l.max.x),i=i.concat(l.min.y,l.max.y),f=e[5],g=e[6]}var m=P.apply(0,h),n=P.apply(0,i),o=Q.apply(0,h),p=Q.apply(0,i),q=d(m,n,o-m,p-n);return b.bbox=J(q),q}function w(a,b,c,d,f){if(f)return[["M",+a+ +f,b],["l",c-2*f,0],["a",f,f,0,0,1,f,f],["l",0,d-2*f],["a",f,f,0,0,1,-f,f],["l",2*f-c,0],["a",f,f,0,0,1,-f,-f],["l",0,2*f-d],["a",f,f,0,0,1,f,-f],["z"]];var g=[["M",a,b],["l",c,0],["l",0,d],["l",-c,0],["z"]];return g.toString=e,g}function x(a,b,c,d,f){if(null==f&&null==d&&(d=c),a=+a,b=+b,c=+c,d=+d,null!=f)var g=Math.PI/180,h=a+c*Math.cos(-d*g),i=a+c*Math.cos(-f*g),j=b+c*Math.sin(-d*g),k=b+c*Math.sin(-f*g),l=[["M",h,j],["A",c,c,0,+(f-d>180),0,i,k]];else l=[["M",a,b],["m",0,-d],["a",c,d,0,1,1,0,2*d],["a",c,d,0,1,1,0,-2*d],["z"]];return l.toString=e,l}function y(b){var d=c(b),g=String.prototype.toLowerCase;if(d.rel)return f(d.rel);a.is(b,"array")&&a.is(b&&b[0],"array")||(b=a.parsePathString(b));var h=[],i=0,j=0,k=0,l=0,m=0;"M"==b[0][0]&&(i=b[0][1],j=b[0][2],k=i,l=j,m++,h.push(["M",i,j]));for(var n=m,o=b.length;o>n;n++){var p=h[n]=[],q=b[n];if(q[0]!=g.call(q[0]))switch(p[0]=g.call(q[0]),p[0]){case"a":p[1]=q[1],p[2]=q[2],p[3]=q[3],p[4]=q[4],p[5]=q[5],p[6]=+(q[6]-i).toFixed(3),p[7]=+(q[7]-j).toFixed(3);break;case"v":p[1]=+(q[1]-j).toFixed(3);break;case"m":k=q[1],l=q[2];default:for(var r=1,s=q.length;s>r;r++)p[r]=+(q[r]-(r%2?i:j)).toFixed(3)}else{p=h[n]=[],"m"==q[0]&&(k=q[1]+i,l=q[2]+j);for(var t=0,u=q.length;u>t;t++)h[n][t]=q[t]}var v=h[n].length;switch(h[n][0]){case"z":i=k,j=l;break;case"h":i+=+h[n][v-1];break;case"v":j+=+h[n][v-1];break;default:i+=+h[n][v-2],j+=+h[n][v-1]}}return h.toString=e,d.rel=f(h),h}function z(b){var d=c(b);if(d.abs)return f(d.abs);if(I(b,"array")&&I(b&&b[0],"array")||(b=a.parsePathString(b)),!b||!b.length)return[["M",0,0]];var g,h=[],i=0,j=0,k=0,l=0,m=0;"M"==b[0][0]&&(i=+b[0][1],j=+b[0][2],k=i,l=j,m++,h[0]=["M",i,j]);for(var n,o,p=3==b.length&&"M"==b[0][0]&&"R"==b[1][0].toUpperCase()&&"Z"==b[2][0].toUpperCase(),q=m,r=b.length;r>q;q++){if(h.push(n=[]),o=b[q],g=o[0],g!=g.toUpperCase())switch(n[0]=g.toUpperCase(),n[0]){case"A":n[1]=o[1],n[2]=o[2],n[3]=o[3],n[4]=o[4],n[5]=o[5],n[6]=+o[6]+i,n[7]=+o[7]+j;break;case"V":n[1]=+o[1]+j;break;case"H":n[1]=+o[1]+i;break;case"R":for(var s=[i,j].concat(o.slice(1)),t=2,u=s.length;u>t;t++)s[t]=+s[t]+i,s[++t]=+s[t]+j;h.pop(),h=h.concat(G(s,p));break;case"O":h.pop(),s=x(i,j,o[1],o[2]),s.push(s[0]),h=h.concat(s);break;case"U":h.pop(),h=h.concat(x(i,j,o[1],o[2],o[3])),n=["U"].concat(h[h.length-1].slice(-2));break;case"M":k=+o[1]+i,l=+o[2]+j;default:for(t=1,u=o.length;u>t;t++)n[t]=+o[t]+(t%2?i:j)}else if("R"==g)s=[i,j].concat(o.slice(1)),h.pop(),h=h.concat(G(s,p)),n=["R"].concat(o.slice(-2));else if("O"==g)h.pop(),s=x(i,j,o[1],o[2]),s.push(s[0]),h=h.concat(s);else if("U"==g)h.pop(),h=h.concat(x(i,j,o[1],o[2],o[3])),n=["U"].concat(h[h.length-1].slice(-2));else for(var v=0,w=o.length;w>v;v++)n[v]=o[v];if(g=g.toUpperCase(),"O"!=g)switch(n[0]){case"Z":i=+k,j=+l;break;case"H":i=n[1];break;case"V":j=n[1];break;case"M":k=n[n.length-2],l=n[n.length-1];default:i=n[n.length-2],j=n[n.length-1]}}return h.toString=e,d.abs=f(h),h}function A(a,b,c,d){return[a,b,c,d,c,d]}function B(a,b,c,d,e,f){var g=1/3,h=2/3;return[g*a+h*c,g*b+h*d,g*e+h*c,g*f+h*d,e,f]}function C(b,c,d,e,f,g,h,i,j,k){var l,m=120*O/180,n=O/180*(+f||0),o=[],p=a._.cacher(function(a,b,c){var d=a*N.cos(c)-b*N.sin(c),e=a*N.sin(c)+b*N.cos(c);return{x:d,y:e}});if(k)y=k[0],z=k[1],w=k[2],x=k[3];else{l=p(b,c,-n),b=l.x,c=l.y,l=p(i,j,-n),i=l.x,j=l.y;var q=(N.cos(O/180*f),N.sin(O/180*f),(b-i)/2),r=(c-j)/2,s=q*q/(d*d)+r*r/(e*e);s>1&&(s=N.sqrt(s),d=s*d,e=s*e);var t=d*d,u=e*e,v=(g==h?-1:1)*N.sqrt(S((t*u-t*r*r-u*q*q)/(t*r*r+u*q*q))),w=v*d*r/e+(b+i)/2,x=v*-e*q/d+(c+j)/2,y=N.asin(((c-x)/e).toFixed(9)),z=N.asin(((j-x)/e).toFixed(9));y=w>b?O-y:y,z=w>i?O-z:z,0>y&&(y=2*O+y),0>z&&(z=2*O+z),h&&y>z&&(y-=2*O),!h&&z>y&&(z-=2*O)}var A=z-y;if(S(A)>m){var B=z,D=i,E=j;z=y+m*(h&&z>y?1:-1),i=w+d*N.cos(z),j=x+e*N.sin(z),o=C(i,j,d,e,f,0,h,D,E,[z,B,w,x])}A=z-y;var F=N.cos(y),G=N.sin(y),H=N.cos(z),I=N.sin(z),J=N.tan(A/4),K=4/3*d*J,L=4/3*e*J,M=[b,c],P=[b+K*G,c-L*F],Q=[i+K*I,j-L*H],R=[i,j];if(P[0]=2*M[0]-P[0],P[1]=2*M[1]-P[1],k)return[P,Q,R].concat(o);o=[P,Q,R].concat(o).join().split(",");for(var T=[],U=0,V=o.length;V>U;U++)T[U]=U%2?p(o[U-1],o[U],n).y:p(o[U],o[U+1],n).x;return T}function D(a,b,c,d,e,f,g,h){for(var i,j,k,l,m,n,o,p,q=[],r=[[],[]],s=0;2>s;++s)if(0==s?(j=6*a-12*c+6*e,i=-3*a+9*c-9*e+3*g,k=3*c-3*a):(j=6*b-12*d+6*f,i=-3*b+9*d-9*f+3*h,k=3*d-3*b),S(i)<1e-12){if(S(j)<1e-12)continue;l=-k/j,l>0&&1>l&&q.push(l)}else o=j*j-4*k*i,p=N.sqrt(o),0>o||(m=(-j+p)/(2*i),m>0&&1>m&&q.push(m),n=(-j-p)/(2*i),n>0&&1>n&&q.push(n));for(var t,u=q.length,v=u;u--;)l=q[u],t=1-l,r[0][u]=t*t*t*a+3*t*t*l*c+3*t*l*l*e+l*l*l*g,r[1][u]=t*t*t*b+3*t*t*l*d+3*t*l*l*f+l*l*l*h;return r[0][v]=a,r[1][v]=b,r[0][v+1]=g,r[1][v+1]=h,r[0].length=r[1].length=v+2,{min:{x:P.apply(0,r[0]),y:P.apply(0,r[1])},max:{x:Q.apply(0,r[0]),y:Q.apply(0,r[1])}}}function E(a,b){var d=!b&&c(a);if(!b&&d.curve)return f(d.curve);for(var e=z(a),g=b&&z(b),h={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},i={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},j=(function(a,b,c){var d,e;if(!a)return["C",b.x,b.y,b.x,b.y,b.x,b.y];switch(!(a[0]in{T:1,Q:1})&&(b.qx=b.qy=null),a[0]){case"M":b.X=a[1],b.Y=a[2];break;case"A":a=["C"].concat(C.apply(0,[b.x,b.y].concat(a.slice(1))));break;case"S":"C"==c||"S"==c?(d=2*b.x-b.bx,e=2*b.y-b.by):(d=b.x,e=b.y),a=["C",d,e].concat(a.slice(1));break;case"T":"Q"==c||"T"==c?(b.qx=2*b.x-b.qx,b.qy=2*b.y-b.qy):(b.qx=b.x,b.qy=b.y),a=["C"].concat(B(b.x,b.y,b.qx,b.qy,a[1],a[2]));break;case"Q":b.qx=a[1],b.qy=a[2],a=["C"].concat(B(b.x,b.y,a[1],a[2],a[3],a[4]));break;case"L":a=["C"].concat(A(b.x,b.y,a[1],a[2]));break;case"H":a=["C"].concat(A(b.x,b.y,a[1],b.y));break;case"V":a=["C"].concat(A(b.x,b.y,b.x,a[1]));break;case"Z":a=["C"].concat(A(b.x,b.y,b.X,b.Y))}return a}),k=function(a,b){if(a[b].length>7){a[b].shift();for(var c=a[b];c.length;)m[b]="A",g&&(n[b]="A"),a.splice(b++,0,["C"].concat(c.splice(0,6)));a.splice(b,1),r=Q(e.length,g&&g.length||0)}},l=function(a,b,c,d,f){a&&b&&"M"==a[f][0]&&"M"!=b[f][0]&&(b.splice(f,0,["M",d.x,d.y]),c.bx=0,c.by=0,c.x=a[f][1],c.y=a[f][2],r=Q(e.length,g&&g.length||0))},m=[],n=[],o="",p="",q=0,r=Q(e.length,g&&g.length||0);r>q;q++){e[q]&&(o=e[q][0]),"C"!=o&&(m[q]=o,q&&(p=m[q-1])),e[q]=j(e[q],h,p),"A"!=m[q]&&"C"==o&&(m[q]="C"),k(e,q),g&&(g[q]&&(o=g[q][0]),"C"!=o&&(n[q]=o,q&&(p=n[q-1])),g[q]=j(g[q],i,p),"A"!=n[q]&&"C"==o&&(n[q]="C"),k(g,q)),l(e,g,h,i,q),l(g,e,i,h,q);var s=e[q],t=g&&g[q],u=s.length,v=g&&t.length;h.x=s[u-2],h.y=s[u-1],h.bx=M(s[u-4])||h.x,h.by=M(s[u-3])||h.y,i.bx=g&&(M(t[v-4])||i.x),i.by=g&&(M(t[v-3])||i.y),i.x=g&&t[v-2],i.y=g&&t[v-1]}return g||(d.curve=f(e)),g?[e,g]:e}function F(a,b){if(!b)return a;var c,d,e,f,g,h,i;for(a=E(a),e=0,g=a.length;g>e;e++)for(i=a[e],f=1,h=i.length;h>f;f+=2)c=b.x(i[f],i[f+1]),d=b.y(i[f],i[f+1]),i[f]=c,i[f+1]=d;return a}function G(a,b){for(var c=[],d=0,e=a.length;e-2*!b>d;d+=2){var f=[{x:+a[d-2],y:+a[d-1]},{x:+a[d],y:+a[d+1]},{x:+a[d+2],y:+a[d+3]},{x:+a[d+4],y:+a[d+5]}];b?d?e-4==d?f[3]={x:+a[0],y:+a[1]}:e-2==d&&(f[2]={x:+a[0],y:+a[1]},f[3]={x:+a[2],y:+a[3]}):f[0]={x:+a[e-2],y:+a[e-1]}:e-4==d?f[3]=f[2]:d||(f[0]={x:+a[d],y:+a[d+1]}),c.push(["C",(-f[0].x+6*f[1].x+f[2].x)/6,(-f[0].y+6*f[1].y+f[2].y)/6,(f[1].x+6*f[2].x-f[3].x)/6,(f[1].y+6*f[2].y-f[3].y)/6,f[2].x,f[2].y])}return c}var H=b.prototype,I=a.is,J=a._.clone,K="hasOwnProperty",L=/,?([a-z]),?/gi,M=parseFloat,N=Math,O=N.PI,P=N.min,Q=N.max,R=N.pow,S=N.abs,T=h(1),U=h(),V=h(0,1),W=a._unit2px,X={path:function(a){return a.attr("path")},circle:function(a){var b=W(a);return x(b.cx,b.cy,b.r)},ellipse:function(a){var b=W(a);return x(b.cx||0,b.cy||0,b.rx,b.ry)},rect:function(a){var b=W(a);return w(b.x||0,b.y||0,b.width,b.height,b.rx,b.ry)},image:function(a){var b=W(a);return w(b.x||0,b.y||0,b.width,b.height)},line:function(a){return"M"+[a.attr("x1")||0,a.attr("y1")||0,a.attr("x2"),a.attr("y2")]},polyline:function(a){return"M"+a.attr("points")},polygon:function(a){return"M"+a.attr("points")+"z"},deflt:function(a){var b=a.node.getBBox();return w(b.x,b.y,b.width,b.height)}};a.path=c,a.path.getTotalLength=T,a.path.getPointAtLength=U,a.path.getSubpath=function(a,b,c){if(this.getTotalLength(a)-c<1e-6)return V(a,b).end;var d=V(a,c,1);return b?V(d,b).end:d},H.getTotalLength=function(){return this.node.getTotalLength?this.node.getTotalLength():void 0},H.getPointAtLength=function(a){return U(this.attr("d"),a)},H.getSubpath=function(b,c){return a.path.getSubpath(this.attr("d"),b,c)},a._.box=d,a.path.findDotsAtSegment=i,a.path.bezierBBox=j,a.path.isPointInsideBBox=k,a.closest=function(b,c,e,f){for(var g=100,h=d(b-g/2,c-g/2,g,g),i=[],j=e[0].hasOwnProperty("x")?function(a){return{x:e[a].x,y:e[a].y}}:function(a){return{x:e[a],y:f[a]}},l=0;1e6>=g&&!l;){for(var m=0,n=e.length;n>m;m++){var o=j(m);if(k(h,o.x,o.y)){l++,i.push(o);break}}l||(g*=2,h=d(b-g/2,c-g/2,g,g))}if(1e6!=g){var p,q=1/0;for(m=0,n=i.length;n>m;m++){var r=a.len(b,c,i[m].x,i[m].y);q>r&&(q=r,i[m].len=r,p=i[m])}return p}},a.path.isBBoxIntersect=l,a.path.intersection=r,a.path.intersectionNumber=s,a.path.isPointInside=u,a.path.getBBox=v,a.path.get=X,a.path.toRelative=y,a.path.toAbsolute=z,a.path.toCubic=E,a.path.map=F,a.path.toString=e,a.path.clone=f}),d.plugin(function(a){var d=Math.max,e=Math.min,f=function(a){if(this.items=[],this.bindings={},this.length=0,this.type="set",a)for(var b=0,c=a.length;c>b;b++)a[b]&&(this[this.items.length]=this.items[this.items.length]=a[b],this.length++)},g=f.prototype;g.push=function(){for(var a,b,c=0,d=arguments.length;d>c;c++)a=arguments[c],a&&(b=this.items.length,this[b]=this.items[b]=a,this.length++);return this},g.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},g.forEach=function(a,b){for(var c=0,d=this.items.length;d>c;c++)if(a.call(b,this.items[c],c)===!1)return this;return this},g.animate=function(d,e,f,g){"function"!=typeof f||f.length||(g=f,f=c.linear),d instanceof a._.Animation&&(g=d.callback,f=d.easing,e=f.dur,d=d.attr);var h=arguments;if(a.is(d,"array")&&a.is(h[h.length-1],"array"))var i=!0;var j,k=function(){j?this.b=j:j=this.b},l=0,m=this,n=g&&function(){++l==m.length&&g.call(this)
    };return this.forEach(function(a,c){b.once("snap.animcreated."+a.id,k),i?h[c]&&a.animate.apply(a,h[c]):a.animate(d,e,f,n)})},g.remove=function(){for(;this.length;)this.pop().remove();return this},g.bind=function(a,b,c){var d={};if("function"==typeof b)this.bindings[a]=b;else{var e=c||a;this.bindings[a]=function(a){d[e]=a,b.attr(d)}}return this},g.attr=function(a){var b={};for(var c in a)this.bindings[c]?this.bindings[c](a[c]):b[c]=a[c];for(var d=0,e=this.items.length;e>d;d++)this.items[d].attr(b);return this},g.clear=function(){for(;this.length;)this.pop()},g.splice=function(a,b){a=0>a?d(this.length+a,0):a,b=d(0,e(this.length-a,b));var c,g=[],h=[],i=[];for(c=2;c<arguments.length;c++)i.push(arguments[c]);for(c=0;b>c;c++)h.push(this[a+c]);for(;c<this.length-a;c++)g.push(this[a+c]);var j=i.length;for(c=0;c<j+g.length;c++)this.items[a+c]=this[a+c]=j>c?i[c]:g[c-j];for(c=this.items.length=this.length-=b-j;this[c];)delete this[c++];return new f(h)},g.exclude=function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]==a)return this.splice(b,1),!0;return!1},g.insertAfter=function(a){for(var b=this.items.length;b--;)this.items[b].insertAfter(a);return this},g.getBBox=function(){for(var a=[],b=[],c=[],f=[],g=this.items.length;g--;)if(!this.items[g].removed){var h=this.items[g].getBBox();a.push(h.x),b.push(h.y),c.push(h.x+h.width),f.push(h.y+h.height)}return a=e.apply(0,a),b=e.apply(0,b),c=d.apply(0,c),f=d.apply(0,f),{x:a,y:b,x2:c,y2:f,width:c-a,height:f-b,cx:a+(c-a)/2,cy:b+(f-b)/2}},g.clone=function(a){a=new f;for(var b=0,c=this.items.length;c>b;b++)a.push(this.items[b].clone());return a},g.toString=function(){return"Snap‘s set"},g.type="set",a.Set=f,a.set=function(){var a=new f;return arguments.length&&a.push.apply(a,Array.prototype.slice.call(arguments,0)),a}}),d.plugin(function(a,c){function d(a){var b=a[0];switch(b.toLowerCase()){case"t":return[b,0,0];case"m":return[b,1,0,0,1,0,0];case"r":return 4==a.length?[b,0,a[2],a[3]]:[b,0];case"s":return 5==a.length?[b,1,1,a[3],a[4]]:3==a.length?[b,1,1]:[b,1]}}function e(b,c,e){c=p(c).replace(/\.{3}|\u2026/g,b),b=a.parseTransformString(b)||[],c=a.parseTransformString(c)||[];for(var f,g,h,i,l=Math.max(b.length,c.length),m=[],n=[],o=0;l>o;o++){if(h=b[o]||d(c[o]),i=c[o]||d(h),h[0]!=i[0]||"r"==h[0].toLowerCase()&&(h[2]!=i[2]||h[3]!=i[3])||"s"==h[0].toLowerCase()&&(h[3]!=i[3]||h[4]!=i[4])){b=a._.transform2matrix(b,e()),c=a._.transform2matrix(c,e()),m=[["m",b.a,b.b,b.c,b.d,b.e,b.f]],n=[["m",c.a,c.b,c.c,c.d,c.e,c.f]];break}for(m[o]=[],n[o]=[],f=0,g=Math.max(h.length,i.length);g>f;f++)f in h&&(m[o][f]=h[f]),f in i&&(n[o][f]=i[f])}return{from:k(m),to:k(n),f:j(m)}}function f(a){return a}function g(a){return function(b){return+b.toFixed(3)+a}}function h(a){return a.join(" ")}function i(b){return a.rgb(b[0],b[1],b[2])}function j(a){var b,c,d,e,f,g,h=0,i=[];for(b=0,c=a.length;c>b;b++){for(f="[",g=['"'+a[b][0]+'"'],d=1,e=a[b].length;e>d;d++)g[d]="val["+h++ +"]";f+=g+"]",i[b]=f}return Function("val","return Snap.path.toString.call(["+i+"])")}function k(a){for(var b=[],c=0,d=a.length;d>c;c++)for(var e=1,f=a[c].length;f>e;e++)b.push(a[c][e]);return b}function l(a){return isFinite(parseFloat(a))}function m(b,c){return a.is(b,"array")&&a.is(c,"array")?b.toString()==c.toString():!1}var n={},o=/[a-z]+$/i,p=String;n.stroke=n.fill="colour",c.prototype.equal=function(a,c){return b("snap.util.equal",this,a,c).firstDefined()},b.on("snap.util.equal",function(b,c){var d,q,r=p(this.attr(b)||""),s=this;if(l(r)&&l(c))return{from:parseFloat(r),to:parseFloat(c),f:f};if("colour"==n[b])return d=a.color(r),q=a.color(c),{from:[d.r,d.g,d.b,d.opacity],to:[q.r,q.g,q.b,q.opacity],f:i};if("viewBox"==b)return d=this.attr(b).vb.split(" ").map(Number),q=c.split(" ").map(Number),{from:d,to:q,f:h};if("transform"==b||"gradientTransform"==b||"patternTransform"==b)return c instanceof a.Matrix&&(c=c.toTransformString()),a._.rgTransform.test(c)||(c=a._.svgTransform2string(c)),e(r,c,function(){return s.getBBox(1)});if("d"==b||"path"==b)return d=a.path.toCubic(r,c),{from:k(d[0]),to:k(d[1]),f:j(d[0])};if("points"==b)return d=p(r).split(a._.separator),q=p(c).split(a._.separator),{from:d,to:q,f:function(a){return a}};var t=r.match(o),u=p(c).match(o);return t&&m(t,u)?{from:parseFloat(r),to:parseFloat(c),f:g(t)}:{from:this.asPX(b),to:this.asPX(b,c),f:f}})}),d.plugin(function(a,c,d,e){for(var f=c.prototype,g="hasOwnProperty",h=("createTouch"in e.doc),i=["click","dblclick","mousedown","mousemove","mouseout","mouseover","mouseup","touchstart","touchmove","touchend","touchcancel"],j={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},k=(function(a,b){var c="y"==a?"scrollTop":"scrollLeft",d=b&&b.node?b.node.ownerDocument:e.doc;return d[c in d.documentElement?"documentElement":"body"][c]}),l=function(){return this.originalEvent.preventDefault()},m=function(){return this.originalEvent.stopPropagation()},n=function(a,b,c,d){var e=h&&j[b]?j[b]:b,f=function(e){var f=k("y",d),i=k("x",d);if(h&&j[g](b))for(var n=0,o=e.targetTouches&&e.targetTouches.length;o>n;n++)if(e.targetTouches[n].target==a||a.contains(e.targetTouches[n].target)){var p=e;e=e.targetTouches[n],e.originalEvent=p,e.preventDefault=l,e.stopPropagation=m;break}var q=e.clientX+i,r=e.clientY+f;return c.call(d,e,q,r)};return b!==e&&a.addEventListener(b,f,!1),a.addEventListener(e,f,!1),function(){return b!==e&&a.removeEventListener(b,f,!1),a.removeEventListener(e,f,!1),!0}},o=[],p=function(a){for(var c,d=a.clientX,e=a.clientY,f=k("y"),g=k("x"),i=o.length;i--;){if(c=o[i],h){for(var j,l=a.touches&&a.touches.length;l--;)if(j=a.touches[l],j.identifier==c.el._drag.id||c.el.node.contains(j.target)){d=j.clientX,e=j.clientY,(a.originalEvent?a.originalEvent:a).preventDefault();break}}else a.preventDefault();{var m=c.el.node;m.nextSibling,m.parentNode,m.style.display}d+=g,e+=f,b("snap.drag.move."+c.el.id,c.move_scope||c.el,d-c.el._drag.x,e-c.el._drag.y,d,e,a)}},q=function(c){a.unmousemove(p).unmouseup(q);for(var d,e=o.length;e--;)d=o[e],d.el._drag={},b("snap.drag.end."+d.el.id,d.end_scope||d.start_scope||d.move_scope||d.el,c),b.off("snap.drag.*."+d.el.id);o=[]},r=i.length;r--;)!function(b){a[b]=f[b]=function(c,d){if(a.is(c,"function"))this.events=this.events||[],this.events.push({name:b,f:c,unbind:n(this.node||document,b,c,d||this)});else for(var e=0,f=this.events.length;f>e;e++)if(this.events[e].name==b)try{this.events[e].f.call(this)}catch(g){}return this},a["un"+b]=f["un"+b]=function(a){for(var c=this.events||[],d=c.length;d--;)if(c[d].name==b&&(c[d].f==a||!a))return c[d].unbind(),c.splice(d,1),!c.length&&delete this.events,this;return this}}(i[r]);f.hover=function(a,b,c,d){return this.mouseover(a,c).mouseout(b,d||c)},f.unhover=function(a,b){return this.unmouseover(a).unmouseout(b)};var s=[];f.drag=function(c,d,e,f,g,h){function i(i,j,l){(i.originalEvent||i).preventDefault(),k._drag.x=j,k._drag.y=l,k._drag.id=i.identifier,!o.length&&a.mousemove(p).mouseup(q),o.push({el:k,move_scope:f,start_scope:g,end_scope:h}),d&&b.on("snap.drag.start."+k.id,d),c&&b.on("snap.drag.move."+k.id,c),e&&b.on("snap.drag.end."+k.id,e),b("snap.drag.start."+k.id,g||f||k,j,l,i)}function j(a,c,d){b("snap.draginit."+k.id,k,a,c,d)}var k=this;if(!arguments.length){var l;return k.drag(function(a,b){this.attr({transform:l+(l?"T":"t")+[a,b]})},function(){l=this.transform().local})}return b.on("snap.draginit."+k.id,i),k._drag={},s.push({el:k,start:i,init:j}),k.mousedown(j),k},f.undrag=function(){for(var c=s.length;c--;)s[c].el==this&&(this.unmousedown(s[c].init),s.splice(c,1),b.unbind("snap.drag.*."+this.id),b.unbind("snap.draginit."+this.id));return!s.length&&a.unmousemove(p).unmouseup(q),this}}),d.plugin(function(a,c,d){var e=(c.prototype,d.prototype),f=/^\s*url\((.+)\)/,g=String,h=a._.$;a.filter={},e.filter=function(b){var d=this;"svg"!=d.type&&(d=d.paper);var e=a.parse(g(b)),f=a._.id(),i=(d.node.offsetWidth,d.node.offsetHeight,h("filter"));return h(i,{id:f,filterUnits:"userSpaceOnUse"}),i.appendChild(e.node),d.defs.appendChild(i),new c(i)},b.on("snap.util.getattr.filter",function(){b.stop();var c=h(this.node,"filter");if(c){var d=g(c).match(f);return d&&a.select(d[1])}}),b.on("snap.util.attr.filter",function(d){if(d instanceof c&&"filter"==d.type){b.stop();var e=d.node.id;e||(h(d.node,{id:d.id}),e=d.id),h(this.node,{filter:a.url(e)})}d&&"none"!=d||(b.stop(),this.node.removeAttribute("filter"))}),a.filter.blur=function(b,c){null==b&&(b=2);var d=null==c?b:[b,c];return a.format('<feGaussianBlur stdDeviation="{def}"/>',{def:d})},a.filter.blur.toString=function(){return this()},a.filter.shadow=function(b,c,d,e,f){return"string"==typeof d&&(e=d,f=e,d=4),"string"!=typeof e&&(f=e,e="#000"),e=e||"#000",null==d&&(d=4),null==f&&(f=1),null==b&&(b=0,c=2),null==c&&(c=b),e=a.color(e),a.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>',{color:e,dx:b,dy:c,blur:d,opacity:f})},a.filter.shadow.toString=function(){return this()},a.filter.grayscale=function(b){return null==b&&(b=1),a.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>',{a:.2126+.7874*(1-b),b:.7152-.7152*(1-b),c:.0722-.0722*(1-b),d:.2126-.2126*(1-b),e:.7152+.2848*(1-b),f:.0722-.0722*(1-b),g:.2126-.2126*(1-b),h:.0722+.9278*(1-b)})},a.filter.grayscale.toString=function(){return this()},a.filter.sepia=function(b){return null==b&&(b=1),a.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>',{a:.393+.607*(1-b),b:.769-.769*(1-b),c:.189-.189*(1-b),d:.349-.349*(1-b),e:.686+.314*(1-b),f:.168-.168*(1-b),g:.272-.272*(1-b),h:.534-.534*(1-b),i:.131+.869*(1-b)})},a.filter.sepia.toString=function(){return this()},a.filter.saturate=function(b){return null==b&&(b=1),a.format('<feColorMatrix type="saturate" values="{amount}"/>',{amount:1-b})},a.filter.saturate.toString=function(){return this()},a.filter.hueRotate=function(b){return b=b||0,a.format('<feColorMatrix type="hueRotate" values="{angle}"/>',{angle:b})},a.filter.hueRotate.toString=function(){return this()},a.filter.invert=function(b){return null==b&&(b=1),a.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>',{amount:b,amount2:1-b})},a.filter.invert.toString=function(){return this()},a.filter.brightness=function(b){return null==b&&(b=1),a.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>',{amount:b})},a.filter.brightness.toString=function(){return this()},a.filter.contrast=function(b){return null==b&&(b=1),a.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>',{amount:b,amount2:.5-b/2})},a.filter.contrast.toString=function(){return this()}}),d.plugin(function(a,b){var c=a._.box,d=a.is,e=/^[^a-z]*([tbmlrc])/i,f=function(){return"T"+this.dx+","+this.dy};b.prototype.getAlign=function(a,b){null==b&&d(a,"string")&&(b=a,a=null),a=a||this.paper;var g=a.getBBox?a.getBBox():c(a),h=this.getBBox(),i={};switch(b=b&&b.match(e),b=b?b[1].toLowerCase():"c"){case"t":i.dx=0,i.dy=g.y-h.y;break;case"b":i.dx=0,i.dy=g.y2-h.y2;break;case"m":i.dx=0,i.dy=g.cy-h.cy;break;case"l":i.dx=g.x-h.x,i.dy=0;break;case"r":i.dx=g.x2-h.x2,i.dy=0;break;default:i.dx=g.cx-h.cx,i.dy=0}return i.toString=f,i},b.prototype.align=function(a,b){return this.transform("..."+this.getAlign(a,b))}}),d});
// The MIT License (MIT)

// Typed.js | Copyright (c) 2014 Matt Boldt | www.mattboldt.com

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

!function ($) {

    "use strict";

    var Typed = function (el, options) {

        // chosen element to manipulate text
        this.el = $(el);

        // options
        this.options = $.extend({}, $.fn.typed.defaults, options);

        // attribute to type into
        this.isInput = this.el.is('input');
        this.attr = this.options.attr;

        // show cursor
        this.showCursor = this.isInput ? false : this.options.showCursor;

        // text content of element
        this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text()

        // html or plain text
        this.contentType = this.options.contentType;

        // typing speed
        this.typeSpeed = this.options.typeSpeed;

        // add a delay before typing starts
        this.startDelay = this.options.startDelay;

        // backspacing speed
        this.backSpeed = this.options.backSpeed;

        // amount of time to wait before backspacing
        this.backDelay = this.options.backDelay;

        // div containing strings
        this.stringsElement = this.options.stringsElement;

        // input strings of text
        this.strings = this.options.strings;

        // character number position of current string
        this.strPos = 0;

        // current array position
        this.arrayPos = 0;

        // number to stop backspacing on.
        // default 0, can change depending on how many chars
        // you want to remove at the time
        this.stopNum = 0;

        // Looping logic
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 0;

        // for stopping
        this.stop = false;

        // custom cursor
        this.cursorChar = this.options.cursorChar;

        // shuffle the strings
        this.shuffle = this.options.shuffle;
        // the order of strings
        this.sequence = [];

        // All systems go!
        this.build();
    };

    Typed.prototype = {

        constructor: Typed

        ,
        init: function () {
            // begin the loop w/ first current string (global self.strings)
            // current string will be passed as an argument each time after this
            var self = this;
            self.timeout = setTimeout(function () {
                for (var i = 0; i < self.strings.length; ++i) self.sequence[ i ] = i;

                // shuffle the array if true
                if (self.shuffle) self.sequence = self.shuffleArray(self.sequence);

                // Start typing
                self.typewrite(self.strings[ self.sequence[ self.arrayPos ] ], self.strPos);
            }, self.startDelay);
        }

        ,
        build: function () {
            var self = this;
            // Insert cursor
            if (this.showCursor === true) {
                this.cursor = $("<span class=\"typed-cursor\">" + this.cursorChar + "</span>");
                this.el.after(this.cursor);
            }
            if (this.stringsElement) {
                self.strings = [];
                this.stringsElement.hide();
                var strings = this.stringsElement.find('p');
                $.each(strings, function (key, value) {
                    self.strings.push($(value).html());
                });
            }
            this.init();
        }

        // pass current string state to each function, types 1 char per call
        ,
        typewrite: function (curString, curStrPos) {
            // exit when stopped
            if (this.stop === true) {
                return;
            }

            // varying values for setTimeout during typing
            // can't be global since number changes each time loop is executed
            var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
            var self = this;

            // ------------- optional ------------- //
            // backpaces a certain string faster
            // ------------------------------------ //
            // if (self.arrayPos == 1){
            //  self.backDelay = 50;
            // }
            // else{ self.backDelay = 500; }

            // contain typing function in a timeout humanize'd delay
            self.timeout = setTimeout(function () {
                // check for an escape character before a pause value
                // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
                // single ^ are removed from string
                var charPause = 0;
                var substr = curString.substr(curStrPos);
                if (substr.charAt(0) === '^') {
                    var skip = 1; // skip atleast 1
                    if (/^\^\d+/.test(substr)) {
                        substr = /\d+/.exec(substr)[ 0 ];
                        skip += substr.length;
                        charPause = parseInt(substr);
                    }

                    // strip out the escape character and pause value so they're not printed
                    curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
                }

                if (self.contentType === 'html') {
                    // skip over html tags while typing
                    var curChar = curString.substr(curStrPos).charAt(0)
                    if (curChar === '<' || curChar === '&') {
                        var tag = '';
                        var endTag = '';
                        if (curChar === '<') {
                            endTag = '>'
                        } else {
                            endTag = ';'
                        }
                        while (curString.substr(curStrPos).charAt(0) !== endTag) {
                            tag += curString.substr(curStrPos).charAt(0);
                            curStrPos++;
                        }
                        curStrPos++;
                        tag += endTag;
                    }
                }

                // timeout for any pause after a character
                self.timeout = setTimeout(function () {
                    if (curStrPos === curString.length) {
                        // fires callback function
                        self.options.onStringTyped(self.arrayPos);

                        // is this the final string
                        if (self.arrayPos === self.strings.length - 1) {
                            // animation that occurs on the last typed string
                            self.options.callback();

                            self.curLoop++;

                            // quit if we wont loop back
                            if (self.loop === false || self.curLoop === self.loopCount)
                                return;
                        }

                        self.timeout = setTimeout(function () {
                            self.backspace(curString, curStrPos);
                        }, self.backDelay);
                    } else {

                        /* call before functions if applicable */
                        if (curStrPos === 0)
                            self.options.preStringTyped(self.arrayPos);

                        // start typing each new char into existing string
                        // curString: arg, self.el.html: original text inside element
                        var nextString = curString.substr(0, curStrPos + 1);
                        if (self.attr) {
                            self.el.attr(self.attr, nextString);
                        } else {
                            if (self.isInput) {
                                self.el.val(nextString);
                            } else if (self.contentType === 'html') {
                                self.el.html(nextString);
                            } else {
                                self.el.text(nextString);
                            }
                        }

                        // add characters one by one
                        curStrPos++;
                        // loop the function
                        self.typewrite(curString, curStrPos);
                    }
                    // end of character pause
                }, charPause);

                // humanized value for typing
            }, humanize);

        }

        ,
        backspace: function (curString, curStrPos) {
            // exit when stopped
            if (this.stop === true) {
                return;
            }

            // varying values for setTimeout during typing
            // can't be global since number changes each time loop is executed
            var humanize = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
            var self = this;

            self.timeout = setTimeout(function () {

                // ----- this part is optional ----- //
                // check string array position
                // on the first string, only delete one word
                // the stopNum actually represents the amount of chars to
                // keep in the current string. In my case it's 14.
                // if (self.arrayPos == 1){
                //  self.stopNum = 14;
                // }
                //every other time, delete the whole typed string
                // else{
                //  self.stopNum = 0;
                // }

                if (self.contentType === 'html') {
                    // skip over html tags while backspacing
                    if (curString.substr(curStrPos).charAt(0) === '>') {
                        var tag = '';
                        while (curString.substr(curStrPos).charAt(0) !== '<') {
                            tag -= curString.substr(curStrPos).charAt(0);
                            curStrPos--;
                        }
                        curStrPos--;
                        tag += '<';
                    }
                }

                // ----- continue important stuff ----- //
                // replace text with base text + typed characters
                var nextString = curString.substr(0, curStrPos);
                if (self.attr) {
                    self.el.attr(self.attr, nextString);
                } else {
                    if (self.isInput) {
                        self.el.val(nextString);
                    } else if (self.contentType === 'html') {
                        self.el.html(nextString);
                    } else {
                        self.el.text(nextString);
                    }
                }

                // if the number (id of character in current string) is
                // less than the stop number, keep going
                if (curStrPos > self.stopNum) {
                    // subtract characters one by one
                    curStrPos--;
                    // loop the function
                    self.backspace(curString, curStrPos);
                }
                // if the stop number has been reached, increase
                // array position to next string
                else if (curStrPos <= self.stopNum) {
                    self.arrayPos++;

                    if (self.arrayPos === self.strings.length) {
                        self.arrayPos = 0;

                        // Shuffle sequence again
                        if (self.shuffle) self.sequence = self.shuffleArray(self.sequence);

                        self.init();
                    } else
                        self.typewrite(self.strings[ self.sequence[ self.arrayPos ] ], curStrPos);
                }

                // humanized value for typing
            }, humanize);

        }
        /**
         * Shuffles the numbers in the given array.
         * @param {Array} array
         * @returns {Array}
         */
        , shuffleArray: function (array) {
            var tmp, current, top = array.length;
            if (top) while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[ current ];
                array[ current ] = array[ top ];
                array[ top ] = tmp;
            }
            return array;
        }

        // Start & Stop currently not working

        // , stop: function() {
        //     var self = this;

        //     self.stop = true;
        //     clearInterval(self.timeout);
        // }

        // , start: function() {
        //     var self = this;
        //     if(self.stop === false)
        //        return;

        //     this.stop = false;
        //     this.init();
        // }

        // Reset and rebuild the element
        ,
        reset: function () {
            var self = this;
            clearInterval(self.timeout);
            var id = this.el.attr('id');
            this.el.after('<span id="' + id + '"/>')
            this.el.remove();
            if (typeof this.cursor !== 'undefined') {
                this.cursor.remove();
            }
            // Send the callback
            self.options.resetCallback();
        }

    };

    $.fn.typed = function (option) {
        return this.each(function () {
            var $this = $(this),
              data = $this.data('typed'),
              options = typeof option == 'object' && option;
            if (!data) $this.data('typed', (data = new Typed(this, options)));
            if (typeof option == 'string') data[ option ]();
        });
    };

    $.fn.typed.defaults = {
        strings: [ "These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!" ],
        stringsElement: null,
        // typing speed
        typeSpeed: 0,
        // time before typing starts
        startDelay: 0,
        // backspacing speed
        backSpeed: 0,
        // shuffle the strings
        shuffle: false,
        // time before backspacing
        backDelay: 500,
        // loop
        loop: false,
        // false = infinite
        loopCount: false,
        // show cursor
        showCursor: true,
        // character for cursor
        cursorChar: "|",
        // attribute to type (null == text)
        attr: null,
        // either html or text
        contentType: 'html',
        // call when done callback function
        callback: function () {},
        // starting callback function before each string
        preStringTyped: function () {},
        //callback for every typed string
        onStringTyped: function () {},
        // callback for reset
        resetCallback: function () {}
    };

}(window.jQuery);

$(document).on('click', '[data-video]', function (e) {

    e.preventDefault();

    var element = $(this);

    if ($('#modal-ageGate').length) {
        $('#modal-ageGate').modal('show');

        $('.btn-age-check').on('click', function () {

            var ageData = {
                day: $('#age-day').val(),
                month: $('#age-month').val(),
                year: $('#age-year').val()
            };

            $('#modal-ageGate').modal('hide');

            if (checkAge(ageData)) {
                insertVideo(element);

                setTimeout(function () {
                    $('#modal-ageGate-forbidden').remove();
                }, 500)
            }
            else {
                $('#modal-ageGate-forbidden').modal('show');
            }

            setTimeout(function () {
                $('#modal-ageGate').remove();
            }, 500)

        });
    }
    else {

        if ($('#modal-ageGate-forbidden').length) {
            $('#modal-ageGate-forbidden').modal('show');
        }
        else {
            insertVideo(element);

        }
    }
});

function insertVideo (element) {

    var container = element;
    var video = '<iframe frameborder="0" height="100%" src="//www.youtube.com/embed/' + element.data('video') + '?autoplay=1&amp;enablejsapi=1&amp;autohide=1&amp;showinfo=0&amp;rel=0&amp;" width="100%" allowfullscreen frameborder="0"></iframe>';

    if (element.data('external')) {
        video += '<a href="' + element.attr('href') + '" target="_blank" class="btn btn-black btn-lg" style="position: absolute;right: 15px;top: 15px;"><span class="glyphicon glyphicon-new-window"></span> WATCH ON YOUTUBE</a>';
    }

    if (element.data('container') != undefined) {
        container = $(element.data('container'));
    }

    if (element.data('removeitem') != undefined) {
        $(element.data('removeitem')).remove();
    }

    if (element.data('replacecontent') != undefined) {
        container.html(video);
    }
    else {
        container.append(video);
    }

    if (element.data('removeitem') != undefined) {
        container = $(element.data('container')).find(element.data('removeitem')).remove();
    }
}

function checkAge (ageData) {

    var today = new Date();
    var nowyear = today.getFullYear();
    var nowmonth = today.getMonth();
    var nowday = today.getDate();

    var birthyear = parseInt(ageData.year);
    var birthmonth = parseInt(ageData.month);
    var birthday = parseInt(ageData.day);

    var age = nowyear - birthyear;
    var age_month = nowmonth - birthmonth;
    var age_day = nowday - birthday;

    if (age_month < 0 || (age_month == 0 && age_day < 0)) {
        age = parseInt(age) - 1;
    }

    if (age < 18) {

        $.cookie('arma3_age_gate', '-1', { expires: 365, path: '/', secure: false });

        return false;
    }
    else {

        $.cookie('arma3_age_gate', '1', { expires: 365, path: '/', secure: false });

        return true;
    }

}