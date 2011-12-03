function PopupModel(region, realm, character) {
	var that = this;

	that.fetchMonthlyAuctions = function(itemId, callback) {
		$.ajax('http://api.ahspy.com/' + region.substr(0,2) + '/' + realm + '/item/' + itemId + '/monthly.json', {
			jsonp: 'callback',
			dataType: 'jsonp',
			success: function(data) {
				callback(undefined, data);
			}
		});
	};
	
	that.getDecorators = function(spellId) {
		var tags = [];				
		useDecorators(spellId, function(decorator) {
			tags.push(decorator.decorator_text);
		});
		return tags;
	};
	
	that.isAHSpyRegion = function() {
		return (region == "eu.battle.net" || region == "us.battle.net") && realm != "" ;
	};
	
	return that;
}
function PopupView() {
	var that = this;
	
	that.init = function() {
		var popupHtml = '<div id="popup" class="popup_window">' + 
						' <div class="buffer"></div>' + 
						//' <div class="popup_nav">' + 
						'  <div class="popup"></div>' + 
						//' </div>' + 
						'</div>';
						
		that.popupWindow = $(popupHtml);
		// Hide popup when clicked 
		that.popupWindow.click(function(e) {
			that.onBackgroundClick();
		});
		$('body').append(that.popupWindow);
		
		// Prevent bubbling through events up to the background layer (which hides the popup)
		that.popupContent = $('.popup', that.popupWindow);
		$('.popup', that.popupWindow).click(function(event) {
			event.stopPropagation();
		});
		
		that.popupSpellHead = $('<div class="popup_head"></div>').appendTo(that.popupContent);
		that.popupSpellDesc = $('<div></div>').appendTo(that.popupContent);
		that.popupAHTable = $('<div></div>').appendTo(that.popupContent);
		
	};
	
	that.onBackgroundClick = function() {
		that.popupWindow.detach();
	};
		
	// Fills the biggest part of the popup (icon, name, links, description, ...)
	that.renderHeader = function(data) {
		var template = "<img alt='Spell Icon' src='{{{spell_iconurl}}}' />" + 
					   " <span class=name>{{spell_name}}</span><br />" + 
					   " <div>Links: {{#links}} <a target='_blank' href='{{{url}}}'>{{label}}</a>{{/links}}</div>" + 
					   " {{#has_tags}}<div>Tags: {{#tags}}{{{.}}} {{/tags}}</div>{{/has_tags}}";
		that.popupSpellHead.append(Mustache.to_html(template, data));
		
	};
	that.renderDescription = function(description) {
		var template = "<p>{{{description_text}}}</p>";
		that.popupSpellDesc.append(Mustache.to_html(template, {'description_text': description}));
	};
	
	
	//// --------------------------------------------------------------------------------------
	//// AH Prices Block	
	that.hideAHPriceBlock = function() {
		that.popupAHTable.detach();
	};
	that.showAHTableHeader = function(realm) {
		var template = 
			" <div>Auktionshauspreis der letzten 31 Tage</div>" + 
			" <div>Realm: <b>{{realm}}</b></div>";
		that.popupAHTable.append(Mustache.to_html(template, {
			'realm': realm
		}));
	};
	
	function createOrFindAHTable(itemId, link) {
		var table = $('#ahspy-table-' + itemId);
		if ( table.length > 0 ) {
			return table;
		}		
		var template = "<div>" +
					   " <table id='ahspy-table-" + itemId + "' class='popup_ahtable'></table>" + 
					   " <a href={{{link}}}>Daten (Quelle)</a> und <a href='http://www.ahspy.com/global/item/{{item_id}}' target=_blank>Globale Preisliste</a> von AHSpy" + 
					   "</div>";
		var tableDiv = $(Mustache.to_html(template, {
			'item_id': itemId,
			'link': link
		}));
		that.popupAHTable.append(tableDiv);
		return $(".popup_ahtable", tableDiv);
	}
	
	that.showAHLoadingTable = function(itemId, link) {
		var table = createOrFindAHTable(itemId, link);
		table.append("<tr><td>Loading ...</td></tr>");
		
	};
	that.hideAHPriceTable = function(itemId) {
		var table = $('#ahspy-table-' + itemId);
		table.parent().detach();
	};
	that.showAHPriceTable = function(itemId, data) {
		// Check if there is already a loading and empty it
		var table = createOrFindAHTable(itemId);
		table.empty();
		
		// Fill the table		
		var headerLine = "<tr>" +
			"<th>Fraktion</th>" + 
			"<th class='qty'>Anzahl</th>" + 
			
			"<th>Min</th>" + 
			"<th>Max</th>" + 
			"<th>Durchschnitt</th>" +
			
		"</tr>";
		table.append(headerLine);
		
		jQuery.each(data, function(factionShortCode, auctions) {
			if ( auctions == null || auctions.qty == 0 ) return;
			var tr = $("<tr></tr>");
			
			if ( factionShortCode == "a" ) {
				tr.append("<td class='alliance'>Allianz</td>");
			} 
			else if ( factionShortCode == "h" ) {
				tr.append("<td class='horde'>Horde</td>");
			} else {
				tr.append("<td class='neutral'>Neutral</td>");
			}
			
			jQuery.each(['qty'], function(i, field) {
				var td = $("<td></td>").addClass(field);
				td.text(auctions[field]);
				tr.append(td);
			});
			
			jQuery.each(['min', 'max', 'avg'], function(i, field) {
				var td = $("<td></td>").addClass(field).css('width','120px').css('text-align', 'right');
				td.html(that.formatPrice(auctions[field]));
				tr.append(td);
			});
			table.append(tr);
		});
	};
	
	that.getAHTablesCount = function() {
		// If no table is left, remove the whole container
		return $("table", that.popupAHTable).length;
	};
	
	//// --------------------------------------------------------------------------------------------------------------
	//// Helpers:
	that.formatPrice = function(n) {
		var s = "" + n, result = "";
		
		var copper, silver, gold;
		
		// Parse input
		copper = Number(s.substr(s.length - 2, 2));
		if ( s.length > 2 ) {
			silver = Number(s.substr(s.length - 4, 2));
			if ( s.length > 4 ) {
				gold = Number(s.substr(0, s.length - 4));
			}
		}
		
		// Build output
		if ( gold > 0) result += "<span class=icon-gold>" + gold + "</span>";
		if ( silver > 0) result += "<span class=icon-silver>" + silver + "</span>";
		if ( copper > 0) result += "<span class=icon-copper>" + copper + "</span>";
		return result;
	};
	
	that.init();
	return that;
}

function popup_show(spell, character) {
	var itemIds = gSpellsMapping[spell.id];
	var region = $("#region").val(); // eu, us, kr, ...
	var realm = $("#realm").val();
	var faction = $.battlenet({action: 'get-faction-by-race', race:character.race}).toLowerCase();
	
	// Helper Class to abstract data access
	var model = new PopupModel(region, realm, character);
	var view = new PopupView();

	// Init popup content
	var tags = model.getDecorators(spell.id);
	var data = {
		spell_iconurl: wowhead_spellicon(spell),
		spell_name: spell.name_dede,
		links: [
			{label: 'Wowhead', url: wowhead_spellurl(spell.id)},						
			{label: 'Buffed.de', url: 'http://wowdata.buffed.de/?s=' + spell.id}
		],
		
		// Tags
		has_tags: tags.length > 0,
		tags: tags
	};
	view.renderHeader(data);
	
	// Show the description block
	if (spell.id in gDescriptions) {
		view.renderDescription(gDescriptions[spell.id]);
	}
	
	// Start AJAX Request to fetch ahspy-data
	if ( model.isAHSpyRegion() ) {
		// Show header
		view.showAHTableHeader(realm);
			
		// Each spell can have multiple Items which provides the spell. Shows prices for each separately
		jQuery.each(itemIds, function(i, itemId) {
			view.showAHLoadingTable(
				itemId, 
				ahspy_itemurl(region, realm, faction, itemId)
			);
		
			model.fetchMonthlyAuctions(itemId, function(err, data) {
				if ( (data.a == null && data.h == null && data.n == null) ||
					 (data.a.qty == 0 && data.h.qty == 0 && data.n.qty == 0)) {
					// Remove the table
					view.hideAHPriceTable(itemId);
					
					// Remove the ah block, if no price table is left
					if ( view.getAHTablesCount() == 0 ) {
						view.hideAHPriceBlock();
					}
				} else {
					view.showAHPriceTable(ite7mId, data);
				}
			});
		});
	} else {
		popupContent.append("AHSpy Data not supported in your region.");
	}
}
function test_popup(state) {
	var view = new PopupView();
	view.renderDescription('Hello World!');
	
	view.showAHTableHeader('Aegwynn');
	view.showAHLoadingTable(66096, 'http://www.heise.de');
	view.showAHLoadingTable(66097, 'http://www.buffed.de');
	if ( state == 1) {
		window.setTimeout(function() {
			view.showAHPriceTable(66096, {
				'a': {
					'qty': '3',
					'min': '1',
					'max': '10',
					'avg': '5'
				}
			});
			view.hideAHPriceTable(66097);
		}, 2000);
	}
}
/*$(document).ready(function() {
	test_popup(1);
});*/