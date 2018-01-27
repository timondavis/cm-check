import { DieBag } from "../Die/DieBag";

export class TestCore {

    /**
     * Get a random int between 1 - indicated maximum.  To start range with zero instead, indicate with 2nd param.
     *
     * @param {number} max
     * @param {boolean} includeZero
     *
     * @returns {number}
     */
    public static randomInt( max : number = 1000 , includeZero: boolean = false ) : number {

        return Math.floor (Math.random() * Math.floor(max ) + ( (includeZero) ? 0 : 1 ) );
    }


    /**
     * Randomize die and add them to the indicated tracker and bag.   The tracker will keep a hold of counts only.
     * Used to validate count integrity on bags.
     *
     * @param {{[p: string]: number}} tracker
     * @param {DieBag} bag
     * @param {string} operator  Pass in a simple arithmetic operator which will be used to affect the count on the
     * tracker.  Defaults to +
     * @param {number} count
     * @param {number} sides
     */
    public static trackRandomAddedDie( tracker: { [key:string] : number }, bag : DieBag, operator: string = '+', count :  number = -1, sides : number = -1 ) {

        sides = (sides === -1) ? TestCore.randomInt() : sides;
        count = (count === -1) ? TestCore.randomInt() : count;

        if ( !tracker.hasOwnProperty( String( sides ) ) ) {
            tracker[ String( sides ) ] = 0;
        }

        switch( operator ) {

            case( '-' ):
                tracker[ String( sides ) ] -= count;
                break;

            case( '+' ):
                tracker[ String( sides ) ] += count;
                break;

            case( '*' ):
                tracker[ String( sides ) ] *= count;
                break;

            case( '/' ):
                tracker[ String( sides ) ] /= count;
                break;

            default:
                throw ( operator + " is not a valid operator for use invoked.  Use + - / or * " );
        }


        bag.add( count, sides );
    }
}