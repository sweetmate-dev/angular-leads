import {Edit_brokerModule} from './edit_broker'
import {Edit_brokerController} from './edit_broker.controller';
import {Edit_broker} from './edit_broker.directive';
import template from './edit_broker.html';

describe('Edit_broker', ()=>{
  let $rootScope,
  makeController;

  beforeEach(window.module(Edit_brokerModule.name));
  beforeEach(inject((_$rootScope_)=>{
    $rootScope = _$rootScope_;
    makeController = ()=>{
      return new Edit_brokerController();
    };
  }));

  describe('Module', ()=>{
    // test things about the component module
    // checking to see if it registers certain things and what not
    // test for best practices with naming too
    // test for routing
  });

  describe('Controller', ()=>{
    // test your controller here

    it('should have a name property [REMOVE]', ()=>{ // erase me if you remove this.name from the controller
      let controller = makeController();

      expect(controller).to.have.property('name');
    });
  });

  describe('Template', ()=>{
    // test the template
    // use Regexes to test that you are using the right bindings {{  }}

    it('should have name in template [REMOVE]', ()=>{
      expect(template).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });


  describe('Component', ()=>{
      // test the component/directive itself
      let component = Edit_broker();

      it('should use the right template',()=>{
        expect(component.template).to.equal(template);
      });

      it('should use controllerAs', ()=>{
        expect(component).to.have.property('controllerAs');
      });

      it('should use the right controller', ()=>{
        expect(component.controller).to.equal(Edit_brokerController);
      });
  });
});





