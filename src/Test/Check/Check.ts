import { expect } from 'chai';
import 'mocha';
import { Check, CheckReport } from "../../Check/Check";
import { ResultModifier } from "../../Check/Modifier/ResultModifier";
import { TestCore } from "../TestCore";
import {DieModifier} from "../../Check/Modifier/DieModifier";
import {TargetModifier} from "../../Check/Modifier/TargetModifier";

describe( 'Check', () => {

    let c : Check;

    class MyCheck extends Check {
        getType(): string { return 'MyCheck' }
        protected setCheckDie(): void {}
    }

    it( 'should allow for modifiers to be added', () => {

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
        c.roll();

        let originalResult = c.getDieBag().getTotal();

        c.setResult( c.getResult() + boostResultValueBy );
        expect( c.getRawRollResult() ).to.be.equal( originalResult );
    });

    it ( 'should do a new roll with each check execution, and should change value within 5 rolls with 5d20', () => {

       c = new MyCheck( 10 );
       c.getDieBag().add( 5, 20 );
       c.roll();

       let firstResult = c.getResult();

       for ( let loopCounter = 0 ; loopCounter < 5 ; loopCounter++ ) {

           c.roll();

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
        c.roll();

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

    it( 'should allow >, <, >=, and <= as test conditions', () => {

        let test1BigNumber = TestCore.randomInt() + 100;
        let test1SmallNumber = TestCore.randomInt( test1BigNumber - 1);

        let test2BigNumber = TestCore.randomInt() + 100;
        let test2SmallNumber = TestCore.randomInt( test2BigNumber - 1);

        let test3BigNumber = TestCore.randomInt() + 100;
        let test3SmallNumber = TestCore.randomInt( test3BigNumber - 1);

        let test4BigNumber = TestCore.randomInt() + 100;
        let test4SmallNumber = TestCore.randomInt( test4BigNumber - 1);

        // Test 1 : >
        c = new MyCheck( test1BigNumber );
        c.setTestCondition( '>' );
        c.setResult( test1SmallNumber );
        expect( c.isPass() ).to.be.false;

        c.setTarget( test1SmallNumber );
        c.setResult( test1BigNumber );
        expect( c.isPass() ).to.be.true;

        // Test 2 : >=
        c = new MyCheck( test2BigNumber );
        c.setTestCondition( '>=' );
        c.setResult( test2SmallNumber );
        expect( c.isPass() ).to.be.false;

        c.setResult( test2BigNumber );
        expect( c.isPass() ).to.be.true;

        c.setTarget( test2SmallNumber );
        c.setResult( test2BigNumber );
        expect( c.isPass() ).to.be.true;

        // Test 3 : <
        c = new MyCheck( test3BigNumber );
        c.setTestCondition( '<' );
        c.setResult( test3SmallNumber );
        expect( c.isPass() ).to.be.true;

        c.setTarget( test3SmallNumber );
        c.setResult( test3BigNumber );
        expect( c.isPass() ).to.be.false;

        // Test 4 : <=
        c = new MyCheck( test4BigNumber );
        c.setTestCondition( '<=' );
        c.setResult( test4SmallNumber );
        expect( c.isPass() ).to.be.true;

        c.setResult( test4BigNumber );
        expect( c.isPass() ).to.be.true;

        c.setTarget( test4SmallNumber );
        c.setResult( test4BigNumber );
        expect( c.isPass() ).to.be.false;
    });

    it ( 'should default to the >= test condition', () => {

        let bigNumber = TestCore.randomInt() + 100;
        let smallNumber = TestCore.randomInt( bigNumber );

        c = new MyCheck( smallNumber );
        c.setResult( bigNumber );
        expect( c.isPass() ).to.be.true;

        c.setResult( smallNumber );
        expect( c.isPass() ).to.be.true;

        c.setResult( smallNumber - 1 );
        expect( c.isPass() ).to.be.false;
    });

    it ( 'should not accept any test conditions beyond the accepted >, <, >=, and <=', () => {

        c = new MyCheck( TestCore.randomInt() );

        expect( () => c.setTestCondition( 'hello' ) ).to.throw;
        expect( () => c.setTestCondition( '<<' ) ).to.throw;
        expect( () => c.setTestCondition( '<!' ) ).to.throw;
    });

    it ( 'should create a 0-target default instance when no target number is provided in the constructor', () => {

        c = new MyCheck();
        expect( c.getTarget() ).to.be.equal( 0 );
    });

    it ( 'should allow for adding and removing die from the check\'s die bag on the fly', () => {

        let bigNumber = TestCore.randomInt() + 1;
        let smallNumber = TestCore.randomInt( bigNumber ) - 1;
        let sides = TestCore.randomInt();

        c = new MyCheck();
        c.addDie( bigNumber, sides );
        c.removeDie( smallNumber, sides );

        expect( c.getDieBag().getDieWithSides( sides ) ).to.have.length( bigNumber - smallNumber );
    });

    it ('can be serialized and deserialized', () => {
        for (let cycle = 0 ; cycle < 500 ; cycle++) {
            let sidesCount = new Map<number, number>();
            let targetNumber = TestCore.randomInt(10000);
            let testCondition = '>';
            let check = new Check();

            check.setTarget(targetNumber);
            check.setTestCondition(testCondition);

            for (let i = 0 ; i < TestCore.randomInt(10) + 10 ; i++) {
                let sides = TestCore.randomInt(100);
                let count = TestCore.randomInt(100);

                if (sidesCount.has(sides)) {
                    sidesCount.set(sides, sidesCount.get(sides) + count);
                } else {
                    sidesCount.set(sides, count);
                }

                check.addDie(sides, count);
            }

            let dieModifiers = [];
            for (let i = 0 ; i < TestCore.randomInt(3) ; i++) {
                let m = new DieModifier();
                m.setPhase('dm');
                m.setName('dm-' + i.toString());
                m.setValue(TestCore.randomInt(10));
                check.addModifier(m);
            }

            let resultModifiers = [];
            for (let i = 0 ; i < TestCore.randomInt(3) ; i++) {
                let m = new ResultModifier;
                m.setPhase('rm');
                m.setName('rm-' + i.toString());
                m.setValue(TestCore.randomInt(10));
                check.addModifier(m);
            }

            let targetModifiers = [];
            for (let i = 0 ; i < TestCore.randomInt(3) ; i++) {
                let m = new TargetModifier();
                m.setPhase('tm');
                m.setName('tm-' + i.toString());
                m.setValue(TestCore.randomInt(10));
                check.addModifier(m);
            }

            let serializedCheck = Check.serialize(check);
            let unserializedCheck = Check.deserialize(serializedCheck);

            let usDieBag = unserializedCheck.getDieBag();
            let usTargetNumber = unserializedCheck.getTarget();
            let usTestCondition = unserializedCheck.getTestCondition();
            let usModifiers = unserializedCheck.getModifiers();

            Object.keys(usDieBag).forEach((sides) => {
                expect(sidesCount.get(Number.parseInt(sides))).to.be.equal(usDieBag[sides].length);
                sidesCount.delete(Number.parseInt(sides));
            });

            expect(usTargetNumber).to.be.equal(targetNumber);
            expect(usTestCondition).to.be.equal(testCondition);

            usModifiers.forEach((modifier) => {
                switch(modifier.getType()) {
                    case('die'): {
                        let i = dieModifiers.find(p => p.getName() == modifier.getName());
                        expect(i.getName()).to.be.equal('dm-' + 1);
                        expect(i.getValue()).to.be.equal(dieModifiers[i]);
                        expect(i.getPhase()).to.be.equal('dm');
                        break;
                    }
                    case('target'): {
                        let i = targetModifiers.find(p => p.getName() == modifier.getName());
                        expect(i.getName()).to.be.equal('tm-' + 1);
                        expect(i.getValue()).to.be.equal(dieModifiers[i]);
                        expect(i.getPhase()).to.be.equal('tm');
                        break;
                    }
                    case('result'): {
                        let i = resultModifiers.find(p => p.getName() == modifier.getName());
                        expect(i.getName()).to.be.equal('km-' + 1);
                        expect(i.getValue()).to.be.equal(dieModifiers[i]);
                        expect(i.getPhase()).to.be.equal('rm');
                        break;
                    }
                    default:
                        throw "invalid status";
                        break;
                }
            })
        }
    })
});
