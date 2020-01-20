export const slidingAnimation = ( slider , boxToCenter , setCursorDrag , animateInnerBoxContent ) => {
      // boxToCenter  > moves box pos height to middle height.
      // animateBoxesToCenter > hides / shows the box content.
      let isDown = false;
      let startX;
      let scrollLeft;
      let height = slider.offsetHeight;
      let isMoving = false; // trigger mousemoved action once per drag.
      let timeMove;
      let wasDragged = false; // detect

      slider.addEventListener('mousedown', (e) => {
        isDown = true; slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft;
        setCursorDrag( { size: '15px' });
      });

      slider.addEventListener('mouseleave', () => {
        isDown = false; slider.classList.remove('active');
      });

      slider.addEventListener('mouseup', ( e ) => {

          // remove the smooth scroll on frame.
          slider.classList.remove('active');
          isDown = false;
          setCursorDrag( { size: '30px' });
          if ( wasDragged ) {
              wasDragged = false;
                isMoving = false;
                setTimeout( () => { boxToCenter( height , true ); } , 200 );
                animateInnerBoxContent( false );
          }
      });

      slider.addEventListener('mousemove', (e) => {
          if(!isDown) return;
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 1.2; //scroll-fast
          slider.scrollLeft = scrollLeft - walk;

          if ( !isMoving ) {

              timeMove = setTimeout( () => { boxToCenter( height , false ); } , 100 );
              isMoving = true;
              animateInnerBoxContent( true );
              wasDragged = true;
          }
      });
}

export const slidingVertical = ( slider , setCursorDrag ) => {
      let isDown = false;
      let startX;
      let scrollLeft;
      let height = slider.offsetHeight;

      slider.addEventListener('mousedown', (e) => {
        isDown = true; slider.classList.add('active');
        startX = e.pageY - slider.offsetTop; scrollLeft = slider.scrollTop;
        setCursorDrag( { size: '15px' });
      });

      slider.addEventListener('mouseleave', () => {
        isDown = false; slider.classList.remove('active');
      });

      slider.addEventListener('mouseup', ( e ) => {
          // remove the smooth scroll on frame.
          slider.classList.remove('active');
          isDown = false;
          setCursorDrag( { size: '30px' } );
      });

      slider.addEventListener('mousemove', (e) => {
          if(!isDown) return;
          e.preventDefault();
          const x = e.pageY - slider.offsetTop;
          const walk = (x - startX) * 1.2; //scroll-fast
          slider.scrollTop = scrollLeft - walk;
      });
}
