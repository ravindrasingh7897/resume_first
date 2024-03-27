const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    // in el we select that element on which we have to add locomotive and our whole code is in main then we written main
    smooth: true
});

var timeout;

function firstPageAnim() {
    var tl = gsap.timeline();
  
    tl.from("#nav", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    })
      .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 1,
        delay: -1,
        stagger: 0.2,
      })
      .from("#herofooter", {
        y: "-10",
        opacity: 0,
        duration: 2,
        delay: -2.3,
        ease: Expo.easeInOut,
      });
  }

  function circlechapta(){
    // define deafault scale value(means the chaptapen of circle it is 1 means that circle is in its orignial state)
    var xscale= 1;
    var yscale =1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);
    
        xscale = gsap.utils.clamp(0.8, 1.4, dets.clientX - xprev);
        //clamp is a function in gsap to set min and max value
        yscale = gsap.utils.clamp(0.8, 1.4, dets.clientY - yprev);
    
        xprev = dets.clientX;
        yprev = dets.clientY;
    
        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector(
              "#minicircle"
            ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
          }, 100);
          //settimeout(function(){this fucntion will run every },100)100 ms later
        });

        //how is it working ? like cleartimeout is in mousemove fuction thats why when mouse is moving timeout is cleared but when mouse is 
        //not moving this last settimeout statement will start and scale will be 1

  }
// window means the browser screen
function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
  }
    

circlechapta();
circleMouseFollower();
firstPageAnim(); 


document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        // duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      //                         this ^ will return .top(from top) value of elem
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff ,
        left: dets.clientX ,
        rotate: gsap.utils.clamp(-20, 20, diffrot ),
      });
    });
});

