const TOTAL_DELTA_PX = 10;
const INITIAL_WAIT_TIMEOUT_MILLISECONDS = 0;
const INITIAL_MOVE_UP_WAIT_TIMEOUT_MILLISECONDS = 1 * 1000;
const BETWEEN_BOUNCE_WAIT_TIMEOUT_MILLISECONDS = 5 * 1000;
const BETWEEN_MOVE_WAIT_TIMEOUT_MILLISECONDS = 1;

const ACTIVE_BOUNCE_DATASET_ID = 'gbActiveBounce';

const STOP_BOUNCE_ERROR = Error( STOP_BOUNCE_ERROR );



let STOP_BOUNCE;
let STOP_BOUNCE_CALLBACK;
let RESTART_BOUNCE_TIMEOUT;

const bounce = (elementId, options={}, forceBounce=false) => {
  // run in try-catch because element with id of elementId
  // may be removed from the page at any point
  try{
    // Clear any timeout, if present
    RESTART_BOUNCE_TIMEOUT = null;


    const element = document.getElementById( elementId );

    const totalDeltaPx = options.totalDeltaPx || TOTAL_DELTA_PX;
    const initialWaitTimeoutMilliseconds = options.initialWaitTimeoutMilliseconds || INITIAL_WAIT_TIMEOUT_MILLISECONDS;
    const initialMoveUpWaitTimeoutMilliseconds = options.initialMoveUpWaitTimeoutMilliseconds || INITIAL_MOVE_UP_WAIT_TIMEOUT_MILLISECONDS;
    const betweenBounceWaitTimeoutMilliseconds = options.betweenBounceWaitTimeoutMilliseconds || BETWEEN_BOUNCE_WAIT_TIMEOUT_MILLISECONDS;
    const betweenMoveWaitTimeoutMilliseconds = options.betweenMoveWaitTimeoutMilliseconds || BETWEEN_MOVE_WAIT_TIMEOUT_MILLISECONDS;
    const activeBounceDatasetId = options.activeBounceDatasetId || ACTIVE_BOUNCE_DATASET_ID;


    if(
      !element ||
      element.style.position !== 'absolute' ||
      ( !forceBounce && element.dataset[ activeBounceDatasetId ] )
    ){
      return;
    }


    element.dataset[ activeBounceDatasetId ] = '';


    const allowedTotalDeltaPx = Math.min(
      totalDeltaPx,
      element.parentElement.getBoundingClientRect().height
    );


    const moveDown = (setTimeoutCallback, setTimeoutWaitMilliseconds, moveSpeedMultiplier) => move(
      elementId,
      allowedTotalDeltaPx,
      -1,
      () => setTimeout(
        setTimeoutCallback,
        setTimeoutWaitMilliseconds
      ),
      betweenMoveWaitTimeoutMilliseconds * ( moveSpeedMultiplier || 1 )
    );

    const moveUp = (setTimeoutCallback, setTimeoutWaitMilliseconds, moveSpeedMultiplier) => move(
      elementId,
      allowedTotalDeltaPx,
      1,
      () => setTimeout(
        setTimeoutCallback,
        setTimeoutWaitMilliseconds
      ),
      betweenMoveWaitTimeoutMilliseconds * ( moveSpeedMultiplier || 1 )
    );


    /*
      A bounce looks like:
        1. Move up, Short pause
        2. Move down quickly
        3. Move up quickly
        4. Move down quickly
        5. Long pause, Repeat
    */

    setTimeout(
      () => moveUp(
        () => moveDown(
          () => moveUp(
            () => moveDown(
              () => {
                if( STOP_BOUNCE && STOP_BOUNCE_CALLBACK ){
                  return STOP_BOUNCE_CALLBACK();
                } else if( STOP_BOUNCE ) {
                  return;
                }

                RESTART_BOUNCE_TIMEOUT = setTimeout(
                  () => bounce(elementId, options, true),
                  betweenBounceWaitTimeoutMilliseconds
                );
              },
              null,
              0,
              betweenMoveWaitTimeoutMilliseconds
            ),
            null,
            0,
            betweenMoveWaitTimeoutMilliseconds
          ),
          null,
          0,
          betweenMoveWaitTimeoutMilliseconds
        ),
        initialMoveUpWaitTimeoutMilliseconds,
        betweenMoveWaitTimeoutMilliseconds * 1.5
      ),
      initialWaitTimeoutMilliseconds
    );


    return callback => {

      if( RESTART_BOUNCE_TIMEOUT ){
        clearTimeout( RESTART_BOUNCE_TIMEOUT );

        return callback && callback();
      }


      STOP_BOUNCE = true;
      STOP_BOUNCE_CALLBACK = callback;
    };
  } catch(error) {
    // Element was likely removed
  }
};



const move = (elementId, totalDeltaPx, deltaPx, callback, timeoutMs, currentDeltaPx) => {
  try {
    const element = document.getElementById( elementId );

    const hasExceededDelta = Math.abs( currentDeltaPx ) >= totalDeltaPx;
    if( hasExceededDelta && callback ){
      return callback();
    } else if( hasExceededDelta ){
      return;
    }


    let currentBottom = (
      element.style.bottom ?
        +element.style.bottom.replace(/[^\d]*/g, '')
      :
        0
    );

    if( element.style.bottom.startsWith('-') ){
      currentBottom *= -1;
    }

    const newDelta = ( currentDeltaPx || 0 ) + deltaPx;
    const newBottom = ( currentBottom || 0 ) + deltaPx;

    element.style.bottom = `${ newBottom }px`;


    return setTimeout(
      () => move(
        elementId,
        totalDeltaPx,
        deltaPx,
        callback,
        timeoutMs,
        newDelta
      ),
      timeoutMs
    );
  } catch (error) {
    // See error note in `bounce`
  }
}



export default bounce;