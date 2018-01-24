import { DieBag } from '../../Die/DieBag';
import { assert } from 'chai';
import { expect } from 'chai';
import 'mocha';
import { Die } from "../../Die/Die";

describe( 'DieBag', () => {

    let bag : DieBag = new DieBag();

    it( 'should add dice to the bag successfully', () => {

        bag = new DieBag();

        bag.add( 1, 6 );
        expect( bag.report() ).to.have.ownProperty( '6' );
        expect( bag.report()['6'] ).has.lengthOf( 1 );
    });

    it( 'should facilitate adding dice en masse via import of a DieBag', () => {

        bag = new DieBag();
        let mergeBag = new DieBag();

        bag.add( 2, 6 );
        bag.add( 4, 12 );

        mergeBag.add( 5, 2 );
        mergeBag.add( 2, 6 );
        mergeBag.add( 7, 12 );

        bag.addBag( mergeBag );

        expect( bag.report() ).to.have.ownProperty( '2' );
        expect( bag.report()['2'] ).has.lengthOf( 5 );

        expect( bag.report() ).to.have.ownProperty( '6' );
        expect( bag.report()['6'] ).has.lengthOf( 4 );

        expect( bag.report() ).to.have.ownProperty( '12' );
        expect( bag.report()['12'] ).has.lengthOf( 11 );
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

});