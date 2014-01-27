var midnight = {
	originalEventCaptureQueue: [],
	isInQueue: function( searchElement ) {
		var retVal = false;
		for(var item in this.originalEventCaptureQueue) {
			if( searchElement === this.originalEventCaptureQueue[item] ){
				this.originalEventCaptureQueue.splice( item, 1 );
				return true;
			}
		}
	},
	xhr: new XMLHttpRequest(),
	post: function( originalElement, event ) {
		if( !midnight.isInQueue( originalElement ) ) {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			midnight.originalEventCaptureQueue.push( originalElement );
			var dataObject = {
				"label": originalElement.dataset.trackLabel,
				"category": originalElement.dataset.trackCategory
			};
			midnight.xhr.open("POST", "midnightUrl", true);
			midnight.xhr.setRequestHeader("Content-type", "application/json");
			midnight.xhr.onreadystatechange = function () {
				if( midnight.xhr.readyState === 2 ) {
					midnight.xhr.abort();
					var evObj = document.createEvent('MouseEvents');
					evObj.initEvent( event.type, true, false );
					originalElement.dispatchEvent(evObj);
				}
			};
			midnight.xhr.send(JSON.stringify(dataObject));
		}
	}
}

var mOvers = document.querySelectorAll('[data-track="true"]');
for( var elemCount = 0; elemCount <= mOvers.length; elemCount++ ) {
	if( mOvers[elemCount] ) {
		mOvers[elemCount].addEventListener( mOvers[elemCount].dataset.trackEvent, function( event ) {
			midnight.post( this, event );
		}, false );
	}
}
