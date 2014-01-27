var express = require( 'express' ),
	fs = require( 'fs' ),
	url = process.argv[3] || 'http://localhost',
	port = process.argv[2] || 8000,
	app = express();

app.use( function ( req, res, next ) {
	res.setHeader( 'Access-Control-Allow-Origin', '*' );
	res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS' );
	res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,X-HTTP-Method-Override, Content-Type, Accept' );
	res.setHeader( 'Access-Control-Max-Age', '86400' );
	res.setHeader( 'Access-Control-Allow-Credentials', false );
	next();
} );

app.get( '/', function( req, res ) {
	fs.readFile( 'clientFiles/ga.js', 'utf8', function ( err,data ) {
	 	if ( err ) {
	 		return console.log( err );
	 	}
	 	res.set( 'Content-Type', 'text/javascript' );
	    res.send( data.replace( 'midnightUrl', url + ":" + port ) );
	} );
} );

app.post( '/', function( req, res ) {
	var postData='';
	req.on('data', function( chunk ) {
		postData += chunk;
    });
    req.on( 'end', function () {
    	var jsonResponse = JSON.parse( postData );
		console.log( "Received body data:", jsonResponse.category );
		res.writeHead( 200 );
    	res.end();
    } );
} ); 

app.listen( port );

console.log("Midnight 0.0.1 3rd Party F&F server\nby Rob Johnson\nrunning at http://localhost:" + port + "/\nCTRL + C to shutdown");
