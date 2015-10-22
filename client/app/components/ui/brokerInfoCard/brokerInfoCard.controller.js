import states from './states';
import timezones from './timezones';
import find from 'lodash/collection/find';
import map from 'lodash/collection/map';
import reduce from 'lodash/collection/reduce';
import merge from 'lodash/object/merge';
import times from 'lodash/utility/times';
import isEmpty from 'lodash/lang/isEmpty';

class BrokerInfoCardController {
  constructor(Leads, Csv, Headers, $mdToast, $state, Notes) {
    this.name = this.name || 'create';
    this.Leads = Leads;
    this.Csv = Csv;
    this.Notes = Notes;
    this.newNote = {broker: this.broker._id};
    this.Headers = Headers;
    this.states = states;
    this.$mdToast = $mdToast;
    this.timezones = timezones;
    this.$state = $state;
    this.savedStates = {};
    this.broker.leadFilters.detail = this.broker.leadFilters.detail || {
      requestedLoanAmount: {},
      ltv: {},
      rate: {}
    };
    this.notes = [];

    this.loanAmounts = [
      50000,
      100000,
      150000,
      200000,
      300000,
      400000,
      500000,
      600000,
      700000,
      800000,
      900000
    ];

    this.ltvs = times(20, i => {
      const num = i * 5;
      return {
        view: `${num}%`,
        val: num / 100
      };
    });

    this.rates = [];
    for (let i = 0; i <= 12; i += .5) {
      this.rates.push({
        view: `${i}%`,
        val: i
      });
    }
    
    if (this.broker._id) {
      this.getNotes();
    }
  }

  toggleAllStates() {
    this.broker.leadFilters.states = this.broker.leadFilters.states || {};
    const trueStates = {};

    const states = reduce(this.states, (map, state) => {
      map[state.abbrev] = !this.broker.leadFilters.states[state.abbrev];
      return map;
    }, trueStates);

    merge(this.broker.leadFilters.states, states);
  }

  editHeadersForBroker() {
    this.Headers.getHeaderForBroker(this.broker._id)
    .then(header => {
      if (!header || isEmpty(header.fileHeaders)) {
        this.$mdToast.show(
          this.$mdToast.simple()
            .content(`Upload a file for this broker 1st`)
            .position('bottom right')
            .hideDelay(2000)
        );
      } else {
        const file = this.Csv.createFileFromHeaders(header.fileHeaders);
        this.Leads.setActiveFile({
          file,
          broker: this.broker
        });
        this.$state.go('headers');
      }
    });
  }
  
  saveNewNote() {
    this.Notes.create(this.newNote)
    .then(note => {
      this.notes.push(note);
      this.newNote.content = '';
    })
  }
  
  getNotes() {
    this.Notes.getForBroker(this.broker._id)
    .then(notes => {
      this.notes = notes;
    });
  }
}

BrokerInfoCardController.$inject = ['Leads', 'Csv', 'Headers', '$mdToast', '$state', 'Notes'];

export default BrokerInfoCardController;
