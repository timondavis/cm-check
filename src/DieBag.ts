import { Die } from "./Die";

export class DieBag {

    protected dieMap : { [key:string] : Die[] } = {};
    protected rollResults : { [key:string] : number } = {};

    /**
     * Add die to the bag.  Translates to the famous xdy pattern  (i.e. 2d6 == 2 six sided die)
     *
     * @param {number} count
     * @param {number} sides
     */
    public add( count: number , sides: number ) {

        if ( ! this.isDieIndexExists( sides ) ) { this.addNewDieIndex( sides ) }

        for ( let index = 0 ; index < count ; index++ ) {

            this.dieMap[sides].push( new Die( sides ) );
        }
    }

    /**
     * Removed die from the bag. Translates to the famous xdy pattern  (i.e. 2d6 == 2 six sided die)
     *
     * @param {number} count
     * @param {number} sides
     */
    public remove ( count: number, sides: number ) {

        if ( ! this.isDieIndexExists( sides ) ) { return; }

        let requestedIndex: number = sides;
        let remainingDie: number = this.dieMap[ String( sides ) ].length;

        while ( requestedIndex > 0 && remainingDie > 0 ) {

            this.dieMap[ sides.toPrecision( 0 ) ].pop();
        }
    }

    /**
     * Roll 'dem laughing bones...
     *
     * Will roll and return a report on every dice in the bag.
     *
     * @returns {{[string:key] : number}
     */
    public roll() {

        this.rollResults = {};
        this.rollCollection();
        this.rollResults['total'] = this.getTotal();

        return this.rollResults;
    }

    /**
     * Get the object representing the contents of the bag.
     *
     * @returns {{{[p: string]: Die[]}}
     */
    public report() {

        return this.dieMap;
    }

    /**
     * Does the indicated # of sides already have an index in the dieMap?
     *
     * @param {number} sides
     *
     * @return {boolean}
     */
    protected isDieIndexExists( sides: number ) {

        return this.dieMap.hasOwnProperty( String( sides ) );
    }

    /**
     * Adds a new index to the dieBag.
     *
     * @mutator
     *
     * @pre The index must not already exist, or it will be overwritten.
     * @post The index will be assigned with an empty array
     *
     * @param {number} sides
     */
    protected addNewDieIndex( sides: number ) {

        this.dieMap[ String( sides )] = [];
    }

    private rollCollection() {

        let self = this;

        Object.keys( self.dieMap ).forEach( function( groupName: string ) {

            self.rollResults[groupName] = 0;

            Object.keys( self.dieMap[groupName] ).forEach( function( dieIndexString: string, dieIndex: number) {

                let dieMapGroup = self.dieMap[groupName];

                self.rollResults[groupName] += dieMapGroup[dieIndex].roll();
            })
        });
    }

    private getTotal() {
        let self = this;

        let total = 0;
        Object.keys( self.rollResults ).forEach( function( groupIndex ) {

            total += self.rollResults[groupIndex];
        });
        return total;
    }
}