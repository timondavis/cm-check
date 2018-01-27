import { DieBag } from '../../Die/DieBag';
import { expect } from 'chai';
import 'mocha';
import { TestCore } from "../TestCore";

describe( 'DieBag', () => {

    let bag : DieBag = new DieBag();

    it( 'should add dice to the bag successfully', () => {

        bag = new DieBag();

        let count = TestCore.randomInt();
        let sides = TestCore.randomInt();

        bag.add( count, sides );
        expect( bag.getDieWithSides( sides ) ).has.lengthOf( count );
    });

    it( 'should facilitate adding dice en masse via import of a DieBag', () => {

        bag = new DieBag();
        let mergeBag = new DieBag();

        let bagAdds : { [key:string] : number } = {};

        for ( let bagAddsLoop = 0 ; bagAddsLoop < TestCore.randomInt( 100 ) ; bagAddsLoop++ ){

            TestCore.trackRandomAddedDie( bagAdds, bag );
            TestCore.trackRandomAddedDie( bagAdds, mergeBag );
        }

        bag.addBag( mergeBag );

        Object.keys( bagAdds ).forEach( ( dieSides : string ) => {

            expect( bag.getDieWithSides( dieSides ) ).to.have.lengthOf( bagAdds[dieSides] );
        });
    });

    it( 'should retain die values when importing DieBag', () => {

        bag = new DieBag();
        let mergeBag = new DieBag();

        let count = TestCore.randomInt();
        let sides = TestCore.randomInt();

        mergeBag.add( count, sides );
        let dieValues = mergeBag.getDieWithSides( sides );

        bag.addBag( mergeBag );
        let mergedValues = bag.getDieWithSides( sides );

        for( let loopCounter = 0 ; loopCounter < count ; loopCounter++ ) {

            expect( dieValues[loopCounter].getValue() ).to.be.equal( mergedValues[loopCounter].getValue() );
        }

    });

    it( 'should allow a preset die value to be defined when adding dice to the bag', () => {

        bag = new DieBag();

        let count = TestCore.randomInt();
        let sides = TestCore.randomInt();
        let value = TestCore.randomInt( sides );
        let dieValues = [];

        bag.add( count, sides, value );

        dieValues = bag.getDieWithSides( sides );
        expect( dieValues).to.have.lengthOf( count );

        for( let dieIndex = 0 ; dieIndex < count ; dieIndex++ ) {

            expect( dieValues[dieIndex].getValue() ).to.be.equal( value );
        }
    });

    it( 'should remove a single die set from a bag successfully' , () => {

        let addedDie = TestCore.randomInt();
        let dieSides = TestCore.randomInt();
        let removedDie = TestCore.randomInt( addedDie - 1, true );

        bag = new DieBag();

        bag.add( addedDie, dieSides );
        bag.remove( removedDie , dieSides );

        expect( bag.getDieWithSides( dieSides ) ).has.lengthOf( addedDie - removedDie );
    });

    it( 'should allow die to removed en masse by supplying a DieBag', () => {


        let sides : number;
        let addCount : number;
        let removeCount : number;
        let tracker : { [key:string] : number } = {};

        let minusBag = new DieBag();
        bag = new DieBag();

        for ( let loopCounter = 0 ; loopCounter < TestCore.randomInt() ; loopCounter++ ) {

            sides = TestCore.randomInt();
            addCount = TestCore.randomInt();
            removeCount = TestCore.randomInt( addCount );

            TestCore.trackRandomAddedDie( tracker, bag, '+', addCount, sides );
            TestCore.trackRandomAddedDie( tracker, minusBag, '-', removeCount, sides );
        }

        bag.removeBag( minusBag, false );

        Object.keys( tracker ).forEach( ( dieSides : string ) => {

            expect( bag.getDieWithSides( dieSides ) ).to.have.lengthOf( tracker[dieSides] );
        });
    });

    it( 'should change the value of the total die value after the after its been rolled', () => {

        bag = new DieBag();

        let count = TestCore.randomInt();
        let sides = TestCore.randomInt();

        bag.add( count, sides );
        let oldResults = bag.getTotal();

        for( let loopCounter = 0 ; loopCounter < 3 ; loopCounter++ ) {

            bag.roll();
            if ( oldResults != bag.getTotal() ) { break; }
        }

        expect( oldResults ).to.not.be.equal( bag.getTotal() );
    });

    it ( 'should not cause locked die to be rerolled', () => {

        let count = TestCore.randomInt();
        let sides = TestCore.randomInt();

        bag = new DieBag();

        bag.add( count, sides );
        bag.dieMap[String( sides )][0].setLock( true );
        let legacyValue = bag.dieMap[String( sides )][0].getValue();

        for ( let loopCounter = 0 ; loopCounter < 10 ; loopCounter++ ) {

            bag.roll();
            if ( legacyValue != bag.dieMap[String( sides )][0].getValue() ) { break; }
        }

        expect( legacyValue ).to.be.equal( bag.dieMap[String( sides )][0].getValue() );
    });

    it( 'should provide an accurate report on the state of all die, sorted by type', () => {

        bag = new DieBag();

        let dieDefinitions : number[][] = [];
        let total : number;
        let reportedTotal : number;

        dieDefinitions = generateDieDefinitions();

        addDieToBagWithDefinitions( dieDefinitions, bag );
        bag.roll();
        validateCountsOnBagWithDefinitions( dieDefinitions, bag );

        reportedTotal = bag.getTotal();
        total = countTotalValuesOfDieInBag( bag );

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

        expect( bag.getDieWithSides( sides1 ).length ).is.equal( count1 );
        expect( bag.getDieWithSides( sides2 ).length ).is.equal( count2 );
        expect( bag.getDieWithSides( sides3 ).length ).is.equal( count3 );
    });

    function generateDieDefinitions() {

        let sides : number;
        let dieDefs : number[][] = [];
        let sidesUsed : number[] = [];

        for ( let defCounter = 0 ; defCounter < TestCore.randomInt( 20 ) ; defCounter++ ){


            do {
                sides = TestCore.randomInt();
            } while( sidesUsed.indexOf( sides ) != -1 );

            sidesUsed.push( sides );

            dieDefs.push( [TestCore.randomInt(), sides ]);
        }

        return dieDefs;
    }

    function addDieToBagWithDefinitions( dieDefinitions: number[][], bag : DieBag ) {

        for ( let defCounter = 0 ; defCounter < dieDefinitions.length ; defCounter++ ) {

            bag.add( dieDefinitions[defCounter][0], dieDefinitions[defCounter][1] );
        }
    }

    function validateCountsOnBagWithDefinitions( dieDefinitions : number[][], bag : DieBag ) {

        for ( let defCounter = 0 ; defCounter < dieDefinitions.length ; defCounter++ ) {

            expect( bag.getDieWithSides( dieDefinitions[defCounter][1] ) ).to.have.lengthOf( dieDefinitions[defCounter][0] );
        }
    }

    function countTotalValuesOfDieInBag( bag: DieBag ) : number {

        let total = 0;
        Object.keys( bag.dieMap ).forEach( sides => {

            for ( let dieIndex = 0; dieIndex < bag.dieMap[ sides ].length; dieIndex++ ) {

                total += bag.dieMap[ sides ][ dieIndex ].getValue();
            }
        });

        return total;
    }
});