import $ from 'jquery';
import _ from 'underscore';

import PetList from 'app/collections/pet_list';
import PetListView from 'app/views/pet_list_view';

var myPetList = new PetList({});

var myPetListView = new PetListView({
  model: myPetList,
  template: _.template($('#pet-card-template').html()),
  el: 'main',
  detailsTemplate: _.template($('#pet-info-template').html()),
  newPetTemplate:  _.template($('#new-pet-template').html())
});

$(document).ready(function() {

  myPetListView.render();

});
