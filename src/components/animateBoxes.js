
export const animateBoxesToCenter = ( height , moveBackToOrigin , callNext ) => {

    const isEven = ( index ) =>  index % 2 == 0;

    var boxes = [ ...document.querySelectorAll('.inner_box')];

    boxes.forEach( ( box , index ) => {

        var firstBox = box.offsetHeight;
        var heightAdjust = ( height - firstBox ) / 2;

        let decider =  isEven( index ) ? "" + (heightAdjust - 20 ) : "-" + (heightAdjust - 20 );
        if ( moveBackToOrigin ) {
            box.style.transform = "none";
        } else {
            box.style.transform = "translateY(" + decider +"px)";
        }
    });
    if (callNext) callNext();
}
