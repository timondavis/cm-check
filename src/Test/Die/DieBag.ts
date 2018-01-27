import { DieBag } from '../../Die/DieBag';
import { expect } from 'chai';
import 'mocha';
import { TestCore } from "../TestCore";

describe( 'DieBag', () => {

    let bag : DieBag = new DieBag();

    it( 'should add dice to the bag successfully', () => {

        bag = new DieBag();

        let count = TestCore.randomInt( 100 );
        let sides = TestCore.randomInt( 100 );

        bag.add( count, sides );
        expect( bag.getSetOfSidedDie( sides ) ).has.lengthOf( count );
    });

    it( 'should facilitate adding dice en masse via import of a DieBag', () => {

        bag = new DieBag();
        let mergeBag = new DieBag();

        let bagAdds : { [key:string] : number } = {};

        for ( let bagAddsLoop = 0 ; bagAddsLoop < TestCore.randomInt( 10 ) ; bagAddsLoop++ ){

            TestCore.trackRandomAddedDie( bagAdds, bag );
            TestCore.trackRandomAddedDie( bagAdds, mergeBag );
        }

        bag.addBag( mergeBag );

        Object.keys( bagAdds ).forEach( ( dieSides : string ) => {

            expect( bag.getSetOfSidedDie( dieSides ) ).to.have.lengthOf( bagAdds[dieSides] );
        });
    });

    it( 'should retain die values when importing DieBag', () => {

        bag = new DieBag();
        let mergeBag = new DieBag();

        mergeBag.add( 3, 6 );
        let dieValues = mergeBag.report()['6'];

        bag.addBag( mergeBag );
        let mergedValues = bag.report()['6'];

        for( let loopCounter = 0 ; loopCounter < 3 ; loopCounter++ ) {

            expect( dieValues[loopCounter].getValue() ).to.be.equal( mergedValues[loopCounter].getValue() );
        }
    });

    it( 'should allow a preset die value to be defined when adding dice to the bag', () => {

        bag = new DieBag();

        bag.add( 3, 1000, 77 );
        expect( bag.report() ).to.have.ownProperty( '1000' );
        expect( bag.report()['1000'] ).has.lengthOf( 3 );
        expect( bag.report()['1000'][0].getValue() ).to.be.equal( 77 );
    });

    it( 'should remove a single die set from a bag successfully' , () => {

        bag = new DieBag();

        bag.add( 5, 4 );
        bag.remove( 3, 4 );

        expect( bag.report() ).to.have.ownProperty( '4' );
        expect( bag.report()['4'] ).has.lengthOf( 2 );
    });

    it( 'should allow die to removed en masse by supplying a DieBag', () => {

        bag = new DieBag();
        let minusBag = new DieBag();

        bag.add( 4, 12 );
        bag.add( 2, 6 );

        minusBag.add( 2, 12 );
        minusBag.add( 1, 6 );

        bag.removeBag( minusBag, false );

        expect( bag.report()['12'] ).has.lengthOf( 2 );
        expect( bag.report()['6'] ).has.lengthOf( 1 );
    });

    it( 'should change the value of the total die value after the after its been rolled', () => {

        bag = new DieBag();

        bag.add( 20, 8 );
        let oldResults = bag.getTotal();

        for( let loopCounter = 0 ; loopCounter < 3 ; loopCounter++ ) {

            bag.roll();
            if ( oldResults != bag.getTotal() ) { break; }
        }

        expect( oldResults ).to.not.be.equal( bag.getTotal() );
    });

    it ( 'should not cause locked die to be rerolled', () => {

        bag = new DieBag();

        bag.add( 12, 100 );
        bag.dieMap['100'][0].setLock( true );
        let legacyValue = bag.dieMap['100'][0].getValue();

        for ( let loopCounter = 0 ; loopCounter < 3 ; loopCounter++ ) {

            bag.roll();
            if ( legacyValue != bag.dieMap['100'][0].getValue() ) { break; }
        }

        expect( legacyValue ).to.be.equal( bag.dieMap['100'][0].getValue() );
    });

    it( 'should provide an accurate report on the state of all die, sorted by type', () => {

        bag = new DieBag();

        bag.add( 4, 8 );
        bag.add( 8,  6 );
        bag.add( 10, 20 );
        bag.add( 5, 4 );
        bag.add( 7, 12 );
        bag.add( 2, 8 );

        bag.roll();

        let reportedTotal = bag.getTotal();

        expect( bag.dieMap['8']  ).has.lengthOf( 6  );
        expect( bag.dieMap['6']  ).has.lengthOf( 8  );
        expect( bag.dieMap['20'] ).has.lengthOf( 10 );
        expect( bag.dieMap['4']  ).has.lengthOf( 5  );
        expect( bag.dieMap['12'] ).has.lengthOf( 7  );

        let total = 0;

        for ( let loopCounter = 0 ; loopCounter < 3 ; loopCounter++ ) {

            total = 0;

            Object.keys( bag.dieMap ).forEach( sides => {

                for ( let dieIndex  = 0 ; dieIndex < bag.dieMap[sides].length ; dieIndex++ ){

                    total += bag.dieMap[sides][dieIndex].getValue();
                }
            });
        }

        expect( reportedTotal ).to.be.equal( total );
    });

    it( 'should deliver all die filtered by # of sides correctly', () => {

        bag = new DieBag();

        let count1 = TestCore.randomInt( 100 );
        let sides1 = TestCore.randomInt( 100 );
        let count2 = TestCore.randomInt( 100 );
        let sides2 = TestCore.randomInt( 100 );
        let count3 = TestCore.randomInt( 100 );
        let sides3 = TestCore.randomInt( 100 );

        bag.add( count1, sides1 );
        bag.add( count2, sides2 );
        bag.add( count3, sides3 );

        bag.roll();

        expect( bag.getSetOfSidedDie( sides1 ).length ).is.equal( count1 );
        expect( bag.getSetOfSidedDie( sides2 ).length ).is.equal( count2 );
        expect( bag.getSetOfSidedDie( sides3 ).length ).is.equal( count3 );
    });
});