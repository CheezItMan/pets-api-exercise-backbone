import Backbone from 'backbone';

import PetView from './pet_view';

var PetListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.detailsTemplate = params.detailsTemplate;
    this.newPetTemplate = params.newPetTemplate;
    this.$('#pet').hide();

    this.listenTo(this.model, "update", this.render);

    var that = this;
    this.model.fetch();

  },
  events: {
    "click .alert": "deletePet",
    "click #savePet": "savePet",
    "click #updateButton": 'updatePet'
  },
  updatePet: function() {
    let checked = this.$('input[name="vaccinated"]').is(":checked");
    this.detailsPet.set("vaccinated", checked);
    this.detailsPet.save();

    this.$("#pet").hide();
  },
  getPetForm: function() {
    var formName = this.$('#petName').val();
    this.$('#petName').val('');

    var formBreed = this.$('#petBreed').val();
    this.$('#petBreed').val('');

    var formAge = this.$('#petAge').val();
    this.$('#petAge').val('');

    var formChecked = this.$('#newPetVaccinated').is(":checked");

    return {
      name: formName,
      age: formAge,
      breed: formBreed,
      vaccinated: formChecked
    };
  },
  savePet: function(e) {
    e.preventDefault();
    this.model.create(this.getPetForm());
  },
  deletePet: function() {
    if (this.detailsPet) {
      this.detailsPet.destroy();
      this.$('#pet').hide();
      this.detailsPet = undefined;
    }
  },
  render: function() {
    this.$('#pet-list').empty();
    var that = this;
    this.model.nonEmptyNames().each((pet) => {
      var petView = new PetView({
        model: pet,
        template: that.template
      });
      this.$('#pet-list').append(petView.render().$el);
      this.listenTo(petView, "selected", this.showDetails);
    });

    if (that.$('#new-pet').is(':empty')) {
      console.log("empty");
      that.$('#new-pet').empty();
      that.$('#new-pet').html(that.newPetTemplate({}));
    }
    return this;
  },
  showDetails: function(model) {
    this.detailsPet = model;
    var compiledTemplate = this.detailsTemplate({pet: model.toJSON()});
    this.$('#pet').html(compiledTemplate);
    this.$('#pet').show();
  }
});

export default PetListView;
