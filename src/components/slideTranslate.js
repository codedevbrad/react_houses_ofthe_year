
import { animateBoxesToCenter } from './animateBoxes';

export const attachTranslate = ( totalSlides , slidesShow , width ) => {

  let frame = document.querySelector('#move')  ,
    element = document.querySelector('#click') ,
      curr  = 0 ,
      slide = 0 ,
      end   = totalSlides - ( slidesShow - 1 ),
      isClicked = false ,
      wait;

  element.addEventListener('click' , ( ) => {
              curr  = curr + width;
              slide = slide + 1;
              const xTranslate = curr + 'px';

               if ( isClicked ) {
                  clearTimeout( wait );
               }
               wait = setTimeout( () => {
                  animateBoxesToCenter( frame.offsetHeight , true );
                  isClicked = false;
               } , 1000 );

              if ( slide >= end ) {
                frame.style.transform = "translateX(" + "-" + 0 +"px)";
                console.log('greater');
                curr = 0;
                slide = 0;
                isClicked = true;
              }
              else {
                frame.style.transform = "translateX(" + "-" + xTranslate +"px)";
                animateBoxesToCenter( frame.offsetHeight , false );
                isClicked = true;
              }
  });
}
