import 'mocha';
import { expect } from "chai";
import { CheckExecutor } from "../../Check/CheckExecutor";
import { Check } from "../../Check/Check";
import { TestCore } from "../TestCore";
import { TargetModifier } from "../../Check/Modifier/TargetModifier";

describe( 'TargetModifier', () => {

    let CE = CheckExecutor.getInstance();
    let c : Check;

    class MyCheck extends Check {
        getType(): string { return 'MyCheck'; }
        protected setCheckDie(): void { }
    }

    it( 'affects the result of checks', () => {

        let modification = TestCore.randomInt();
        let initialTarget = TestCore.randomInt();

        c = new MyCheck( initialTarget );
        c.addModifier( new TargetModifier( 'Name', modification ));
        CE.execute( c );
        expect( c.getTarget() ).to.be.equal( initialTarget + modification );

        c = new MyCheck( initialTarget );
        c.addModifier( new TargetModifier( 'Name', modification * - 1 ));
        CE.execute( c );
        expect( c.getTarget() ).to.be.equal( initialTarget + ( modification * -1 ));
    });

    it( 'can process a single or array of numeric string or numeric values', () => {

        let modification1 = TestCore.randomInt();
        let modification2 = TestCore.randomInt();
        let modification3 = TestCore.randomInt();
        let modification4 = TestCore.randomInt();
        let modification5 = -1 * TestCore.randomInt();
        let modification6 = -1 * TestCore.randomInt();
        let modification7 = -1 * TestCore.randomInt();
        let modification8 = -1 * TestCore.randomInt();

        let modificationSum = modification1 + modification2 + modification3 + modification4 +
            modification5 + modification6 + modification7 + modification8;

        let m1 = new TargetModifier( 'Single-Number', modification1 );
        let m2 = new TargetModifier( 'Single-String', String( modification5 ) );
        let m3 = new TargetModifier( 'Multi-Number', [
            modification2,
            modification6
        ]);
        let m4 = new TargetModifier( 'Multi-String', [
            String( modification3 ),
            String( modification4 ),
            String( modification7 ),
            String( modification8 )
        ]);

        let initialTarget = TestCore.randomInt();

        c = new MyCheck( initialTarget );
        c.addModifier( m1 );
        c.addModifier( m2 );
        c.addModifier( m3 );
        c.addModifier( m4 );

        CE.execute( c );

        expect( c.getTarget() ).to.be.equal( initialTarget + modificationSum );
    });

    it( 'should report its typename', () => {

        let modifier = new TargetModifier( 'Name', TestCore.randomInt() );
        expect( modifier.getType() ).to.be.equal( 'target' );
    });
});