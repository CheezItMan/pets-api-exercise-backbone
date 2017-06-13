import Backbone from 'backbone';

var PetView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;

    this.listenTo(this.model, "change", this.render);
  },
  events: {
    "click": "showDetails"
  },
  render: function() {
    var compiledTemplate = this.template({pet: this.model.toJSON()});
    this.$el.html(compiledTemplate);
    return this;
  },
  showDetails: function(event) {
    this.trigger("selected", this.model);
  }

});

export default PetView;
