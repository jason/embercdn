App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.route('how');
  this.route('advantage');
  this.resource('plans', function() {
    this.resource('plan', { path: ':plan_id'});
  });
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return App.Plan.find();
  }
});
//App.PlansRoute = Ember.Route.extend({
//   model: function() {
//     return App.Plan.find();
//   }  
//});
//App.ApplicationController = Ember.Controller.extend({
//  currentSidebarContent: 'intro',

//   changeSidebarContent: function() {
//     this.render({ outlet: this.get('currentSidebarContent'); });

//   }.property('currentSidebarContent')
// });
App.IndexRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('intro', { outlet: 'intro' });
   }
 });
App.HowRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('how', { outlet: 'how' });
  }
});
App.AdvantageRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('advantage', { outlet: 'advantage' });
  }
});

 App.ApplicationController = Ember.ObjectController.extend({
   showPlan: function(evt) {
      var plandata = App.Plan.find(evt.id);
      this.set('transfer', plandata.get('transfer'));
      this.set('storage', plandata.get('storage'));
      this.set('price', plandata.get('price'));
      $('#plans').hide();
      $('#plan').show();
   }

 });

App.PlansController = Ember.ObjectController.extend({
  // initial value
  isExpanded: false,

  expand: function() {
    this.set('isExpanded', true);
  },

  contract: function() {
    this.set('isExpanded', false);
  }
});

App.Store = DS.Store.extend({
    revision: 12,
    adapter: 'DS.FixtureAdapter'
});

App.Plan = DS.Model.extend({
  transfer: DS.attr('number'),
  storage: DS.attr('number'),
  price: DS.attr('number')
});

App.Plan.FIXTURES = [{
  id: 1,
  transfer: 50,
  storage: 1,
  price: 100
}, {
  id: 2,
  transfer: 150,
  storage: 10,
  price: 250
}, {
  id: 3,
  transfer: 500,
  storage: 25,
  price: 500
}];
