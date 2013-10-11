var userStore = {
	width : 150,
	items : [ {
		text : "Mats",
		icon : "img/mats.jpeg",
		action : menuAction
	}, {
		text : "Homer",
		icon : "img/homer.jpg",
		action : menuAction
	}, {
		text : "Brian",
		icon : "img/brian.jpeg",
		action : menuAction
	} ]
};

function menuAction(target) {
	target.src = this.data.icon;
	var scope = angular.element(target).scope();
	scope.item.userImg = this.data.icon;
	$(target.parentNode).css("display", "block");
}

// Registering the menu for all images.
function registerUserMenuForAll() {
	var items = $(".context-menu-one");
	for ( var i = 0; i < items.length; i++) {
		$(items[i]).contextmenu(userStore);
	}
}

function registerUserMenu() {
	setTimeout('registerUserMenuForAll()', 500);
}

$().ready(function() {
	$("#kanban-dnd-div .columnCollapsed").hide();
});

var totWidth = 92;
var expandedWidth = 23;
var collapsedWidth = 4;

$("#kanban-dnd-div .columnCollapsed")
		.click(
				function(ui, event) {
					var uiItem = $($(this).next());
					uiItem.show();
					uiItem.animate({
						width : "100%"
					}, {
						duration : 300,
						queue : false
					});

					$(uiItem.parent()).attr("expanded", "true");
					var collapsedItem = $("#" + uiItem.attr("id") + "Collapsed");
					collapsedItem.hide();

					// Decreasing collapsed divs widths.
					var collapsedDivs = $("div[expanded=false]");
					for ( var i = 0; i < collapsedDivs.length; i++) {
						$(collapsedDivs[i]).width(collapsedWidth + "%");
					}

					// Increasing expanded divs widths.
					var expandedDivs = $("div[expanded=true]");
					var expandedCount = expandedDivs.length;
					var widthToSet = (totWidth - ((4 - expandedCount) * collapsedWidth))
							/ expandedCount;
					for ( var i = 0; i < expandedDivs.length; i++) {
						$(expandedDivs[i]).width(widthToSet + "%");
					}
				});

$("img[type=collapseColumn]")
		.click(
				function(ui, event) {
					var uiItem = $($(this).parent().parent().parent());
					uiItem.hide();
					uiItem.animate({
						width : "0%"
					}, {
						duration : 300,
						queue : false
					});

					$(uiItem.parent()).attr("expanded", "false");
					var collapsedItem = $("#" + uiItem.attr("id") + "Collapsed");
					collapsedItem.show();

					// Decreasing collapsed divs widths.
					var collapsedDivs = $("div[expanded=false]");
					for ( var i = 0; i < collapsedDivs.length; i++) {
						$(collapsedDivs[i]).width(collapsedWidth + "%");
					}

					// Increasing expanded divs widths.
					var expandedDivs = $("div[expanded=true]");
					var expandedCount = expandedDivs.length;
					var widthToSet = (totWidth - ((4 - expandedCount) * collapsedWidth))
							/ expandedCount;
					for ( var i = 0; i < expandedDivs.length; i++) {
						$(expandedDivs[i]).width(widthToSet + "%");
					}
				});
