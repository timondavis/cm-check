import 'mocha';
import { expect } from "chai";
import { DieModifier } from "../../Check/Modifier/DieModifier";
import { CheckExecutor } from "../../Check/CheckExecutor";
import { Check } from "../../Check/Check";
import { TestCore } from "../TestCore";
import { DieBag } from "../../Die/DieBag";

describe( 'DieModifier', () => {

    let c : Check;
    let CE = CheckExecutor.getInstance();

    class MyCheck extends Check {
        getType(): string { return 'MyCheck'; }
        protected setBaseDieBag(): void { }
    }

    it( 'should be applied after the _modifiers hook in the "before" phase, by default', () => {

        let originalDieCount = TestCore.randomInt();
        let originalDieSides = TestCore.randomInt();

        let newDieCount = TestCore.randomInt();
        let newDieSides : number;

        do {
            newDieSides = TestCore.randomInt();
        } while ( newDieSides === originalDieSides );

        c = new MyCheck( TestCore.randomInt() );

        c.getDieBag().add( originalDieCount, originalDieSides );

        c.addModifier( new DieModifier( 'Die Modifier', DieBag.encodeDieString( newDieCount, newDieSides )));
        CE.on( c.getType() + '_roll', ( check : Check ) => {
            expect( check.getDieBag().getDieWithSides( newDieSides ) ).to.have.length( newDieCount );
        });

        CE.execute( c );
        CE.removeAllListeners( c.getType() + '_roll' );
    });

    it( 'should allow for modifying die after the roll as well, affecting the result' , () => {

        let originalDieCount = TestCore.randomInt();
        let originalDieSides = TestCore.randomInt();

        let originalDieString = DieBag.encodeDieString( originalDieCount, originalDieSides );
        let m = new DieModifier( 'Die Modifier', [originalDieString] );
        m.setPhase( 'after' );

        c = new MyCheck( TestCore.randomInt() );
        c.addModifier( m );

        CE.execute( c );

        expect( c.getResult() ).to.not.be.equal( 0 );
        expect( c.getResult() ).to.not.be.equal( c.getRawRollResult() );
        expect( c.getRawRollResult() ).to.be.equal( 0 );

        let r = c.report( false );

        expect( TestCore.countTotalValuesOfDieInBag( c.getDieBag(), String( originalDieSides ) ) )
            .to.be.equal( c.getResult() );
    });

    it( 'should allow 1 to many die sets to be added with one modifier', () => {

        let dieDefinitions = TestCore.generateDieDefinitions();
        let dieDefinitionStrings : string[] = [];

        let singleDieSides = TestCore.randomInt();
        let singleDieCount = TestCore.randomInt();

        // Create a check and apply modifier with multiple values
        c = new MyCheck( TestCore.randomInt() );

        for( let dieDefinitionIndex = 0 ; dieDefinitionIndex < dieDefinitions.length ; dieDefinitionIndex++ ) {

            dieDefinitionStrings.push(
                String( dieDefinitions[ dieDefinitionIndex ][0] ) + 'd' +
                String( dieDefinitions[ dieDefinitionIndex ][1] )
            );
        }

        c.addModifier( new DieModifier( 'Die Modifier', dieDefinitionStrings ) );

        CE.execute( c );

        for ( let dieDefinitionIndex = 0 ; dieDefinitionIndex < dieDefinitions.length ; dieDefinitionIndex++ ) {

            expect( c.getDieBag().getDieWithSides( dieDefinitions[ dieDefinitionIndex ][1] ) )
                .to.have.length( dieDefinitions[ dieDefinitionIndex ][0] );
        }

        expect( TestCore.countTotalValuesOfDieInBag( c.getDieBag() )).to.be.equal( c.getResult () );

        // Create a check and apply modifier with single value
        c = new MyCheck( TestCore.randomInt() );
            c.addModifier( new DieModifier( 'Die Modifier', DieBag.encodeDieString( singleDieCount, singleDieSides )
        ));

        CE.execute( c );
        expect( c.getDieBag().getDieWithSides( singleDieSides ) ).to.have.length( singleDieCount );
        expect( TestCore.countTotalValuesOfDieInBag( c.getDieBag() ) ).to.be.equal( c.getResult() );
    });

    it( 'should decode XdY values and add as many die to the check', () => {

        let randomSides = TestCore.randomInt();
        let randomCount = TestCore.randomInt();
        let randomDieDefine = String( randomCount ) + 'd' + String( randomSides );

        c = new MyCheck( TestCore.randomInt() );
        c.addModifier( new DieModifier( 'Die modifier', randomDieDefine ) );

        CE.execute( c );

        expect( c.getDieBag().getDieWithSides( randomSides ) ).to.have.length( randomCount );
    });

    it( 'should report values in XdY format',  () => {

        let dieCount = TestCore.randomInt();
        let dieSides = TestCore.randomInt();

        let dieString = String( dieCount ) + 'd' + String( dieSides );

        let m = new DieModifier( 'Die String', dieString );

        expect( String( m.getValue() ) ).equals( dieString );
    });

    it ( 'should support adding OR removing die from the check', () => {

        let dieAddedCount = TestCore.randomInt();
        let dieAddedSides = TestCore.randomInt();

        let dieRemovedCount = TestCore.randomInt( dieAddedCount );

        c = new MyCheck( TestCore.randomInt() );
        c.addModifier( new DieModifier( 'Die Modifier', [
            String( dieAddedCount ) + 'd' + String( dieAddedSides ),
            '-' + String( dieRemovedCount ) + 'd' + String( dieAddedSides )
        ]));

        CE.execute( c );

        expect( c.getDieBag().getDieWithSides( dieAddedSides ) )
            .to.have.length( dieAddedCount - dieRemovedCount );
    });

});
