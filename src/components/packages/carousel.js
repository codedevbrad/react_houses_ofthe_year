import React, { Fragment , useState , useEffect , useRef } from 'react';

import { slidingAnimation , slidingVertical } from '../slidingAnimate';
import { animateBoxesToCenter } from '../animateBoxes';

import { useStore , useActions } from 'easy-peasy';

import InnerBox from './innerBox.js';

const Carousel = ( { positionToStart , content } ) => {

  positionToStart = positionToStart || 0;

  const [elements , setEls ] = useState( content );
  const [width, setWidth   ] = useState( 0 );
  const [windowSize , setWindowSize ] = useState('');
  const [shouldRefresh , setRefresh ] = useState( 0 );
  const setCursorDrag = useActions( actions => actions.setCursorProps );
  const animateInnerBoxContent = useActions( actions => actions.animateInnerBoxContent );
  var doit;

  const animationSet = ( elToMove , moveTo , height ) => {
        // hide all images
        animateInnerBoxContent( true );
        animateBoxesToCenter( height , false );
        elToMove.scrollTo( { left : moveTo , top : 0 , behavior: 'smooth' });
        setTimeout( ( ) => {
          animateInnerBoxContent( false );
          animateBoxesToCenter( height , true );
        } , 2000 );
  }

  useEffect( () => {
        var outer  = document.querySelector('#frame') ,
           toMove  = document.querySelector('#move')  ,
       slidesShow  = 3 ,
       totalSlides = elements.length ,
       width       = outer.offsetWidth / slidesShow;
       setElementsIntoPosition( width , totalSlides , outer , () => {
          if ( positionToStart != 0 ) {
            setTimeout( ( ) => {
              let outer = document.querySelector('#frame') ,
                    box = document.querySelector('#el-' + positionToStart ).offsetLeft ,
                 height = outer.offsetHeight;
                 animationSet( outer , box , height );

            } , 200 );
          }
       });
    }, [ shouldRefresh ]);

    function resizedw(){
        setRefresh( shouldRefresh + 1 );
    }

    window.onresize = function() {
        clearTimeout(doit);
        doit = setTimeout(function() {
            resizedw();
        }, 100);
    };

    const setElementsIntoPosition = ( width , totalSlides , outer , next ) => {
      setWidth( width );
      setWindowSize( width * totalSlides + 'px' );
      slidingAnimation( outer , animateBoxesToCenter , setCursorDrag , animateInnerBoxContent );
      next();
    }

    return (
      <div id="frame">
          <div id="move" style={ { width : windowSize }}>
              { elements.map( ( element , index ) =>
                  <InnerBox key={ index } el={element } index={ index } width={ width } carouselLength={ elements.length } />
              )}
          </div>
      </div>
    )
}

export default Carousel;
