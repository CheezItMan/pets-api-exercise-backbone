import Backbone from 'backbone';

import Pet from 'app/models/pet';

var PetList = Backbone.Collection.extend({
  model: Pet,
  url: "http://localhost:3000/pets",
  parse: function(data) {
    return data;
  },
  nonEmptyNames: function() {
    var filtered = this.filter(function(pet) {
      var name = pet.get("name");
      return name !== "" && name !== undefined && name !== null;
    });
    return new PetList(filtered);
  }
});

export default PetList;
