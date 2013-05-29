App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.route('how');
  this.route('advantage');
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return App.Plan.find();
  }
});

App.IndexRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('intro', { outlet: 'intro' });
   }
 });

App.PlansRoute = Ember.Route.extend({
  model: function() {
    return App.Plan.find();
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
    this.setPlan(evt);
    this.viewPlan();
  },

  setPlan: function(evt) {
    this.set('selectedPlan', App.Plan.find(evt.id));
  },

  viewPlan: function() {
    this.set('planNotPicked', false);
  },
    
  showAllPlans: function() {
    this.set('planNotPicked', true);
  },
    
  planNotPicked: true,

  //cdnSignUp: App.CDNSignup.createRecord();
 });

App.tabView = Ember.View.extend({
  classNameBindings: ['active:openTab:closedTab'],
    active: function() {
      return this.get('childViews.firstObject.active');
  }.property('childViews.firstObject.active')
}),
App.Store = DS.Store.extend({
    adapter: 'DS.RESTAdapter'
});

App.Plan = DS.Model.extend({
  transfer: DS.attr('string'),
  storage: DS.attr('string'),
  price: DS.attr('string'),
  image: DS.attr('string')
});

App.CDNSignup = DS.Model.extend({
  name: DS.attr('string'),
  phone: DS.attr('string'),
  email: DS.attr('string'),
  company: DS.attr('string'),
  plan: DS.attr('string')
});

