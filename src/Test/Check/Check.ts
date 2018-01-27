import { expect } from 'chai';
import 'mocha';
import { Check, CheckReport } from "../../Check/Check";
import { ResultModifier } from "../../Check/Modifier/ResultModifier";
import { TestCore } from "../TestCore";

describe( 'Check', () => {

    let c : Check;

    class MyCheck extends Check {
        getType(): string { return 'MyCheck' }
        protected setBaseDieBag(): void {}
    }

    it( 'should not be directly instantiable', () => {

        expect( () => new Check() ).to.throw();
    });

    it( 'should allow for modifers to be added', () => {

        let sides = TestCore.randomInt();
        let dieValue = TestCore.randomInt( sides );
        let modValue = TestCore.randomInt();

        c = new MyCheck( TestCore.randomInt() );
        c.getDieBag().add( TestCore.randomInt(), sides, dieValue );
        c.addModifier( new ResultModifier( 'result-boost', modValue ));

        let modifiers = c.getModifiers();

        expect( modifiers[0].getName()).to.be.equal( 'result-boost' );
        expect( modifiers[0].getValue()).to.be.equal( modValue );
    });

    it ( 'should report pass/fail accurately', () => {

        let target = TestCore.randomInt();

        c = new MyCheck( target );

        c.setResult( target - 1 );
        expect( c.isPass() ).to.be.false;

        c.setResult( target );
        expect( c.isPass() ).to.be.true;

        c.setResult( target + 1 );
        expect( c.isPass() ).to.be.true;
    });

    it ( 'should retain its original roll value, even after its official result has been modified', () => {

        let target = TestCore.randomInt();
        let sides = TestCore.randomInt();
        let count = TestCore.randomInt();
        let boostResultValueBy = TestCore.randomInt();

        c = new MyCheck( target );
        c.getDieBag().add( sides, count );
        c.check();

        let originalResult = c.getDieBag().getTotal();

        c.setResult( c.getResult() + boostResultValueBy );
        expect( c.getRawRollResult() ).to.be.equal( originalResult );
    });

    it ( 'should do a new roll with each check execution, and should change value within 5 rolls with 5d20', () => {

       c = new MyCheck( 10 );
       c.getDieBag().add( 5, 20 );
       c.check();

       let firstResult = c.getResult();

       for ( let loopCounter = 0 ; loopCounter < 5 ; loopCounter++ ) {

           c.check();

           if ( firstResult != c.getResult() ) { break; }
       }

       expect( c.getResult() ).to.not.be.equal( firstResult );
    });

    it( 'should deliver accurate status reporting', () => {

        let total = 0;
        let count = TestCore.randomInt();
        let target = TestCore.randomInt();
        let modifierValue = TestCore.randomInt();
        let dieDefinitions = TestCore.generateDieDefinitions();
        let report : CheckReport;

        c = new MyCheck( target );

        TestCore.addDieToBagWithDefinitions( dieDefinitions, c.getDieBag() );
        c.addModifier( new ResultModifier( 'M1', modifierValue ));
        c.check();

        report = c.report( false );

        for ( let definitionIndex = 0 ; definitionIndex < dieDefinitions.length ; definitionIndex++ ){

            expect( report.dieBag.dieMap[ String( dieDefinitions[ definitionIndex ][1]) ] )
                .to.have.lengthOf( dieDefinitions[ definitionIndex ][0] );
        }

        expect( report.isPass ).to.be.true;
        expect( report.target ).to.be.equal( target );
        expect( report.modifiers ).has.length( 1 );
        expect( report.modifiers[0].getName() ).to.be.equal( 'M1' );
        expect( report.modifiers[0].getValue() ).to.be.equal( modifierValue );
        expect( report.result ).to.be.equal( TestCore.countTotalValuesOfDieInBag( c.getDieBag() ) );

    });
});