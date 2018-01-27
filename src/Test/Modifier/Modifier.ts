import { Die } from '../../Die/Die';
import { assert } from 'chai';
import { expect } from 'chai';
import 'mocha';
import { Modifier } from "../../Check/Modifier/Modifier";
import { Check } from "../../Check/Check";
import { TestCore } from "../TestCore";


describe( 'Modifier', () => {

    let m : Modifier;

    class MyModifier extends Modifier {
        applyTo( check: Check ): void { }
        getType(): string { return 'MyModifier'; }
    }

    it( 'is a base abstract class and cannot be invoked directly', () => {

        expect( () => new Modifier( 'Name', 10 ) ).to.throw;
    })

    it ( 'is is applied to the "after" phase of the check, unless modified.  It should report its phase.', () => {

        m = new MyModifier( 'Name', 10 );
        expect( m.getPhase() ).to.be.equal( 'after' );

        m.setPhase( 'before' );
        expect( m.getPhase() ).to.be.equal( 'before' );
    });

    it ( 'should report modifier values, as well as allow for adjustment', () => {

        let modifierValue = TestCore.randomInt();
        let newModifierValue = TestCore.randomInt();

        m = new MyModifier( 'Name', modifierValue );
        expect( Number( m.getValue() ) ).to.be.equal( modifierValue );

        m.setValue( newModifierValue );
        expect( Number( m.getValue() ) ).to.be.equal( newModifierValue );
    });

    it ( 'should report its name, which is defined on invocation', () => {

        let name = 'Name';

        m = new MyModifier( name, 10 );
        expect( m.getName() ).to.be.equal( name );
    });

});
