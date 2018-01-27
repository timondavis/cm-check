import { Die } from "./Die";

export class DieBag {

    protected _dieMap : { [key:string] : Die[] } = {};
    protected rollResults : { [key:string] : number } = {};

    get dieMap() : { [key:string] : Die[] } {
        return this._dieMap;
    }

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

            this._dieMap[sides].push( die );
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

        Object.keys( bag._dieMap ).forEach( function( groupIndex )  {

            for ( dieIndex = 0 ; dieIndex < bag._dieMap[groupIndex].length ; dieIndex++ ) {

                let newDie = bag._dieMap[groupIndex][dieIndex];

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

        let remainingDie: number = this._dieMap[ String( sides ) ].length;

        while ( remainingDie > 0 && count > 0 ) {

            this._dieMap[ String( sides )].pop();
            remainingDie = this._dieMap[ String( sides ) ].length;
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

        return this._dieMap;
    }

    /**
     * Does the indicated # of sides already have an index in the _dieMap?
     *
     * @param {number} sides
     *
     * @return {boolean}
     */
    protected isDieIndexExists( sides: number ) {

        return this._dieMap.hasOwnProperty( String( sides ) );
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

        this._dieMap[ String( sides )] = [];
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

    /**
     * Get a collection of all die in the bag with the indicated amount of sides
     *
     * @param {number | string} sides
     * @returns {Die[]}
     */
    public getDieWithSides( sides : number | string ) : Die[] {

        if ( isNaN( Number( sides ) ) )  { throw "Non-numerical value requested"; }
        sides = String( Math.floor( Number( sides ) ) );

        if ( ! this.dieMap.hasOwnProperty( sides ) ) { return []; }

        return this.dieMap[sides];
    }

    private rollCollection() {

        let self = this;

        Object.keys( self._dieMap ).forEach( function( groupName: string ) {

            self.rollResults[groupName] = 0;

            Object.keys( self._dieMap[groupName] ).forEach( function( dieIndexString: string, dieIndex: number) {

                let _dieMapGroup = self._dieMap[groupName];

                self.rollResults[groupName] += _dieMapGroup[dieIndex].roll().getValue();
            })
        });
    }

    // TODO IMPLEMENT!  IF SEARCH IS A THING WE SUPPORT, THIS MUST BE IN PLACE
    private refreshDieResults() {

        let self = this;

        Object.keys( self._dieMap ).forEach( function( groupName: string ) {

            self.rollResults[groupName] = 0;

            Object.keys( self._dieMap[groupName] ).forEach( function( dieIndexString: string, dieIndex: number) {

                let _dieMapGroup = self._dieMap[groupName];

                self.rollResults[groupName] += _dieMapGroup[dieIndex].getValue();
            })
        });
    }

    // @TODO, OPTIMIZE, THIS IS A PROTYPE IMPLEMENTATION ONLY
    private strictRemoveBag( bag: DieBag ) {
        let self = this;
        let guestDieIndex = 0;
        let selfDieIndex = 0;

        Object.keys( bag._dieMap ).forEach( function( groupIndex )  {

            for ( guestDieIndex = 0 ; guestDieIndex < bag._dieMap[groupIndex].length ; guestDieIndex++ ) {

                let value = bag._dieMap[groupIndex][guestDieIndex].getValue();

                for ( selfDieIndex = 0 ; selfDieIndex < self._dieMap[groupIndex].length ; selfDieIndex++ ) {

                    if ( self._dieMap.hasOwnProperty( groupIndex ) &&
                        value === self._dieMap[groupIndex][selfDieIndex].getValue() &&
                        ! self._dieMap[groupIndex][selfDieIndex].isLocked() ) {

                        self._dieMap[groupIndex].splice( selfDieIndex, 1 );
                        break;
                    }
                }
            }
        });
    }

    // @TODO, OPTIMIZE, THIS IS A PROTYPE IMPLEMENTATION ONLY
    private looseRemoveBag( bag: DieBag ) {

        let self = this;

        Object.keys( bag._dieMap ).forEach( function( groupIndex )  {

            let groupSize = bag._dieMap[groupIndex].length;

            self.remove( groupSize, Number(groupIndex) );
        });

    }
}