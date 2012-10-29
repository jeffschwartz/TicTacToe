/*
 * GET home page.
 */

var app = require( '../app' );





/*
 * Render the index page and displays page hit counter in its footer
 */
exports.index = function ( req, res ) {
  // get the uniqueip colloection
  var uniqueip = app.db.collection( 'uniqueip' );

  // ensure uniqueip collection is indexed on ip property
  uniqueip.ensureIndex( {ip : 1, unique : true} );

  // get the request ip address
  var ipAddress = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.connection.remoteAddress;

  // if the ip address isn't in uniqueip collection write it out and render index, else render index.
  uniqueip.find( {ip : ipAddress} ).count( function ( err, count ) {
    if ( count === 0 ) {
      uniqueip.save( {ip : ipAddress}, function ( err, doc ) {
        uniqueip.find().count( function ( err, count ) {
          renderIndex( err, count );
        } );
      } );
    } else {
      uniqueip.find().count( function ( err, count ) {
        renderIndex(err, count);
      });
    }
  } );





  /*
   * Called in 2 different logic branches
   */
  var renderIndex = function ( err, count ) {
    res.render( 'index', { count : count} );
  };

};
