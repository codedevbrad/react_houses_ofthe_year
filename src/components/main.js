import React, { Fragment , useState , useEffect , useRef } from 'react';
import './styles.scss';
import { useStore , useActions } from 'easy-peasy';
import { slidingAnimation , slidingVertical } from './slidingAnimate';
import { animateBoxesToCenter } from './animateBoxes';

import { delay } from './_helpers/delay';


import Carousel from './packages/carousel';

const houses = [
  { img: '' , title: 'house of the year 2019' , info: 'explore the winners of house of the year 2019.' } ,
  { img: './houses/pic1.jpg' , title: 'a modern feel' , info: 'explore the feel of a modern house set in the busy streets of california.'} ,
  { img: './houses/pc2.jpg'  , title: 'rustic feel'   , info: 'see why container houses are the newest trend of 2019.' } ,
  { img: './houses/pic3.jpg' , title: 'green breeze'  , info: 'set in the welsh forest, the green breeze house has a stunning view all to itself.'} ,
  { img: './houses/pic4.jpg' , title: 'the black box' , info: 'the minimilist black box overlooks the dorset lake with stunning views.' } ,
  { img: './houses/pic5.jpg' , title: 'highland house', info: 'what may look like a red box, the highland house offers a warm, secluded experience.'  } ,
  { img: './houses/pic6.jpg' , title: 'rustic office' , info: 'this rustic building set in the busy city creates a unique modern work setting.' } ,
  { img: './houses/pic7.jpg' , title: 'the lonely cottage' , info: '' } ,
  { img: './houses/pic8.jpg' , title: 'riverback retreat'  , info: '' } ,
  { img: '' , title: ''  , info: '' }
];

const isEven = ( index ) =>  index % 2 === 0;


const SingleElement = ( ) => {
    const singleElementIndex = useStore( state => state.singleComponentRender );
    const [ house , setHouseComponet ] = useState( houses[ singleElementIndex.index ]);
    const { width , height } = singleElementIndex;
    const setCursorDrag = useActions( actions => actions.setCursorProps );
    const setComponentRender = useActions( actions => actions.setComponentRender );

    const setLoadingState = useActions( actions => actions.setLoadingState );

    const frame = useRef(null);

    useEffect( ( ) => {
          slidingVertical( frame.current , setCursorDrag );
    } , [ ] );

    const returnToCarousel = ( ) => {

          setComponentRender( 1 );
          setLoadingState( false );
    }

    return (
      <div id="single_element" ref={ frame }>
          <div onClick={ returnToCarousel }> back </div>
          <div id="carousel_image_single">
              <img src={ house.img } style={ {width : width + 'px' , height : height + 'px'} } />
          </div>
          <div>

          </div>
      </div>
    )
}

const Header = ( { animation } ) => {

    const navigateFlip = useStore(     state => state.shouldRenderMenu );
    const flipToMenu   = useActions( actions => actions.setMenuRender  );

    const setLoadingState = useActions( actions => actions.setLoadingState );

    const menuHandler = () => {
        console.log( 'clicked');
        setLoadingState( false );
        flipToMenu( !navigateFlip );
    }

   return (
     <header>
         <div id="menu" onClick={ () => menuHandler() }>
            <h3> { !navigateFlip ? 'menu' : 'x' } </h3>
            <div className="menu_btn">
               <div className="line"> </div>
               <i className="far fa-circle"> </i>
            </div>
         </div>
     </header>
   )
}

const NavMenu = ( ) => {

    return (
      <div id="page_nav">
          <section id="top_nav"> </section>
          <section id="bottom_nav">
              <nav>
                  <ul>
                      <li> Houses of the year . </li>
                      <li> our show . </li>
                      <li> future nominees . </li>
                  </ul>
               </nav>
              <div> </div>
          </section>
      </div>
    )
}

const CustomCursor = ( { obj } ) => {
    const followDiv = useRef(null);

    useEffect( ( ) => {
        document.addEventListener('mousemove', ( e ) => {

              let width  = followDiv.current.offsetWidth / 2;
              let height = followDiv.current.offsetHeight / 2;
              followDiv.current.style.left = e.pageX - width  + 'px';
              followDiv.current.style.top  = e.pageY - height + 'px';
        });
    }, []);

    return (
      <div ref={ followDiv } style={ { width : obj.size , height : obj.size }} id="follower">
         <div id="inner"> </div>
      </div>
    )
}

const Loading = ( { loadingComplete }) => {
    const loadHtml = useRef( null );

    const loadingEffect = async( ) => {

        await delay( 2500 );
        loadHtml.current.classList.add('loading_fadeOut');
        await delay( 1000 );
        loadingComplete();
    }

    useEffect( ( ) => {
        loadingEffect();
    }, [ ] );

    return (
        <div id="loadScreen_split">
              <div id="loadscreen_text_center" ref={ loadHtml } >
                    <h3> 2019 houses of the year. </h3>
              </div>
        </div>
    )
}

const MainApp = () => {

    const navigateFlip = useStore( state => state.componentRendered );
    const navigateMenu = useStore( state => state.shouldRenderMenu );
    const cursorProps  = useStore( state => state.cursor );
    const singleElementIndex = useStore( state => state.singleComponentRender );
    const loadingState = useStore( state => state.loadingState );
    const setLoadingState = useActions( actions => actions.setLoadingState );

    const switchFromLoading = ( ) => {
        setLoadingState( true );
    }

    return (
      <div className="main">
        <CustomCursor obj={ cursorProps }/>

        { !loadingState && <Loading loadingComplete={ switchFromLoading }/> }
        { loadingState &&
        <div id="main_app">
            <Header />
            {  navigateMenu && <NavMenu />  }
            {  !navigateMenu && navigateFlip == 1 &&
               <Carousel positionToStart={ 0 || singleElementIndex.index - 1 } content={ houses }/>
            }
            {  !navigateMenu && navigateFlip == 2 && <SingleElement /> }
        </div>
        }
      </div>
    );
}

export default MainApp;
