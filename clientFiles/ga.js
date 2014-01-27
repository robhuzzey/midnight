var midnight = {
	xhr: new XMLHttpRequest(),

	post: function( originalElement, event, dataObject ) {
		midnight.xhr.open("POST", "http://localhost:8000/", true);
		midnight.xhr.setRequestHeader("Content-type", "application/json");
		this.xhr.onreadystatechange = function () {
			if( midnight.xhr.readyState === 2 ) {
				midnight.processInteraction( originalElement, event.type );
			} else if( midnight.xhr.readyState === 4 && midnight.xhr.status !== 200 ) {
				midnight.processInteraction( originalElement, event.type );
			}
		};
		midnight.xhr.send(JSON.stringify(dataObject));
	},
	processInteraction: function ( originalElement, interaction ) {
		midnight.xhr.abort();
		switch( interaction ) {
			case 'click':
				$( originalElement ).click();
				break;
			case 'mouseover':
				$( originalElement ).mouseover();
				break;
		}
	}
}

$( '[data-track-mouseover="true"]' ).on( 'mouseover', function( event ) { 
	if( $( this ).data( 'original-event-captured' ) ) {
		$( this ).removeData( 'original-event-captured' );
	} else {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		$( this ).data( 'original-event-captured', true );
		var dataObject = {
			"label": $( this ).data( 'track-label' ),
			"category": $( this ).data( 'track-category' )
		};
		midnight.post( this, event, dataObject );
		return false
	}	
} );

$( '[data-track-click="true"]' ).on( 'click', function( event ) { 
	if( $( this ).data( 'original-event-captured' ) ) {
		$( this ).removeData( 'original-event-captured' );
	} else {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		$( this ).data( 'original-event-captured', true );
		var dataObject = {
			"label": $( this ).data( 'track-label' ),
			"category": $( this ).data( 'track-category' )
		};
		midnight.post( this, event, dataObject );
		return false
	}	
} );
