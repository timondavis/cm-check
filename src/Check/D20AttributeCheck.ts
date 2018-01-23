import { Check } from './Check';
import { ResultModifier } from "./Modifier/ResultModifier";

export class D20AttributeCheck extends Check {

    public constructor( protected attributeValue : number, target: number, protected attributeName : string = '' ) {

        super( target );

        if ( ! this.attributeName ) { this.attributeName = 'D20Attribute'; }

        this.addModifier( new ResultModifier( this.attributeName,
            D20AttributeCheck.translateAttributeValue( attributeValue ) ) );

    }

    /**
     * Set the name of the attribute being checked against
     * @param {string} name
     */
    public setAttributeName( name : string ) {

        this.attributeName = name;
    }

    /**
     * Get the name of the attribute being checked against
     * @returns {string | undefined}
     */
    public getName() {

        return this.attributeName;
    }

    /**
     * Get the formal typename of this check
     * @returns {string}
     */
    public getType() : string {

        return this.attributeName + 'Attribute';
    }


    /**
     *
     */
    protected setBaseDieBag(): void {

        this.dieBag.add( 1, 20 );
    }

    protected static translateAttributeValue( value: number ) : number {

        if ( value <= 3 ) { return -3; }
        else if ( value <= 6 ) { return -2; }
        else if ( value <= 9 ) { return -1; }
        else if ( value <= 12 ) { return 0; }
        else if ( value <= 15 ) { return 1; }
        else if ( value <= 18 ) { return 2; }
        else if ( value <= 21 ) { return 3; }
        else { return 4; }
    }
}