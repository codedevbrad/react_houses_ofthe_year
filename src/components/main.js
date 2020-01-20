import React, { Fragment , useState , useEffect , useRef } from 'react';
import './styles.scss';
import { useStore , useActions } from 'easy-peasy';
import { slidingAnimation , slidingVertical } from './slidingAnimate';
import { animateBoxesToCenter } from './animateBoxes';
const houses = [
  { img: '' , title: 'house of the year 2019' , info: 'explore the winners of house of the year 2019.' } ,
  { img: '/houses/pic1.jpg' , title: 'a modern feel' , info: 'explore the feel of a modern house set in the busy streets of california.'} ,
  { img: '/houses/pc2.jpg'  , title: 'rustic feel'   , info: 'see why container houses are the newest trend of 2019.' } ,
  { img: '/houses/pic3.jpg' , title: 'green breeze'  , info: 'set in the welsh forest, the green breeze house has a stunning view all to itself.'} ,
  { img: '/houses/pic4.jpg' , title: 'the black box' , info: 'the minimilist black box overlooks the dorset lake with stunning views.' } ,
  { img: '/houses/pic5.jpg' , title: 'highland house', info: 'what may look like a red box, the highland house offers a warm, secluded experience.'  } ,
  { img: '/houses/pic6.jpg' , title: 'rustic office' , info: 'this rustic building set in the busy city creates a unique modern work setting.' } ,
  { img: '/houses/pic7.jpg' , title: 'the lonely cottage' , info: '' } ,
  { img: '/houses/pic8.jpg' , title: 'riverback retreat'  , info: '' } ,
  { img: '' , title: ''  , info: '' }
];

const isEven = ( index ) =>  index % 2 === 0;

const ReactMovement = ( { children , elClass , distance  , tag } ) => {

    if ( !distance ) distance = 3;
    const Tag = tag || 'div';

    var oldx = 0,
        oldy = 0,
        coordinates = [ ];

    const setBack = ( e ) => {
        e.currentTarget.style.transform = "none";
    }

    const translateImage = ( e ) => {

       e.pageX < oldx ? coordinates[0] = distance : coordinates[0] = -distance;
       e.pageY < oldy ? coordinates[1] = distance : coordinates[1] = -distance;

       oldx = e.pageX;
       oldy = e.pageY;

       const xTranslate = coordinates[0] + 'px';
       const yTranslate = coordinates[1] + 'px';
       e.currentTarget.style.transform = "translate(" + xTranslate + "," + yTranslate + ")";
    }

    return (
       <Tag className={ elClass } onMouseMove={ e => translateImage( e )} onMouseLeave={ e => setBack( e ) }>
          { children }
       </Tag>
    )
}

const InnerBox = ( { el , index , width } ) => {

    const [ shouldAnimateIn , setAnimateIn ] = useState(false);
    const setComponentRender = useActions( actions => actions.setComponentRender );
    const setSingleRender = useActions( actions => actions.setSingleRender );
    const shouldHideInner = useStore( state => state.innerContentshouldHide );
    const animateInnerBoxContent = useActions( actions => actions.animateInnerBoxContent );
    const box_info = useRef( false );

    useEffect( ( ) => {
          setTimeout( ( ) => {
              setAnimateIn( true );
          }, 1000 );
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
            <div className="box_info_centered">
                <section>
                  <h3> { el.title } </h3>
                  <p>  { el.info  } </p>
                </section>
            </div>
          }
          { !shouldHideInner && index != 0 && (index + 1 ) != houses.length &&
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

          { index != 0 && (index + 1 ) != houses.length &&
            <div ref={ box_info } className={ shouldAnimateIn ? ' visible inner_box' : 'inner_box' }
                 style={ isEven(index + 1) ? { top : 20 + 'px' } : { bottom : 20 + 'px' }}>
                <ReactMovement elClass={ "smooth_scroll" } distance={ 7 }>
                  <img src={ el.img } />
                </ReactMovement>
            </div>
          }
      </div>
   )
}

const Carousel = ( { positionToStart } ) => {

  positionToStart = positionToStart || 0;

  const [elements , setEls ] = useState( houses );
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
                  <InnerBox key={ index } el={element } index={ index } width={ width } />
              )}
          </div>
      </div>
    )
}

const SingleElement = ( ) => {
    const singleElementIndex = useStore( state => state.singleComponentRender );
    const [ house , setHouseComponet ] = useState( houses[ singleElementIndex.index ]);
    const { width , height } = singleElementIndex;
    const setCursorDrag = useActions( actions => actions.setCursorProps );
    const setComponentRender = useActions( actions => actions.setComponentRender );

    const frame = useRef(null);

    useEffect( ( ) => {
          slidingVertical( frame.current , setCursorDrag );
    } , [ ] );

    const returnToCarousel = ( ) => {
          setComponentRender( 1 );
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

    const loadingEffect = ( next ) => {
       setTimeout( () => {
             // move element up
            let screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            loadHtml.current.style.opacity = 0;
            console.log('fades out');
            // loadHtml.current.style.transform = "translateY(" + "-" + screenHeight + "px)";
            // wait 2 seconds
            setTimeout( () => {
                console.log('fades in');
                next();
            }, 3500 );
       }, 1700 );
    }

    useEffect( ( ) => {
        loadingEffect( ( ) => {
          console.log('finished');
          loadingComplete();
        });
    }, [] );

    return (
        <div id="loadScreen_split" ref={ loadHtml }>
              <div id="loadscreen_text_center">
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
        <div id="main_app">
            <Header />
            {   navigateMenu && <NavMenu />  }
            {  !navigateMenu && navigateFlip == 1 && <Carousel positionToStart={ 0 || singleElementIndex.index - 1 }/> }
            {  !navigateMenu && navigateFlip == 2 && <SingleElement /> }
        </div>
      </div>
    );
}

export default MainApp;
