/*
 * jQuery autoResize (textarea auto-resizer)
 * @copyright James Padolsey http://james.padolsey.com
 * @version 1.04
 */

window.onresize = function() {
    resize();
};

function resize() {
    if (screen.width < 640) {
        //mobile view
    } else {
        if (window.innerWidth < 1100 && document.getElementById("nav-bar").style.width == "80px") {
            document.getElementById("info-col").style.display = "none";
            document.getElementById("body-cont").style.width = "680px";
            document.getElementById("content-col").style.marginLeft = "80px";

            opts = document.getElementsByClassName("opt-text");
            for (var j=0; j<opts.length; j++) {
                opts[j].style.display = "none";
            }
            document.getElementById("nav-bar").style.width = "80px";
            document.getElementById("twyyt-but").style.display = "none";
            document.getElementById("profile-info").style.display = "none";






        } else if ((window.innerWidth < 1300 && document.getElementById("nav-bar").style.width != "80px") || (window.innerWidth < 1300 && document.getElementById("body-cont").style.width == "680px") || window.innerWidth < 1300) {
            document.getElementById("info-col").style.display = "block";
            document.getElementById("body-cont").style.width = "1080px";
            document.getElementById("content-col").style.marginLeft = "80px";

            opts = document.getElementsByClassName("opt-text");
            for (var j=0; j<opts.length; j++) {
                opts[j].style.display = "none";
            }
            
            document.getElementById("nav-bar").style.width = "80px";
            document.getElementById("twyyt-but").style.display = "none";
            document.getElementById("profile-info").style.display = "none";




        } else if (window.innerWidth > 1300) {
            document.getElementById("info-col").style.display = "block";
            document.getElementById("body-cont").style.width = "1280px";
            document.getElementById("content-col").style.marginLeft = "280px";

            opts = document.getElementsByClassName("opt-text");
            for (var j=0; j<opts.length; j++) {
                opts[j].style.display = "block";
            }
            document.getElementById("nav-bar").style.width = "280px";
            document.getElementById("twyyt-but").style.display = "block";
            document.getElementById("profile-info").style.display = "block";
        }
    }
    
    document.getElementById("nav-body").style.height = window.innerHeight + "px";
    document.getElementById("user-drop").style.display = "block";
    document.getElementById("profile-btn").style.display = "block";
}

(function($){
    
    $.fn.autoResize = function(options) {
        
        // Just some abstracted details,
        // to make plugin users happy:
        var settings = $.extend({
            onResize : function(){},
            animate : true,
            animateDuration : 150,
            animateCallback : function(){},
            extraSpace : 20,
            limit: 1000
        }, options);
        
        // Only textarea's auto-resize:
        this.filter('textarea').each(function(){
            
                // Get rid of scrollbars and disable WebKit resizing:
            var textarea = $(this).css({resize:'none','overflow-y':'hidden'}),
            
                // Cache original height, for use later:
                origHeight = textarea.height(),
                
                // Need clone of textarea, hidden off screen:
                clone = (function(){
                    
                    // Properties which may effect space taken up by chracters:
                    var props = ['height','width','lineHeight','textDecoration','letterSpacing'],
                        propOb = {};
                        
                    // Create object of styles to apply:
                    $.each(props, function(i, prop){
                        propOb[prop] = textarea.css(prop);
                    });
                    
                    // Clone the actual textarea removing unique properties
                    // and insert before original textarea:
                    return textarea.clone().removeAttr('id').removeAttr('name').css({
                        position: 'absolute',
                        top: 0,
                        left: -9999
                    }).css(propOb).attr('tabIndex','-1').insertBefore(textarea);
					
                })(),
                lastScrollTop = null,
                updateSize = function() {
					
                    // Prepare the clone:
                    clone.height(0).val($(this).val()).scrollTop(10000);
					
                    // Find the height of text:
                    var scrollTop = Math.max(clone.scrollTop(), origHeight) + settings.extraSpace,
                        toChange = $(this).add(clone);
						
                    // Don't do anything if scrollTip hasen't changed:
                    if (lastScrollTop === scrollTop) { return; }
                    lastScrollTop = scrollTop;
					
                    // Check for limit:
                    if ( scrollTop >= settings.limit ) {
                        $(this).css('overflow-y','');
                        return;
                    }
                    // Fire off callback:
                    settings.onResize.call(this);
					
                    // Either animate or directly apply height:
                    settings.animate && textarea.css('display') === 'block' ?
                        toChange.stop().animate({height:scrollTop}, settings.animateDuration, settings.animateCallback)
                        : toChange.height(scrollTop);
                };
            
            // Bind namespaced handlers to appropriate events:
            textarea
                .unbind('.dynSiz')
                .bind('keyup.dynSiz', updateSize)
                .bind('keydown.dynSiz', updateSize)
                .bind('change.dynSiz', updateSize);
            
        });
        
        // Chain:
        return this;
        
    };
    
    
    
})(jQuery);