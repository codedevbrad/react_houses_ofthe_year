
import { action , thunk } from 'easy-peasy';
import axios from 'axios';

export default {

  innerContentshouldHide : false ,
  componentRendered: 1 ,
  singleComponentRender : { } ,
  shouldRenderMenu: false ,
  cursor : { size: '30px' },
  loadingState: false ,

  // actions.

  setLoadingState: action( ( state , boolean ) => { state.loadingState = boolean }) ,

  setCursorProps : action( ( state , obj ) => { state.cursor = obj }) ,

  setMenuRender: action( ( state , render ) => { state.shouldRenderMenu = render; }) ,

  setComponentRender: action( ( state , render ) => { state.componentRendered = render; }) ,

  setSingleRender: action( ( state , render ) => { state.singleComponentRender = render; }) ,

  animateInnerBoxContent : action( ( state , render ) => { state.innerContentshouldHide = render; }) ,

};
