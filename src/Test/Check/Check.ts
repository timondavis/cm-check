import { expect } from 'chai';
import 'mocha';
import { Check } from "../../Check/Check";
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

        c.setTarget(20);

        c.setResult( 19 );
        expect( c.isPass() ).to.be.false;

        c.setResult( 20 );
        expect( c.isPass() ).to.be.true;

        c.setResult( 21 );
        expect( c.isPass() ).to.be.true;
    });

});