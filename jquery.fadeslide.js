/*
* fadeslide
* By: James Player, http://springload.co.nz
* Version: 1.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

(function($) {
   
    var methods = {
        init : function(options){
            
            // Create some defaults, extending them with any options that were provided
            var settings = $.extend( {
                selectedSlide     : 1,
                containerClass    : 'fs_container',
                slideClass        : 'fs_slide',
                nextClass         : 'fs_next',
                prevClass         : 'fs_prev',
                slideSpeed        : 1000,
                slideEasing       : 'linear',
                autoSlide         : true,
                slideInterval     : 5000
            }, options);
                 
            return this.each(function() {
                
                var $this = $(this);
                var data = $this.data('fadeslide');
                
                // If the plugin hasn't been initialized yet
                
                // properties
                if (!data){
                    $this.data('fadeslide', {});   
                    var data = $this.data('fadeslide'); 
                    
                    data.container = $(this).find('.' + settings.containerClass);
                    data.slides = $this.find('.' + settings.slideClass);
                    data.next = $('.' + settings.nextClass);
                    data.prev = $('.' + settings.prevClass);
                    data.selectedSlide = settings.selectedSlide;
                    data.total_items = data.slides.length + 4;
                    
                    // some css
                    $this.css({'position':'relative', 'overflow':'hidden'});
                    data.slides.css({'float':'left','opacity':'0.5'});
                    
                    data.slide_width = data.slides.outerWidth();
                    data.container_width = data.slide_width * data.total_items;
                    data.locked = false;
                    data.slideSpeed = settings.slideSpeed;
                    data.slideEasing = settings.slideEasing;
                    data.autoSlide = settings.autoSlide;
                    data.slideInterval = settings.slideInterval;
                    
                    // clone last 2 and first 2
                    data.slides.eq(0).clone().appendTo(data.container);
                    data.slides.eq(1).clone().appendTo(data.container);
                    data.slides.eq(data.slides.length - 1).clone().prependTo(data.container);
                    data.slides.eq(data.slides.length - 2).clone().prependTo(data.container);
                    
                    // reset data.slides after cloning
                    data.slides = $(this).find('.' + settings.slideClass);
                    
                    // some more css
                    data.container.css({'position':'absolute','left':'50%', 'top':'0', 'width': (data.container_width) + 'px'});
                    data.slides.eq(data.selectedSlide + 1).css({'opacity':'1'});
                    

                    $this.fadeslide('reset');
                    $this.fadeslide('clickInit');
                    
                    // auto slide?
                    if (data.autoSlide) {
                        function autoSlide() {
                            data.timer = setTimeout(function(){
                                $this.fadeslide('slide','next');
                                autoSlide();
                            }, data.slideInterval);
                        }
                        
                        autoSlide();
                        
                        data.container.hover(function(){
                            clearTimeout(data.timer);
                        });
                        
                        data.next.add(data.prev).click(function(){
                            clearTimeout(data.timer);
                        });
                        
                    }
                    
                    
                    //
                    // event handlers
                    //       
                    data.next.add(data.prev).click(function(){
                        var direction = $(this).hasClass(settings.prevClass) ? 'prev' : 'next';
                        $this.fadeslide('slide', direction);
                        
                        return false;
                    });            
                }
                
            });
        },
     
        //
        // Utilities
        //
        
        reset : function() {
            return this.each(function() {
                var data = $(this).data('fadeslide');                
                data.container.css({marginLeft:'-' + ((data.selectedSlide + 1) * data.slide_width) - (data.slide_width/2) + 'px'});
            });
        },
        
        slide : function(direction) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data('fadeslide');
                
                // don't do anything if it's locked
                if (data.locked) {
                    return;
                }
                
                // lock it
                data.locked = true;
                
                var reset_prev = false;
                var reset_next = false;          
                
                // which direction?
                switch(direction) {
                    case 'prev':
                        data.selectedSlide -= 1;           
                        if (data.selectedSlide < 1) {
                            reset_prev = true;
                        }
                        break;
                    case 'next':
                        data.selectedSlide += 1;
                        if (data.selectedSlide == (data.slides.length - 3)) {
                            reset_next = true;
                        }
                        break;
                }
                        
                data.slides.animate({'opacity':'0.5'}, 500);
         
                data.container.animate({marginLeft:'-' + ((data.selectedSlide + 1) * data.slide_width) - (data.slide_width/2) + 'px'}, data.slideSpeed, data.slideEasing, function() {
                    if (reset_prev) {
                        data.selectedSlide = data.slides.length - 4;
                        $this.fadeslide('reset');
                    }
                    
                    if (reset_next) {
                        data.selectedSlide = 1;
                        $this.fadeslide('reset');
                    }      
                        
                    data.slides.eq(data.selectedSlide + 1).animate({'opacity':'1'}, '500', 'swing', function() {
                        data.locked = false;
                        $this.fadeslide('clickInit');
                    });
                                                   
                });
                
                
            });
        },
        
        clickInit : function(){
            return this.each(function() {
                var data = $(this).data('fadeslide');
                var $this = $(this);   
                
                data.slides.unbind('click');
                
                data.slides.eq(data.selectedSlide + 2).click(function(){
                    $this.fadeslide('slide','next');
                    return false;
                });
                
                data.slides.eq(data.selectedSlide).click(function(){
                    $this.fadeslide('slide','prev');
                    return false;
                });
                
            });
        }
            
    };
      
    $.fn.fadeslide = function(method) {
     
        // Method calling logic
        if ( methods[method] ) {
          return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
          return methods.init.apply( this, arguments );
        } else {
          $.error( 'Method ' +  method + ' does not exist on jQuery.fadeslide' );
        }    
   
    };
})(jQuery);