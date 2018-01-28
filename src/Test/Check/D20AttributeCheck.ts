import { D20AttributeCheck } from '../../Check/D20AttributeCheck';
import { CheckExecutor } from "../../Check/CheckExecutor";
import { expect } from 'chai';
import 'mocha';
import { TestCore } from "../TestCore";


describe( 'D20AttributeCheck', () => {

    let c : D20AttributeCheck;
    let CE = CheckExecutor.getInstance();

    it( 'should roll with 1d20 by default', () => {

        let attributeValue = TestCore.randomInt( 25 );
        let originalTarget = TestCore.randomInt();

        c = new D20AttributeCheck( attributeValue, originalTarget, 'Strength' );

        expect( c.getDieBag().getDieWithSides( 20 ) ).to.have.length( 1 );
    });

    it( 'should create a result modifier based on attribute', () => {

        c = new D20AttributeCheck( TestCore.randomInt( 20 ), 10, 'Intelligence' );

        let modifiers = c.getModifiers();

        expect( modifiers ).to.have.length( 1 );
        let modifierValue = modifiers[0].getValue();

        CE.execute( c );

        expect( c.getResult() ).to.be.equal( c.getRawRollResult() + Number( modifierValue )  );
    });

    it( 'should automatically convert attribute values into standard attribute modifiers according to D20 system', () => {

        c = new D20AttributeCheck( 10, 0, 'Int' );
        expect( Number( c.getModifiers()[0].getValue() ) ).to.be.equal( -3 );

        c = new D20AttributeCheck( 10, 10, 'Int' );
        expect( Number( c.getModifiers()[0].getValue() ) ).to.be.equal( 0 );

        c = new D20AttributeCheck( 10, 19, 'Int' );
        expect( Number( c.getModifiers()[0].getValue() ) ).to.be.equal( 3 );

        c = new D20AttributeCheck( 10, 20, 'Int' );
        expect( Number( c.getModifiers()[0].getValue() ) ).to.be.equal( 3 );

        c = new D20AttributeCheck( 10, 21, 'Int' );
        expect( Number( c.getModifiers()[0].getValue() ) ).to.be.equal( 3 );

        c = new D20AttributeCheck( 10, 22, 'Int' );
        expect( Number( c.getModifiers()[0].getValue() ) ).to.be.equal( 4 );

        c = new D20AttributeCheck( 10, 30, 'Int' );
        expect( Number( c.getModifiers()[0].getValue() ) ).to.be.equal( 6 );

        c = new D20AttributeCheck( 10, 43, 'Int' );
        expect( Number( c.getModifiers()[0].getValue() ) ).to.be.equal( 11 );

        c = new D20AttributeCheck( 10, 45, 'Int' );
        expect( Number( c.getModifiers()[0].getValue() ) ).to.be.equal( 11 );

        c = new D20AttributeCheck( 10, 46, 'Int' );
        expect( Number( c.getModifiers()[0].getValue() ) ).to.be.equal( 12 );
    });

    it( 'should allow the attribute value of the check to be updated and translated to the core modifier value', () => {

        c = new D20AttributeCheck( 10, 10 );
        expect( c.getModifiers()[0].getValue() ).to.be.equal( 0 );

        c.setAttributeValue( 13 );
        expect( c.getModifiers()[0].getValue() ).to.be.equal( 1 );
    });
});