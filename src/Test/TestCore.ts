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
    public static randomInt( max : number, includeZero: boolean = false ) : number {

        return Math.floor (Math.random() * Math.floor(max ) + ( (includeZero) ? 0 : 1 ) );
    }

    /**
     * Randomize die and add them to the indicated tracker and bag.   The tracker will keep a hold of counts only.
     * Used to validate count integrity on bags.
     *
     * @param {{[p: string]: number}} tracker
     * @param {DieBag} bag
     */
    public static trackRandomAddedDie( tracker: { [key:string] : number }, bag : DieBag ) {

        let randomSides = TestCore.randomInt( 100 );
        let randomCount = TestCore.randomInt( 100 );

        if ( ! tracker.hasOwnProperty( String( randomSides ) )) {

            tracker[String( randomSides ) ] = 0;
        }

        tracker[String( randomSides ) ] += randomCount;
        bag.add( randomCount, randomSides );
    }
}