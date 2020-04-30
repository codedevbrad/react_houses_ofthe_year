import React, { Fragment , useState , useEffect , useRef } from 'react';
import { useStore , useActions } from 'easy-peasy';
import { animateBoxesToCenter } from '../animateBoxes';

import ReactMovement from '@codedevbrad/react_movement';

const isEven = ( index ) =>  index % 2 === 0;

const InnerBox = ( { el , index , width , carouselLength  } ) => {

    const [ shouldAnimateIn , setAnimateIn ] = useState(false);
    const setComponentRender = useActions( actions => actions.setComponentRender );
    const setSingleRender = useActions( actions => actions.setSingleRender );
    const shouldHideInner = useStore( state => state.innerContentshouldHide );
    const animateInnerBoxContent = useActions( actions => actions.animateInnerBoxContent );
    const box_info = useRef( false );

    useEffect( ( ) => {
        var outer = document.querySelector('#frame') ,
           height = outer.offsetHeight;
           animateInnerBoxContent( true );

          setTimeout( ( ) => {
              setAnimateIn( true );
              animateBoxesToCenter( height , false );

              setTimeout( ( ) => {
                    animateBoxesToCenter( height , true );
                    animateInnerBoxContent( false );
              } , 1200 );
          },  800 );
    }, []);

    const individualBox = ( e ) => {
           let outer = document.querySelector('#frame') ,
                 box = document.querySelector('#el-'+(index - 1)).offsetLeft ,
              height = outer.offsetHeight;
              animateInnerBoxContent( true );
              animateBoxesToCenter( height , false );
              outer.scrollTo( { left : box , top : 0 , behavior: 'smooth' });

              var rect = box_info.current.getBoundingClientRect();
              setTimeout( ( ) => {
                 setSingleRender( {
                       index : index ,
                       width : box_info.current.offsetWidth ,
                      height : box_info.current.offsetHeight
                 });
                 setComponentRender( 2 );
              } , 1500 );
    }

    return (
      <div id={ 'el-'+index } className="box" style={{ width }}>
          { index == 0 &&
            <div className={ shouldAnimateIn ? "box_info_centered" : "box_info_centered_hidden" }>
                <section>
                  <h3> { el.title } </h3>
                  <p>  { el.info  } </p>
                </section>
            </div>
          }
          { !shouldHideInner && index != 0 && (index + 1 ) != carouselLength &&
            <div className="box_information" style={ isEven( index + 1 ) ? { bottom : 0 + 'px' } : { top : 0 + 'px' } }>
                <section>
                  <h2> <div> </div> { index } </h2>
                  <h3> { el.title } </h3>
                  <p>  { el.info  } </p>
                  <div className="explore_houseBtn"  onClick={ ( e ) => individualBox( e ) }>
                     <p> explore this home </p>
                     <ReactMovement distance={ 4 } tag={ 'div' } elClass={ 'line'} />
                  </div>
                </section>
            </div>
          }

          { index != 0 && (index + 1 ) != carouselLength &&
            <div ref={ box_info } className={ shouldAnimateIn ? 'inner_box' : 'animate_inner_box' }
                 style={ isEven(index + 1) ? { top : 20 + 'px' } : { bottom : 20 + 'px' }}>
                   <ReactMovement elClass={ "smooth_scroll" } distance={ 7 }>
                     <img src={ el.img } />
                   </ReactMovement>
            </div>
          }
      </div>
   )
}

export default InnerBox;
