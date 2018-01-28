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

    it( 'should not allow adding or removing negative amounts of die', () => {

        bag = new DieBag();

        expect( () => bag.add( TestCore.randomInt() * -1, TestCore.randomInt() )).to.throw;
        expect( () => bag.remove( TestCore.randomInt() * -1 , TestCore.randomInt() )).to.throw;
    });

    it( 'should not allow less than 0 of any type of die to exist in the bag', () => {

        bag = new DieBag();

        let sides = TestCore.randomInt();
        let count = TestCore.randomInt();

        bag.remove( sides, count );
        expect( bag.getDieWithSides( sides )).to.have.length( 0 );
    });

    it( 'relies on Die class to prevent invalid die additions or removals from being processed', () => {

        bag = new DieBag();

        expect( () => bag.add( TestCore.randomInt(), 0 )).to.throw;
        expect( () => bag.add( TestCore.randomInt(), -1 )).to.throw;
        expect( () => bag.remove( TestCore.randomInt(), 0 )).to.throw;
        expect( () => bag.remove( TestCore.randomInt(), -1 )).to.throw;
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

        dieDefinitions = TestCore.generateDieDefinitions();

        TestCore.addDieToBagWithDefinitions( dieDefinitions, bag );
        bag.roll();
        TestCore.validateCountsOnBagWithDefinitions( dieDefinitions, bag );

        reportedTotal = bag.getTotal();
        total = TestCore.countTotalValuesOfDieInBag( bag );

        expect( reportedTotal ).to.be.equal( total );
    });

    it( 'should deliver all die filtered by # of sides correctly', () => {

        for ( let testPass = 0 ; testPass < 50 ; testPass++ ) {

            bag = new DieBag();

            let count1 = TestCore.randomInt( 100 );
            let count2 = TestCore.randomInt( 100 );
            let count3 = TestCore.randomInt( 100 );
            let sides1 = TestCore.randomInt( 100 );
            let sides2 : number;
            let sides3 : number;

            do {
                sides2 = TestCore.randomInt( 100 );
            }  while ( sides2 === sides1 )

            do {
                sides3 = TestCore.randomInt( 100 );
            } while( sides3 == sides1 || sides3 == sides2 );


            bag.add( count1, sides1 );
            bag.add( count2, sides2 );
            bag.add( count3, sides3 );

            bag.roll();

            expect( bag.getDieWithSides( sides1 ).length ).is.equal( count1 );
            expect( bag.getDieWithSides( sides2 ).length ).is.equal( count2 );
            expect( bag.getDieWithSides( sides3 ).length ).is.equal( count3 );
        }

    });

    it( 'provides a static service encoding die strings', () => {

        let count = TestCore.randomInt();
        let sides = TestCore.randomInt();
        let stringifiedDie = String( count ) + 'd' + String( sides );

        expect( DieBag.encodeDieString( count, sides ) ).to.be.equal( stringifiedDie );

        count *= -1;
        expect( DieBag.encodeDieString( count, sides ) ).to.be.equal( '-' + stringifiedDie );
    });

    it( 'provides a static service decoding die strings', () => {

        let count = TestCore.randomInt();
        let sides = TestCore.randomInt();
        let stringifiedDie = String( count ) + 'd' + String( sides );

        expect( DieBag.decodeDieString( stringifiedDie ).value[0] ).to.be.equal( count );
        expect( DieBag.decodeDieString( stringifiedDie ).value[1] ).to.be.equal( sides );
        expect( DieBag.decodeDieString( stringifiedDie ).directive ).to.be.equal( 'add' );

        expect( DieBag.decodeDieString( '-' + stringifiedDie ).value[0] ).to.be.equal( count );
        expect( DieBag.decodeDieString( '-' + stringifiedDie ).value[1] ).to.be.equal( sides );
        expect( DieBag.decodeDieString( '-' + stringifiedDie ).directive ).to.be.equal( 'remove' );
    });

    it ( 'should prevent against invalid die encoding/decoding attempts', () => {

        expect( () => DieBag.encodeDieString( TestCore.randomInt(), 0  )).to.throw;
        expect( () => DieBag.encodeDieString( TestCore.randomInt(), -5 )).to.throw;

        expect( () => DieBag.decodeDieString( 'fred' ) ).to.throw;
        expect( () => DieBag.decodeDieString( '10d0' ) ).to.throw;
        expect( () => DieBag.decodeDieString( '10d-1' ) ).to.throw;
    });

});