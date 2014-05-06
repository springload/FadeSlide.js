#fadeSlide.js

A jQuery carousel. Great for impressive looking home pages!

##Requirements
jQuery 1.*

##Usage example

###HTML
```html
<div class="slider">
    <a class="fs_next" href="#">Next</a> <!-- can be placed anywhere on page -->
    <a class="fs_prev" href="#">Prev</a> <!-- can be placed anywhere on page -->
    <div class="fs_container">
        <div class="fs_slide"><img src="/photo1.jpg" alt="rock!" /></div>
        <div class="fs_slide"><img src="/photo2.jpg" alt="rock!" /></div>
        <div class="fs_slide"><img src="/photo3.jpg" alt="rock!" /></div>
        <div class="fs_slide"><img src="/photo4.jpg" alt="rock!" /></div>
    </div>
</div>
```

###Javascript
```js
$(".slider").fadeslide({
    slideEasing : "easeInOutExpo" //requires jQuery Easing extension
});
```

###Some custom css
```css
/**** Slider height ****/
.slider {
    height: 192px;
}

/**** Previous and next buttons ****/
.fs_next, .fs_prev {
    background-color: #fff;
    position: absolute;
    bottom: 0;
    display: block;
    padding: 0 5px;
    height: 20px;
    line-height: 20px;
    z-index: 5;
}

.fs_next { right: 0; }
.fs_prev { left: 0; }
```

##Options

* **selectedSlide**: Int the slide to start on. Default 1
* **containerClass**: String the class name of the container element. Default 'fs_container'
* **slideClass**: String the class name of the slide elements. Default 'fs_slide'
* **nextClass**: String the class name of the 'next' button element. Default 'fs_next'
* **prevClass**: String the class name of the 'previous' button element. Default 'fs_prev'
* **slideSpeed**: Int how fast the transition between slides is in milliseconds. Default 1000
* **slideEasing**: String the name of the easing function to use for transitions. Default 'linear'
* **autoSlide**: Bool whether or not to slide automatically (will stop when container is hovered over). Default true
* **slideInterval**: Int only used when autoSlide is set to true. Time between slides. Default 5000
