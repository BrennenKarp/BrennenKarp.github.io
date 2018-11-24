function callAnimation(data){

  var counter = 0;

  !function() {
    function t() {
      s.progress(this.x / this.maxX)
    }

    function e() {
      if(document.querySelector(".scrubber")._gsTransform.x < 2 * a + 20){
        TweenMax.to(".scrubber", .45, { x: "+=" + a, onUpdate: r, onComplete: r })
        if(Ad.globalIndex < Feed.data.length -1){
          Ad.globalIndex++;
        }
      }
    }

    function o() {
      if(document.querySelector(".scrubber")._gsTransform.x > a - 10){
        TweenMax.to(".scrubber", .45, { x: "-=" + a, onUpdate: r, onComplete: r })
        if(Ad.globalIndex > 0){
          Ad.globalIndex--;
        }
      }
    }

    function r() {
      var t = Draggable.get(".scrubber");
      t.update(true), 
      s.progress(t.x / t.maxX)
    }

    // stop wiggle animation
    function stopWiggle() {
      if(u){
        u = false, 
        TweenMax.killDelayedCallsTo(i)
      }
    }

    // wiggle animation
    function i() {
      if(u){
        counter++;
        if(counter <= 2){
          TweenMax.to(".scrubber", .4, { delay: 2, x: 16, onComplete: function() {
            TweenMax.to(".scrubber", .9, { x: 0, ease: Elastic.easeOut })
          }})
        } else {
          stopWiggle();
        }
      }
    }

    // show ad
    TweenMax.to('.stage', 0.5, {autoAlpha : 1});
    TweenMax.set(".slash", { transformOrigin: "50% 50%", rotation: -15 });

    // scrubber positioning
    var a = 69;
    var snapArea = [];
    switch(data.length){
      case 2: a = 207; break;
      case 3: a = 103.3; break;
      case 4: a = 69; break;
    }

    // create drag on scrubber
    Draggable.create(".scrubber", {
      type: "x",
      edgeResistance: 1,
      throwProps: true,
      bounds: { left: 27,  width: 248 },
      throwResistance: 900,
      snap: {
        x: function(endValue) { return Math.round(endValue / a) * a} 
      },
      onDrag: t,
      onThrowUpdate: t,
      onDragEnd: function(){
        Ad.globalIndex = Number(this.endX / a)
      }
    });

    // initial product animation
    var s = new TimelineMax;
    s.add("product1", 0)
     .to("#productImageContainer .product-wrapper1", .5, { autoAlpha: 0, x: -30 }, "product1+=.4")
     .to("#productTextContainer .producttext-1 .product, .cta1", .5, { autoAlpha: 0, x: -30 }, "product1+=.4")
     .to("#productTextContainer .producttext-1 .description", .5, { autoAlpha: 0, x: -30 }, "product1+=.35")
     .to("#productTextContainer .producttext-1 .priceslash, .producttext-1 .slash", .45, { autoAlpha: 0, x: -30 }, "product1+=.4")
     .to("#productTextContainer .producttext-1 .from", .5, { autoAlpha: 0, y: 20 }, "product1+=.6")
     .to("#productTextContainer .producttext-1 .price", .5, { autoAlpha: 0, y: 20 }, "product1+=.6")
     .to("#productTextContainer .producttext-1 .sku", .5, { autoAlpha: 0, y: 20 }, "product1+=.6")
     .to("#productTextContainer .producttext-1", .5, { autoAlpha: 0, y: 20 }, "product1+=.6")
     .to("#badges .productbadge-1", .5, { autoAlpha: 0, y: 20 }, "product1+=.6")

     .add("product2", 1.2)
     .from("#badges .productbadge-2", .5, { autoAlpha: 0, y: 20 }, "product2-=.45")
     .from("#productTextContainer .producttext-2", .5, { autoAlpha: 0, y: 20 }, "product2-=.45")
     .from("#productTextContainer .producttext-2 .sku", .5, { autoAlpha: 0, y: 20 }, "product2-=.45")
     .from("#productTextContainer .producttext-2 .price", .5, { autoAlpha: 0, y: 20 }, "product2-=.45")
     .from("#productTextContainer .producttext-2 .from", .5, { autoAlpha: 0, y: 20 }, "product2-=.45")
     .from("#productTextContainer .producttext-2 .priceslash, .producttext-2 .slash", .5, { autoAlpha: 0, x: 30  }, "product2-=.4")
     .from("#productTextContainer .producttext-2 .product, .cta2", .5, { autoAlpha: 0, x: 30 }, "product2-=.45")
     .from("#productTextContainer .producttext-2 .description", .5, { autoAlpha: 0, x: 30 }, "product2-=.4")
     .from("#productImageContainer .product-wrapper2", .5, { autoAlpha: 0, x: 30 }, "product2-=.4");

     if(data.length >= 3){
       s.to("#productImageContainer .product-wrapper2", .5, { autoAlpha: 0, x: -30 }, "product2+=.4")
       .to("#productTextContainer .producttext-2 .product, .cta2", .5, { autoAlpha: 0, x: -30 }, "product2+=.4")
       .to("#productTextContainer .producttext-2 .description", .5, { autoAlpha: 0, x: -30 }, "product2+=.35")
       .to("#productTextContainer .producttext-2 .priceslash, .producttext-2 .slash", .45, { autoAlpha: 0, x: -30 }, "product2+=.4")
       .to("#productTextContainer .producttext-2 .from", .5, { autoAlpha: 0, y: 20 }, "product2+=.45")
       .to("#productTextContainer .producttext-2 .price", .5, { autoAlpha: 0, y: 20 }, "product2+=.45")
       .to("#productTextContainer .producttext-2 .sku", .5, { autoAlpha: 0, y: 20 }, "product2+=.45")
       .to("#productTextContainer .producttext-2", .5, { autoAlpha: 0, y: 20 }, "product2+=.45")
       .to("#badges .productbadge-2", .5, { autoAlpha: 0, y: 20 }, "product2+=.45")

       .add("product3", 2.4)
       .from("#badges .productbadge-3", .5, { autoAlpha: 0, y: 20 }, "product3-=.45")
       .from("#productTextContainer .producttext-3", .5, { autoAlpha: 0, y: 20 }, "product3-=.45")
       .from("#productTextContainer .producttext-3 .sku", .5, { autoAlpha: 0, y: 20 }, "product3-=.45")
       .from("#productTextContainer .producttext-3 .price", .5, { autoAlpha: 0, y: 20 }, "product3-=.45")
       .from("#productTextContainer .producttext-3 .from", .5, { autoAlpha: 0, y: 20 }, "product3-=.45")
       .from("#productTextContainer .producttext-3 .priceslash, .producttext-3 .slash", .45, { autoAlpha: 0, x: 30 }, "product3-=.4")
       .from("#productTextContainer .producttext-3 .product, .cta3", .5, { autoAlpha: 0, x: 30 }, "product3-=.45")
       .from("#productTextContainer .producttext-3 .description", .5, { autoAlpha: 0, x: 30 }, "product3-=.4")
       .from("#productImageContainer .product-wrapper3", .5, { autoAlpha: 0, x: 30 }, "product3-=.4");

       if(data.length === 4){
        s.to("#productImageContainer .product-wrapper3", .5, { autoAlpha: 0, x: -30 }, "product3+=.4")
         .to("#productTextContainer .producttext-3 .product, .cta3", .5, { autoAlpha: 0, x: -30 }, "product3+=.4")
         .to("#productTextContainer .producttext-3 .description", .5, { autoAlpha: 0, x: -30 }, "product3+=.35")
         .to("#productTextContainer .producttext-3 .priceslash, .producttext-3 .slash", .25, { autoAlpha: 0, x: -30 }, "product3+=.4")
         .to("#productTextContainer .producttext-3 .from", .5, { autoAlpha: 0, y: 20 }, "product3+=.45")
         .to("#productTextContainer .producttext-3 .price", .5, { autoAlpha: 0, y: 20 }, "product3+=.45")
         .to("#productTextContainer .producttext-3 .sku", .5, { autoAlpha: 0, y: 20 }, "product3+=.45")
         .to("#productTextContainer .producttext-3", .5, { autoAlpha: 0, y: 20 }, "product3+=.45")
         .to("#badges .productbadge-3", .5, { autoAlpha: 0, y: 20 }, "product3+=.45")

         .add("product4", 3.6)
         .from("#badges .productbadge-4", .5, { autoAlpha: 0, y: 20 }, "product4-=.45")
         .from("#productTextContainer .producttext-4", .5, { autoAlpha: 0, y: 20 }, "product4-=.45")
         .from("#productTextContainer .producttext-4 .sku", .5, { autoAlpha: 0, y: 20 }, "product4-=.45")
         .from("#productTextContainer .producttext-4 .price", .5, { autoAlpha: 0, y: 20 }, "product4-=.45")
         .from("#productTextContainer .producttext-4 .from", .5, { autoAlpha: 0, y: 20 }, "product4-=.45")
         .from("#productTextContainer .producttext-4 .priceslash, .producttext-4 .slash", .5, { autoAlpha: 0, x: 30 }, "product4-=.4")
         .from("#productTextContainer .producttext-4 .product, .cta4", .5, { autoAlpha: 0, x: 30 }, "product4-=.4")
         .from("#productTextContainer .producttext-4 .description", .5, { autoAlpha: 0, x: 30  }, "product4-=.35")
         .from("#productImageContainer .product-wrapper4", .5, { autoAlpha: 0, x: 30 }, "product4-=.4")
       }
     }

     s.seek(0)
      .stop();

    var l = {
      touches: {
        touchstart: { x: -1, y: -1 },
        touchmove: { x: -1, y: -1 },
        touchend: false,
        direction: "undetermined"
      },

      touchHandler: function(t) {
        var r;
        if ("undefined" != typeof t && (t.preventDefault(), "undefined" != typeof t.touches)){
          switch (r = t.touches[0], t.type) {
            case "touchstart":
            case "touchmove":
              l.touches[t.type].x = r.pageX, 
              l.touches[t.type].y = r.pageY;
            break;
            case "touchend":
              l.touches[t.type] = true, 
              l.touches.touchstart.x > -1 && l.touches.touchmove.x > -1 && (l.touches.direction = l.touches.touchstart.x < l.touches.touchmove.x ? "right" : "left", "right" == l.touches.direction ? o() : e(), 
              console.log(l.touches.direction))
          }
        }
      },

      init: function() {
        document.querySelector(".product-swipe ").addEventListener("touchstart", l.touchHandler, false), 
        document.querySelector(".product-swipe ").addEventListener("touchmove", l.touchHandler, false), 
        document.querySelector(".product-swipe ").addEventListener("touchend", l.touchHandler, false)
      }
    };

    // arrow handlers
    document.querySelector(".right-arrow").addEventListener("click", e, false), 
    document.querySelector(".left-arrow").addEventListener("click", o, false), 
    l.init();

    // initial scrubber animation
    var initialTiming = parseFloat(data.length+1);
    TweenMax.from(".scrubber", initialTiming, { x: 270, ease: Power0.easeNone, onUpdate: r, onComplete: r });

    // wiggle button
    var u = true;
    document.querySelector(".banner").addEventListener("touchstart", stopWiggle), 
    document.querySelector(".banner").addEventListener("mousemove", stopWiggle);
    for (var p = 1; 100 > p; p++){
      TweenMax.delayedCall(4 * p, i)
    }

  }();

};