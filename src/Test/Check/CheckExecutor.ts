import { expect } from 'chai';
import 'mocha';
import { CheckExecutor } from "../../Check/CheckExecutor";
import { Check } from "../../Check/Check";
import { TestCore } from "../TestCore";
import { ResultModifier } from "../../Check/Modifier/ResultModifier";
import { Modifier } from "../../Check/Modifier/Modifier";

describe( 'CheckExecutor', () => {

    let CE = CheckExecutor.getInstance();
    let c : Check;

    class MyCheck extends Check {
        getType(): string { return 'MyCheck' }
        protected setCheckDie(): void { }
    }

    class MyResultModifier extends Modifier {
        constructor( name : string, value : number | string | number[] | string ) {

            super( name, value );
            this.setPhase( 'after' );
        }
        getType(): string { return 'MyResultModifier'; }
        applyTo( check: Check ): void { check.setResult( check.getResult() + Number( this.getValue() )); }
    }

    class MyTargetModifier extends Modifier {
        constructor( name : string, value : number | string | number[] | string ) {

            super( name, value );
            this.setPhase( 'before' );
        }

        getType() : string { return 'MyTargetModifier'; }
        applyTo( check: Check ) : void { check.setTarget( check.getTarget() + Number( this.getValue() )); }
    }


    it( 'should apply registered modifiers in the before and after roll phases correctly', () => {

        let originalTarget : number = TestCore.randomInt();

        let resultModifierCount : number;
        let resultModifierValue : number;
        let totalResultModifierValue : number = 0;

        let targetModifierCount : number;
        let targetModifierValue : number;
        let totalTargetModifierValue : number = 0;

        c = new MyCheck( originalTarget );

        for ( resultModifierCount = 0 ; resultModifierCount < TestCore.randomInt( 100 ) ; resultModifierCount++ ) {

            resultModifierValue = TestCore.randomInt();
            c.addModifier( new MyResultModifier( 'RM' + String( resultModifierCount ), resultModifierValue ));
            totalResultModifierValue += resultModifierValue;
        }

        for ( targetModifierCount = 0 ; targetModifierCount < TestCore.randomInt( 100 ) ; targetModifierCount++ ) {

            targetModifierValue = TestCore.randomInt();
            c.addModifier( new MyTargetModifier( 'M' + String( targetModifierCount ), targetModifierValue ));
            totalTargetModifierValue += targetModifierValue;
        }

        CE.execute( c );

        expect( c.getTarget() ).to.be.equal( originalTarget + totalTargetModifierValue );
        expect( c.getResult() ).to.be.equal( c.getRawRollResult() + totalResultModifierValue );
    });

    it ( 'should process 3rd party _modifiers hooks before the modifiers and the roll are applied in the before' +
        ' phase',
        () => {

        let originalTarget : number = TestCore.randomInt();

        c = new MyCheck( originalTarget );
        c.addModifier( new MyTargetModifier( '1', TestCore.randomInt() ));
        c.addModifier( new MyTargetModifier( '2', TestCore.randomInt() * -1 ));
        c.addModifier( new MyTargetModifier( '3', TestCore.randomInt() ));

        CE.on( c.getType() + '_modifiers', ( check : Check, phase : string ) => {

            if ( phase !== 'before' ) { return; }
            let m = check.getModifiers();
            m.pop();  m.pop(); m.pop();
        });

        CE.execute( c );
        expect( c.getTarget() ).to.be.equal( originalTarget );

        c.addModifier( new MyTargetModifier( '1', TestCore.randomInt() ));
        c.addModifier( new MyTargetModifier( '2', TestCore.randomInt() * -1 ));
        c.addModifier( new MyTargetModifier( '3', TestCore.randomInt() ));

        CE.execute( c );
        expect( c.getTarget() ).to.be.equal( originalTarget );

        CE.removeAllListeners( c.getType() + '_modifiers' );
    });

    it ( 'should process 3rd party _roll hooks after the modifiers have been applied, but before the roll', () => {

        let originalTarget : number = TestCore.randomInt();
        let targetBoost : number = TestCore.randomInt();
        let newTarget : number = TestCore.randomInt();
        let randomResult : number = TestCore.randomInt();

        c = new MyCheck( originalTarget );

        c.addModifier( new MyTargetModifier( 'boost', targetBoost ));

        CE.on( c.getType() + '_roll', ( check : Check, phase : string ) => {

            if ( phase !== 'before' ) { return; }
            check.setTarget( newTarget );
            check.setResult( randomResult );
        });

        CE.execute( c );

        expect( c.getResult() ).to.be.equal( 0 );
        expect( c.getTarget() ).to.be.equal( newTarget );

        CE.execute( c );

        expect( c.getResult() ).to.be.equal( 0 );
        expect( c.getTarget() ).to.be.equal( newTarget );

        CE.removeAllListeners(  c.getType() + '_roll' );
    });

    it ( 'should process 3rd party _modifiers hooks before modifiers are applied but after the roll in the after' +
        ' phase', () => {

        let originalTarget : number = TestCore.randomInt();

        c = new MyCheck( originalTarget );
        c.getDieBag().add( TestCore.randomInt(), TestCore.randomInt() );

        c.addModifier( new MyResultModifier( '1', TestCore.randomInt() ));
        c.addModifier( new MyResultModifier( '2', TestCore.randomInt() ));
        c.addModifier( new MyResultModifier( '3', TestCore.randomInt() ));

        CE.on( c.getType() + '_modifiers', ( check : Check, phase : string ) => {

            let m = check.getModifiers();
            m.pop(); m.pop(); m.pop();
        });

        CE.execute( c );

        expect( c.getResult() ).to.be.equal( c.getRawRollResult() );

        CE.removeAllListeners( c.getType() + '_modifiers' );
    });

    it ( 'should process 3rd party _finish hooks after die have been rolled and modifiers applied', () => {

        let originalTarget : number = TestCore.randomInt();

        let sides : number = TestCore.randomInt();
        let count : number = TestCore.randomInt();

        let modifier1 = new MyResultModifier( '1', TestCore.randomInt() );
        let modifier2 = new MyResultModifier( '2', TestCore.randomInt() );
        let modifier3 = new MyResultModifier( '3', TestCore.randomInt() );

        let lastModifier : number = TestCore.randomInt();

        let totalModification =
            Number( modifier1.getValue() ) +
            Number( modifier2.getValue() ) +
            Number( modifier3.getValue() ) +
            lastModifier;

        c = new MyCheck( originalTarget );

        c.getDieBag().add( count, sides );

        c.addModifier( modifier1 );
        c.addModifier( modifier2 );
        c.addModifier( modifier3 );

        CE.on( c.getType() + '_finish', ( check: Check, phase: string ) => {

            if ( phase != 'after' ) { return; }
            check.setResult( check.getResult() + lastModifier );
        });

        CE.execute( c );

        expect( c.getResult() ).to.be.equal( c.getRawRollResult() + totalModification );

        CE.removeAllListeners( c.getType() + '_finish' );
    });

    it ( 'should facilitate registration and generation of any registered check type', () => {

        CE.registerCheckType( 'my', () => { return new MyCheck() } );

        c = CE.generateCheck( 'my' );
        c.getDieBag().add( TestCore.randomInt(), TestCore.randomInt() );

        CE.execute( c );

        expect( c.getResult() ).to.not.be.equal( 0 );
    });

    it ( 'should accept and list registered check types', () => {

        CE.registerCheckType( 'MyCheck', () => { return new MyCheck() } );

        expect( CE.getCheckTypes().indexOf( 'MyCheck' ) ).to.not.be.equal( -1 );

        c = CE.generateCheck( 'MyCheck' );
        c.addDie( TestCore.randomInt(), TestCore.randomInt() );
        c.setTarget( 10 );
        expect( c.getType() ).to.be.equal( 'MyCheck' );

        CE.execute( c );
        expect( c.getResult() ).not.to.be.equal( 0 );
    });

});