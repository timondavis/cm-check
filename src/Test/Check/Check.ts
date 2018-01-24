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

        c.check();

        expect( c.getResult() ).to.be.equal( 14 );

    });

});