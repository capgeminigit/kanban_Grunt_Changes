/*
 * jQuery Editables 1.0.1
 * 
 * Date: Aug 11 2012
 * Source: www.tectual.com.au, www.arashkarimzadeh.com
 * Author: Arash Karimzadeh (arash@tectual.com.au)
 *
 * Copyright (c) 2012 Tectual Pty. Ltd.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($) {

	$.fn.editables = function(options) {

		var opts = $.extend({}, $.fn.editables.options, options);

		if (!$.isArray(opts.freezeOn))
			opts.freezeOn = [ opts.freezeOn ];
		if (!$.isArray(opts.editOn))
			opts.editOn = [ opts.editOn ];

		$('[data-type=editable]', this).each(
				function() {
					var $this = $(this);
					var fn = function(ev) {
						var t = $($this.data('for'));
						// If empty value is given, set back the old value.
						if (t.val().trim() == '') {
							t.val($this.html());
						}
						if (opts.beforeFreeze.call(t, $this, ev) == false)
							return;
						t.hide();
						$this.show();
						t.trigger('onFreeze');
					};
					var evs = {};
					$.each(opts.freezeOn, function() {
						evs[this] = fn;
					});
					$($this.data('for')).hide().bind('onFreeze', opts.onFreeze)
							.bind(evs);

					var fn = function(ev) {
						var t = $($this.data('for'));
						if (opts.beforeEdit.call($this, t, ev) == false)
							return;
						$this.hide();
						t.show().focus();
						$this.trigger('onEdit');
					};
					var evs = {};
					$.each(opts.editOn, function() {
						evs[this] = fn;
					});
					$this.bind('onEdit', opts.onEdit).bind(evs);
				});
		return this;
	};
	$.fn.editables.options = {
		editOn : 'dblclick',
		beforeEdit : $.noop,
		onEdit : $.noop,
		freezeOn : 'blur',
		beforeFreeze : $.noop
	};

})(jQuery);
