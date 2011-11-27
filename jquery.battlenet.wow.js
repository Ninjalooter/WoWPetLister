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
		$.ajax({
			url: charUrl,
			type:"GET",
			dataType:"jsonp",
			'jsonp':'jsonp',
			success: handler
		});
	}
	
	/* Public methods */
	$.fn.battlenet = function(options) {
		var options = jQuery.extend({}, jQuery.fn.battlenet.defaults, options);
		if ( options.action === 'fill-with-realms' && options.region ) {
			return this.each(function() {
				var select = $(this);
				select.empty();
				select.append("<option value=''>Loading ...</option>");
				select.attr('disabled', 'disabled');
				
				var realmsUrl = ("https:" === document.location.protocol ? "https" : "http")+ "://" + options.region + "/api/wow/realm/status";
				
				$.ajax({
					url: realmsUrl,
					type:"GET",
					dataType:"jsonp",
					'jsonp':'jsonp',
					success: function(data) {
						select.empty();
						jQuery.each(data.realms, function(i, realm) {
							var opt = $("<option value=\"" + realm.slug + "\">" + realm.name + "</option>");
							if ( options.selected == realm.slug ) {
								opt.attr("selected", "selected");
							}
							select.append(opt);
						});
						select.removeAttr('disabled');
					}
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
			if ( jQuery.inArray(options.race, [1,3,4,7,11,22]) >= 0) {
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
		'region': undefined,
		'selected': undefined
	};
})(jQuery);