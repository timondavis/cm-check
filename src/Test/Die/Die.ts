import { Die } from '../../Die/Die';
import { assert } from 'chai';
import { expect } from 'chai';
import 'mocha';

describe( 'Die', () => {

    let die: Die = new Die( 20 );

    it( 'should be created with any number of sides', () => {

        let randomSides : number;
        for( let turn = 0 ; turn < 3 ; turn++ ) {

            randomSides = Math.floor( Math.random() * Math.floor( 20 ) + 1 );
            die = new Die( randomSides );
            expect( randomSides ).to.be.equal( die.sides );
        }
    });

    it( 'should likely produce a different die value within 50 rolls of the same die', () => {

        die = new Die( 20 );

        let startingValue = die.getValue();
        let valueHasChanged = false;

        for ( let turn = 0 ; turn < 50 ; turn++ ) {

            die.roll();

            if ( die.getValue() != startingValue ) {

                valueHasChanged = true;
                break;
            }
        }

        expect( valueHasChanged ).to.be.true;
    });

    it( 'should allow manual updates to value', () => {

        die = new Die( 100  );
        die.roll();
        die.setValue( 7 );

        assert( die.getValue() === 7 );
    });

    it( 'should throw an error if a value is set out of range - the die should retain its value', () => {

        die = new Die( 6 );

        die.setValue( 4 );

        expect( () => die.setValue( 7 ) ).to.throw( "Defined Die value exceeds available range" );
        expect( () => die.setValue( 0 ) ).to.throw( "Defined Die value exceeds available range" );
        expect( () => die.setValue( -1 ) ).to.throw( "Defined Die value exceeds available range" );

        expect( die.getValue() ).to.be.equal( 4 );
    });

    it( 'should not change in value if locked', () => {

        die = new Die( 100 );

        let originalValue = die.roll().getValue();

        die.setLock( true );

        for ( let loopCount = 0 ; loopCount < 5 ; loopCount++ ) {

           die.roll();
           expect( die.getValue() ).to.be.equal( originalValue );
        }
    });

    it( 'should behave as expected when locked and unlocked', () => {

       die = new Die( 10000 );

       let originalValue = die.getValue();
       die.setLock( true );
       die.roll();

       expect( die.getValue() ).to.be.equal( originalValue );

       die.setLock( false );

       for ( let loopCounter = 0 ; loopCounter < 5 ; loopCounter++ ) {

           die.roll();
           if ( die.getValue() != originalValue ) { break; }
       }

       expect( die.getValue() ).not.to.be.equal( originalValue );

    });

    it( 'should report correctly on lock state', () => {

        die = new Die( 50 );

        expect( die.isLocked() ).to.be.false;

        die.setLock( true );
        expect( die.isLocked() ).to.be.true;

        die.setLock( false );
        expect( die.isLocked() ).to.be.false;
    });
});
