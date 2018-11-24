var _loadedImages=0;

_imageArray=new Array(
    "bg.jpg",
    "cta.png",
    "legal.png",
    "lens.png",
    "loading.gif",
    "logo.svg",
    "text1.png",
    "text2.png"
);

this.addEventListener('DOMContentLoaded', preloadImages);

function preloadImages() {
    for (var i = 0; i < _imageArray.length; i++) {
        var _tempImage = new Image();
        _tempImage.addEventListener('load', trackProgress);
        _tempImage.src = _imageArray[i];
    }
}

function trackProgress(){
    _loadedImages++;             
    if(_loadedImages == _imageArray.length) init();
}

function init(){ 
    var css = document.createElement( 'link' );
    css.setAttribute( 'rel', 'stylesheet' );
    css.setAttribute( 'type', 'text/css' );
    css.setAttribute( 'href', "style.css" );
    document.getElementsByTagName('head')[0].appendChild(css);

   initAnimations();
}

// global vars
var _tt = new TimelineMax(),
	delayTime = 3,
	fastTime = 0.4,
	midAnimTime = 0.55,
	longAnimTime = 2
;

function initAnimations(){
    _tt	
    	.to('#lens', 0.6, {opacity: 1, ease: Power1.easeInOut})
        .to('#logo', 0.6, {opacity: 1, ease: Power1.easeInOut}, "-=0.4")
        .to('#text1', 0.6, {opacity: 1, ease: Power1.easeInOut}, "-=0.4")
        .to('#cta', 0.6, {opacity: 1, ease: Power1.easeInOut}, "-=0.4")
        .to('#legal', 0.6, {opacity: 1, ease: Power1.easeInOut}, "-=0.4")
        .to('#text1', 0.6, {opacity: 0, ease: Power1.easeInOut}, '+=0.5')
        .to('#text2', 0.6, {opacity: 1, ease: Power1.easeInOut}, '-=0.2')
	;
}