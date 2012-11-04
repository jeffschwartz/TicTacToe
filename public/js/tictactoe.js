require.config({
  paths: {
    "jquery" : "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min",
    "bootstrap": "libs/bootstrap/js/bootstrap"
  },
  shim: {
    "bootstrap": ['jquery']
  }
});

requirejs(['jquery', 'app/less.min', 'bootstrap' ], function($){
  "use strict";

  var movesCount = 0;
  var $humanAvatar = $( '#humanavatar' );
  var $computerAvatar = $( '#computeravatar' );
  var board = $( 'div.square' ).toArray();





  /*
   * modal popup message window with dynamic content
   */
  var showModalPopUpMessage = function ( message ) {
    $( '#myModalMessage' ).html( message );
    $( '#myModal' ).modal( {
      backdrop : true,
      keyboard : true,
      show     : true,
      remote   : false
    } );
  };





  /*
   * modal popup message window close button click
   * event handler - closes the window
   */
  $( '#myModalCloseBtn' ).click( function ( /*event*/ ) {
    $( '#myModal' ).modal( 'hide' );
  } );




  /*
   * Display message when the sign in button is clicked
   */
  $( '#signinButton' ).click( function ( event ) {
    event.preventDefault();
    showModalPopUpMessage( '<strong>Coming soon!</strong><br>Nothing to log into yet but stay tuned for a multi-player version of Tic Tac Toe.' );
  } );





  /*
   * return either 'X' or 'O'
   */
  var getSquarePiece = function ( row, col ) {
    return $( board[row * 3 + col] ).html();
  };





  /*
   * return either 1 or 4
   */
  var getSquarePieceValue = function ( row, col ) {
    var piece = getSquarePiece( row, col );
    return  piece === '&nbsp;' ? 0 : piece === 'O' ? 1 : 4;
  };





  /*
   * return html element associated with the square
   * represented by row and col (row * 3 + col)
   */
  var getSquare = function ( row, col ) {
    return board[row * 3 + col];
  };





  /*
   * can be called to find either a blocking or a winning square.
   * looks for any row which has a value of rowSum, and
   * the open square in that row is either the winning or
   * blocking square.
   */
  var findRowWithSum = function ( rowSum ) {
    var sum;
    var row;
    var col;
    var empty;

    // sum all rows
    for ( row = 0; row < 3; row += 1 ) {
      sum = 0;
      for ( col = 0; col < 3; col += 1 ) {
        if ( getSquarePiece( row, col ) === '&nbsp;' ) {
          empty = [row, col];
        }
        sum += getSquarePieceValue( row, col );
      }
      if ( sum === rowSum ) {
        return empty;
      }
    }

    // sum all cols
    for ( col = 0; col < 3; col += 1 ) {
      sum = 0;
      for ( row = 0; row < 3; row += 1 ) {
        if ( getSquarePiece( row, col ) === '&nbsp;' ) {
          empty = [row, col];
        }
        sum += getSquarePieceValue( row, col );
      }
      if ( sum === rowSum ) {
        return empty;
      }
    }

    // sum 2 diagonals
    sum = 0;
    for ( row = 0; row < 3; row += 1 ) {
      if ( getSquarePiece( row, row ) === '&nbsp;' ) {
        empty = [row, row];
      }
      sum += getSquarePieceValue( row, row );
    }
    if ( sum === rowSum ) {
      return empty;
    }

    sum = 0;
    for ( row = 0; row < 3; row += 1 ) {
      if ( getSquarePiece( row, 2 - row ) === '&nbsp;' ) {
        empty = [row, 2 - row];
      }
      sum += getSquarePieceValue( row, 2 - row );
    }
    if ( sum === rowSum ) {
      return empty;
    }

    return null;
  };





  /*
   * randomly find and play an open square, used by computer
   */
  var findRandomOpenSquare = function () {
    var keepSearching = true;
    var square;
    var num;
    var text;

    while ( keepSearching === true ) {
      num = Math.floor( (Math.random() * 9) + 1 );
      square = board[num - 1];
      text = $( square ).html();

      if ( text === '&nbsp;' ) {
        keepSearching = false;
      }
    }
    return square;

  };





  /*
   * do something when visiting each square
   */
  var visitEachSquare = function ( $squares, cb ) {

    // call callback function passing index & Element as parameters
    $squares.each( function ( index, Element ) {
      cb( index, Element );
    } );

  };





  /*
   * shows the computer avatar talking head
   */
  $( document ).on( 'show_computer_avatar', function ( /*eventObject*/ ) {
    $computerAvatar.css( 'visibility', 'visible' );
    $humanAvatar.css( 'visibility', 'hidden' );
  } );





  /*
   * shows the human avatar talking head
   */
  $( document ).on( 'show_human_avatar', function ( /*eventObject*/ ) {
    $computerAvatar.css( 'visibility', 'hidden' );
    $humanAvatar.css( 'visibility', ' visible' );
  } );





  /*
   * show the game is over
   */
  $( document ).on( 'show_game_over', function () {
    $( '#avatars_container' ).css( 'display', 'none' );
    $( '#message_container' ).css( 'display', 'block' );
    $( '#message' ).text( 'Game Over. Click the Begin New Game button above to start a new game.' ).css( 'visibility', 'visible' );

  } );





  /*
   * Computer's turn
   */
  var computersTurn = function () {

    var square;
//    var num;
    var winingSquare;
    var blockingSquare;

    $( document ).triggerHandler( 'show_computer_avatar' );
    // if this is the 1st move then take center square ha ha ha ...
//                    if ( movesCount === 0 ) {
////                        $ ( board[4] ).html ( 'X' );
//
//
//                    } else {

    /*
     * finds a winning move if there is one mathematically.
     * since computer pieces each have a value of 4, any row
     * whose value is 8 (4 x 2) is a candidate for a winning move.
     * very simple, actually.
     */
    winingSquare = findRowWithSum( 8 );
    if ( winingSquare ) {
      square = getSquare( winingSquare[0], winingSquare[1] );


    } else {

      /*
       * finds a blocking move if there is one mathematically.
       * since Os (human player' piece) is = to 1, any row with a value of 2 ( O x 2)
       * has a square that can be used to block. very simple, actually.
       */
      blockingSquare = findRowWithSum( 2 );
      if ( blockingSquare ) {
        square = getSquare( blockingSquare[0], blockingSquare[1] );


      } else {

        /*
         * there is no winning or blocking move so the
         * computer will chose its square randomly.
         */
        square = findRandomOpenSquare();

      }

    }

//                    }

    movesCount += 1;

    // just a little bit of latency so the computer talking head can be seen
    setTimeout( function () {
      $( square ).text( 'X' ).css( 'color', '#8800ff' ).css( 'cursor', 'auto' );
      if ( checkForWin( 12 ) === false ) {
        if ( movesCount < 9 ) {
          $( document ).triggerHandler( 'humans_turn' );
        } else {
          showModalPopUpMessage( 'Draw... Game Over!' );
          $( document ).triggerHandler( 'show_game_over' );
        }
      } else {
        showModalPopUpMessage( 'The Computer Won!<br>Ha Ha LOL!!!' );
        $( document ).triggerHandler( 'show_game_over' );
      }
    }, 1000 );

  };





  /*
   * disables the board from human play
   */
  var disableTheBoard = function () {
    visitEachSquare( $( 'div.square' ), function ( index, Element ) {
      $( Element ).unbind( 'click' ).css( 'cursor', 'auto' );
    } );

  };





  /*
   * checks for a winning move by either human or computer
   */
  var checkForWin = function ( winingValue ) {
    var row = 0;
    var col = 0;
    var sum = 0;

    console.log( 'checking for wining value of ' + winingValue + ". moveCount = " + movesCount );

    if ( movesCount >= 5 ) {
      // check horizontal rows
      for ( row = 0; row < 3; row += 1 ) {
        sum = 0;
        for ( col = 0; col < 3; col += 1 ) {
          sum += getSquarePieceValue( row, col );
        }

        if ( sum === winingValue ) {
          console.log( 'wining value found in horizontal row' );
          return true;
        }
      }

      // check vertical rows
      for ( col = 0; col < 3; col += 1 ) {
        sum = 0;
        for ( row = 0; row < 3; row += 1 ) {
          sum += getSquarePieceValue( row, col );
        }

        if ( sum === winingValue ) {
          console.log( 'wining value found in vertical row' );
          return true;
        }
      }

      // check diagonal rows
      sum = 0;
      for ( row = 0; row < 3; row += 1 ) {
        sum += getSquarePieceValue( row, row );
      }
      if ( sum === winingValue ) {
        console.log( 'wining value found in diagonal row, top left to bottom right' );
        return true;
      }

      sum = 0;
      for ( row = 0; row < 3; row += 1 ) {
        sum += getSquarePieceValue( row, 2 - row );
      }
      if ( sum === winingValue ) {
        console.log( 'wining value found in diagonal row, top right to botton left' );
        return true;
      }

    }
    return false;
  };





  /*
   * handles human square click events
   */
  var humanClickHandler = function ( event, Element ) {
    // mark the board
    $( Element ).text( 'O' ).css( 'color', '#000' ).
      css( 'cursor', 'auto' ).unbind( 'click' );

    movesCount += 1;

    // disable the board
    disableTheBoard();

    // check for win
    if ( checkForWin( 3 ) === false ) {
      if ( movesCount < 9 ) {
        computersTurn();
      } else {
        showModalPopUpMessage( 'Draw... Game Over!' );
        $( document ).triggerHandler( 'show_game_over' );
      }
    } else {
      showModalPopUpMessage( 'Congratulations! You are the winner.' );
      $( document ).triggerHandler( 'show_game_over' );
    }

  };





  /*
   * enables the board for human play
   */
  var enableTheBoard = function () {
    visitEachSquare( $( 'div.square' ), function ( index, Element ) {
      if ( $( Element ).html() === '&nbsp;' ) {
        $( Element ).click(function ( event ) {
          humanClickHandler( event, Element );
        } ).css( 'cursor', 'pointer' );
      }
    } );
  };





  /*
   * Event type humans_turn handler
   */
  $( document ).on( 'humans_turn', function () {
    $( document ).triggerHandler( 'show_human_avatar' );
    enableTheBoard();
  } );





  /*
   * Generate the game board with animation. Fills the board with
   * Xs & Os every 25 miliseconds and then waits 1 second.
   */
  var fillTheBoard = function ( cb ) {
    var toDos = [];
    var $squares = $( 'div.square' );

    visitEachSquare( $squares, function ( index, Element ) {

      var player = index % 2 === 0 ? 'X' : 'O';
      toDos.push( {player : player, Element : Element} );

      if ( toDos.length === 9 ) {

        // show the 1st square immediately
        $( toDos[0].Element ).css( 'display', 'none' ).
          text( toDos[0].player ).css( 'color', toDos[0].player === 'X' ? '#8800ff' : '#000' ).fadeIn( 'slow' );

        // increment the index
        var i = 1;

        // show the remaining squares 250 milliseconds apart
        var timer = setInterval( function () {

          // if this is the last toDo shut down the interval
          if ( i > 8 ) {

            // shut down the timer loop
            clearInterval( timer );

            setTimeout( function () {
              cb();
            }, 1000 );

          } else {

            // get the next toDo
            var toDo = toDos[i];

            $( toDo.Element ).css( 'display', 'none' ).
              text( toDo.player ).
              css( 'color', toDo.player === 'X' ? '#8800ff' : '#000' ).
              fadeIn( 'slow' );

            // set up the next iteration of the loop
            i += 1;

          }

        }, 250 );

      }

    } );
  };





  /*
   * Clear the game board without animation
   */
  var clearBoard = function () {
    visitEachSquare( $( 'div.square' ), function ( index, Element ) {
      $( Element ).html( '&nbsp;' );
      $( Element ).unbind( 'click' );
    } );
  };





  /*
   * Plays the game
   */
  var play = function () {
    clearBoard();
    computersTurn();
  };





  /*
   * initializes the game when user clicks Begin New Game button
   */
  var startGame = function () {
    clearBoard();
    fillTheBoard( function () {
      play();
    } );
  };





  /*
   * event handler for Begin New Game button click event
   */
  $( '#begingame' ).click( function ( /*event*/ ) {
    movesCount = 0;
    // hide the message_container
    $( '#message_container' ).css( 'display', 'none' );
    // make the avatars container visible
    $( '#avatars_container' ).css( 'display', 'block' );
    // hide avatars
    $humanAvatar.css( 'visibility', 'hidden' );
    $computerAvatar.css( 'visibility', 'hidden' );
    startGame();
  } );





  /*
   * handles page load and user refreshing the page
   */
  $('#block' ).css('visibility', 'visible');
  fillTheBoard( function () {
    play();
  } );

});
