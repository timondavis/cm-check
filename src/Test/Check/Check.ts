import { expect } from 'chai';
import 'mocha';
import { Check, CheckReport } from "../../Check/Check";
import { ResultModifier } from "../../Check/Modifier/ResultModifier";

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

        c = new MyCheck( 10 );
        c.getDieBag().add( 1, 20, 9 );
        c.getDieBag().dieMap['20'][0].setLock( true );
        c.addModifier( new ResultModifier( 'result-boost', 5 ) );

        let modifiers = c.getModifiers();

        expect ( modifiers[0].getName() == 'result-boost' );
    });

    it ( 'should report pass/fail accurately', () => {

        c = new MyCheck( 10 );

        c.setResult( 9 );
        expect( c.isPass() ).to.be.false;

        c.setResult( 10 );
        expect( c.isPass() ).to.be.true;

        c.setResult( 11 );
        expect( c.isPass() ).to.be.true;

        c.setTarget( 20 );

        c.setResult( 19 );
        expect( c.isPass() ).to.be.false;

        c.setResult( 20 );
        expect( c.isPass() ).to.be.true;

        c.setResult( 21 );
        expect( c.isPass() ).to.be.true;
    });

    it ( 'should retain its original roll value, even after its official result has been modified', () => {

       c = new MyCheck( 10 );
       c.getDieBag().add( 5, 20 );
       c.check();

       let originalResult = c.getDieBag().getTotal();

       c.setResult( c.getResult() + 15 );

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

        c = new MyCheck( 10 );
        let total = 0;
        let report : CheckReport;

        c.setTarget( 36 );
        c.getDieBag().add( 6, 4 );
        c.getDieBag().add( 6, 6 );
        c.getDieBag().add( 6, 8 );
        c.getDieBag().add( 6, 10 );
        c.getDieBag().add( 6, 12 );
        c.getDieBag().add( 6, 20 );

        c.addModifier( new ResultModifier( 'M1', 1 ));

        c.check();

        report = c.report( false );

        Object.keys( report.dieBag ).forEach( ( dieSides:string ) => {

            for ( let dieIndex = 0 ; dieIndex < report.dieBag.dieMap[dieSides] ; dieIndex++ ) {

            }
        });

        expect( report.isPass ).to.be.true;
        expect( report.target ).to.be.equal( 36 );




    });



});