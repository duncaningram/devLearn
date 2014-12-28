var Event = (function() {
	
	var events = {};
	
	function addEventListener(context, eventName, eventHandler) {
		if (events[context] && events[context][eventName] === eventHandler) {
			
		} else {
			if (!events[context]) {
				events[context] = {};
			}
			
			events[context][eventName] = eventHandler;
			context.addEventListener(eventName, eventHandler);
		}
	};
	
	function removeEventListener(context, eventName, eventHandler) {
		if (events[context] && events[context][eventName] === eventHandler) {
			delete events[context][eventName];
			context.removeEventListener(eventName, eventHandler);
		}
	};
	
	return {
		addEventListener: addEventListener,
		removeEventListener: removeEventListener	
	};
	
})();

module.exports = Event;
