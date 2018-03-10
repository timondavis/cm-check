import { DieBag } from "../Die/DieBag";
import { expect } from "chai";

export class TestCore {

    /**
     * Get a random int between 1 - indicated maximum.  To start range with zero instead, indicate with 2nd param.
     *
     * @param {number} max
     * @param {boolean} includeZero
     *===1`
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

    /**
     * Generate an array of 2-element number arrays, holding the [0]count and [1]sides
     *
     * @returns {number[][]}
     */
    public static generateDieDefinitions() {

        let sides : number;
        let dieDefs : number[][] = [];
        let sidesUsed : number[] = [];

        for ( let defCounter = 0 ; defCounter < TestCore.randomInt( 100 ) ; defCounter++ ){

            do {
                sides = TestCore.randomInt();
            } while( sidesUsed.indexOf( sides ) != -1 );

            sidesUsed.push( sides );

            dieDefs.push( [TestCore.randomInt(), sides ]);
        }

        return dieDefs;
    }

    /**
     * Apply the defined die in the die definitions to a DieBag
     *
     * @param {number[][]} dieDefinitions
     * @param {DieBag} bag
     */
    public static addDieToBagWithDefinitions( dieDefinitions: number[][], bag : DieBag ) {

        for ( let defCounter = 0 ; defCounter < dieDefinitions.length ; defCounter++ ) {

            bag.add( dieDefinitions[defCounter][0], dieDefinitions[defCounter][1] );
        }
    }

    /**
     * Validate the counts of each type of die in the DieBag match up with whats expected in the supplied die
     * definitions.
     * @param {number[][]} dieDefinitions
     * @param {DieBag} bag
     */
    public static validateCountsOnBagWithDefinitions( dieDefinitions : number[][], bag : DieBag ) {

        for ( let defCounter = 0 ; defCounter < dieDefinitions.length ; defCounter++ ) {

            expect( bag.getDieWithSides( dieDefinitions[defCounter][1] ) ).to.have.lengthOf( dieDefinitions[defCounter][0] );
        }
    }

    public static countTotalValuesOfDieInBag( bag: DieBag, sides: string = '' ) : number {

        let total = 0;
        if ( sides === '' ){

            Object.keys( bag.dieMap ).forEach( sides => {
                for ( let dieIndex = 0; dieIndex < bag.dieMap[ sides ].length; dieIndex++ ) {

                    total += bag.dieMap[ sides ][ dieIndex ].getValue();
                }
            });
        }
        else {

            for( let dieIndex = 0 ; dieIndex < bag.dieMap[ sides ].length ; dieIndex++) {

                total += bag.dieMap[ sides ][ dieIndex ].getValue();
            }
        }

        return total;
    }
}