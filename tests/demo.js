define(['../backbone.view.collection','backbone','jquery'], function(CollectionView, Backbone, $) {

	var Collection = Backbone.Collection.extend({
		comparator: 'id',

		resort: function(comparator, options) {
			this.comparator = comparator;
			return this.sort(options);
		}
	});

	var collection = window.collection = new Collection ([
		{ id: 1, name: 'banana' },
		{ id: 2, name: 'apple' },
		{ id: 3, name: 'watermelon' },
		{ id: 4, name: 'pineapple' },
	]);

	var SortableCollection = CollectionView.extend({
		itemData: function(model) {
			var defer = $.Deferred(),
				data = model.attributes;

			setTimeout(_.partial(defer.resolve, data), 1000 * 1/model.get('id'));

			return defer;
		},

		itemTemplate: function(data) {
			return '<li id="'+ data.id +'"> id: ' + data.id +' - <span data-id="'+data.id+'">' + data.name +'</span></li>';
		},

		itemView: Backbone.View.extend({
			events: {
				'click span': 'lalala',
			},

			lalala: function(e) {
				alert($(e.currentTarget).attr('data-id'));
			}
		})
	});


	window.fruits = new SortableCollection({
		el: $('body'),
		container: $('#list'),
		collection: collection,
	});

});