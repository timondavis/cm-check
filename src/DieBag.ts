import { Die } from "./Die";

export class DieBag {

    protected dieMap : { [key:string] : Die[] } = {};
    protected rollResults : { [key:string] : number } = {};

    /**
     * Add die to the bag.  Translates to the famous xdy pattern  (i.e. 2d6 == 2 six sided die)
     *
     * @param {number} count
     * @param {number} sides
     * @param {number} value (optional)
     *
     * @return {DieBag}
     */
    public add( count: number , sides: number, value: number = -1 ) : DieBag {

        if ( ! this.isDieIndexExists( sides ) ) { this.addNewDieIndex( sides ) }

        for ( let index = 0 ; index < count ; index++ ) {

            let die = new Die( sides );
            die.roll();

            if ( value >= 0 ) {
                die.setValue( value );
            }

            this.dieMap[sides].push( die );
        }

        return this;
    }

    /**
     * Add the contents of a die bag to this bag
     * @param {DieBag} bag
     *
     * @return {DieBag}
     */
    public addBag( bag : DieBag ) : DieBag {

        let self = this;
        let dieIndex = 0;

        Object.keys( bag.dieMap ).forEach( function( groupIndex )  {

            for ( dieIndex = 0 ; dieIndex < bag.dieMap[groupIndex].length ; dieIndex++ ) {

                let newDie = bag.dieMap[groupIndex][dieIndex];

                self.add( 1, Number( groupIndex ), newDie.getValue() );
            }
        });

        return this;
    }

    /**
     * Removed die from the bag. Translates to the famous xdy pattern  (i.e. 2d6 == 2 six sided die)
     *
     * @param {number} count
     * @param {number} sides
     *
     * @return {DieBag}
     */
    public remove ( count: number, sides: number ) : DieBag {

        if ( ! this.isDieIndexExists( sides ) ) { return this; }

        let remainingDie: number = this.dieMap[ String( sides ) ].length;

        while ( remainingDie > 0 && count > 0 ) {

            this.dieMap[ String( sides )].pop();
            remainingDie = this.dieMap[ String( sides ) ].length;
            count--;
        }

        return this;
    }

    /**
     * Remove die from the bag based on the contents of the given bag.
     * If strictRemove is enabled, only die matching the provided die types and values will be removed.
     * If off, it will simply remove the first available die which matches type, disregarding value.
     * If a die cannot be removed because it is locked or does not exist, the removal of that type will stop.
     *
     * @param {DieBag} bag
     * @param {boolean} strictRemove
     *
     * @return {DieBag}
     */
    public removeBag( bag : DieBag, strictRemove: boolean ) : DieBag {

        if ( strictRemove ) {
            this.strictRemoveBag( bag );
        }
        else {
            this.looseRemoveBag( bag );
        }

        return this;
    }

    // @TODO, OPTIMIZE, THIS IS A PROTYPE IMPLEMENTATION ONLY
    private strictRemoveBag( bag: DieBag ) {
        let self = this;
        let guestDieIndex = 0;
        let selfDieIndex = 0;

        Object.keys( bag.dieMap ).forEach( function( groupIndex )  {

            for ( guestDieIndex = 0 ; guestDieIndex < bag.dieMap[groupIndex].length ; guestDieIndex++ ) {

                let value = bag.dieMap[groupIndex][guestDieIndex].getValue();

                for ( selfDieIndex = 0 ; selfDieIndex < self.dieMap[groupIndex].length ; selfDieIndex++ ) {

                    if ( self.dieMap.hasOwnProperty( groupIndex ) &&
                         value === self.dieMap[groupIndex][selfDieIndex].getValue() &&
                         ! self.dieMap[groupIndex][selfDieIndex].isLocked() ) {

                        self.dieMap[groupIndex].splice( selfDieIndex, 1 );
                        break;
                    }
                }
            }
        });
    }

    // @TODO, OPTIMIZE, THIS IS A PROTYPE IMPLEMENTATION ONLY
    private looseRemoveBag( bag: DieBag ) {

        let self = this;

        Object.keys( bag.dieMap ).forEach( function( groupIndex )  {

               let groupSize = bag.dieMap[groupIndex].length;

               self.remove( groupSize, Number(groupIndex) );
        });

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


    /**
     * Get the total value of the dice in the die bag
     *
     * @returns {number}
     */
    public getTotal() {
        let self = this;
        let total = 0;

        this.refreshDieResults();

        Object.keys( self.rollResults ).forEach( function( groupIndex ) {

            total += self.rollResults[groupIndex];
        });
        return total;
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

    // TODO IMPLEMENT!  IF SEARCH IS A THING WE SUPPORT, THIS MUST BE IN PLACE
    private refreshDieResults() {

        let self = this;

        Object.keys( self.dieMap ).forEach( function( groupName: string ) {

            self.rollResults[groupName] = 0;

            Object.keys( self.dieMap[groupName] ).forEach( function( dieIndexString: string, dieIndex: number) {

                let dieMapGroup = self.dieMap[groupName];

                self.rollResults[groupName] += dieMapGroup[dieIndex].getValue();
            })
        });
    }


}