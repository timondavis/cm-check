import { Die } from '../../Die/Die';
import { assert } from 'chai';
import { expect } from 'chai';
import 'mocha';

describe( 'Individual Die are behaving properly', () => {

    let die: Die = new Die( 20 );

    it( 'Creating new random die should work', () => {

        let randomSides : number;
        for( let turn = 0 ; turn < 3 ; turn++ ) {

            randomSides = Math.floor( Math.random() * Math.floor( 20 ) + 1 );
            die = new Die( randomSides );
            expect( randomSides ).to.be.equal( die.sides );
        }
    });

    it( 'Rolling the die should generally change its value within 5 rolls', () => {

        die = new Die( 20 );

        let startingValue = die.getValue();
        let valueHasChanged = false;

        for ( let turn = 0 ; turn < 5 ; turn++ ) {

            die.roll();

            if ( die.getValue() != startingValue ) {

                valueHasChanged = true;
                break;
            }
        }

        expect( valueHasChanged ).to.be.true;
    });

    it( 'Die should allow manual change of values', () => {

        die = new Die( 100  );
        die.roll();
        die.setValue( 7 );

        assert( die.getValue() === 7 );
    });

    it( 'Die should throw an error if a value is set out of range - the die should retain its value', () => {

        die = new Die( 6 );

        die.setValue( 4 );

        expect( () => die.setValue( 7 ) ).to.throw( "Defined Die value exceeds available range" );
        expect( () => die.setValue( 0 ) ).to.throw( "Defined Die value exceeds available range" );
        expect( () => die.setValue( -1 ) ).to.throw( "Defined Die value exceeds available range" );

        expect( die.getValue() ).to.be.equal( 4 );
    });

    it( 'Locked die should not change in value', () => {

        die = new Die( 100 );

        let originalValue = die.roll().getValue();

        die.setLock( true );

        for ( let loopCount = 0 ; loopCount < 5 ; loopCount++ ) {

           die.roll();
           expect( die.getValue() ).to.be.equal( originalValue );
        }
    });

    it( 'Die can be locked and unlocked', () => {

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

    it( 'Die reports correctly on lock state', () => {

        die = new Die( 50 );

        expect( die.isLocked() ).to.be.false;

        die.setLock( true );
        expect( die.isLocked() ).to.be.true;

        die.setLock( false );
        expect( die.isLocked() ).to.be.false;
    });
});
