/**
 * Simple API for my own needs accessing the battle.net WOW api. 
 * Blizzard Documentation available at http://blizzard.github.com/api-wow-docs/
 *
 * http://creativecommons.org/licenses/by/3.0/
 */

(function($) {
	/* Private Methods */
	function loadCharacterData(server, realm, character, fields, handler) {
		var charUrl = ("https:" === document.location.protocol ? "https" : "http")+ "://" + server + "/api/wow/character/" + realm + "/" + encodeURIComponent(character);
		charUrl += "?fields=" + fields;
		$.getJSON(charUrl, handler);
	}
	
	/* Public methods */
	$.fn.battlenet = function(options) {
		var options = jQuery.extend({}, jQuery.fn.battlenet.defaults, options);
		if ( options.action === 'fill-with-realms' && options.region ) {
			return this.each(function() {
				var select = $(this);
				select.empty();
				select.append("<option>Loading ...");
				select.attr('disabled', 'disabled');
				
				var realmsUrl = ("https:" === document.location.protocol ? "https" : "http")+ "://" + options.region + "/api/wow/realm/status";
				
				$.getJSON(realmsUrl, function(data) {
					select.empty();
					jQuery.each(data.realms, function(i, realm) {
						select.append($("<option value=\"" + realm.slug + "\">" + realm.name + "</option>"));
					});
					select.removeAttr('disabled');
				});
			});
		}
	};
	
	
	$.battlenet = function(options) {
		var options = jQuery.extend({}, jQuery.battlenet.defaults, options);
		if ( options.action == 'load-character-companions' ) {
			loadCharacterData(options.server, options.realm, options.charname, "companions", options.handler);
		}
		else if ( options.action == 'load-character-mounts') {
			loadCharacterData(options.server, options.realm, options.charname, "mounts", options.handler);
		}
		else if ( options.action == 'get-faction-by-race') {
			if ( jQuery.inArray(options.race, [1,3,4,7,11,22])) {
				return "ALLIANCE";
			} else {
				return "HORDE";
			}
		}
	};
	
	
	$.battlenet.defaults = {
		'action': 'load-character-companions',
		'handler': undefined,
		
		'server': 'eu.battle.net',
		'realm': undefined,
		'charname': undefined
	};
	$.fn.battlenet.defaults = {
		'action': 'fill-with-realms',
		'region': undefined
	};
})(jQuery);