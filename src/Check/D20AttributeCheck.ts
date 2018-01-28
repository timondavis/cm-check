import { Check } from './Check';
import { ResultModifier } from "./Modifier/ResultModifier";

export class D20AttributeCheck extends Check {

    public constructor( target: number = 0, protected attributeValue : number = 0, protected name: string = 'Natural' +
    ' Attribute Modifier' ) {

        super( target );

        this.addModifier( new ResultModifier( name,
            D20AttributeCheck.translateAttributeValue( attributeValue ) ) );
    }

    /**
     * Get the formal typename of this check
     * @returns {string}
     */
    public getType() : string {

        return 'd20-attribute'
    }

    /**
     * Update the attribute being checked against
     * @param {number} attributeValue
     */
    // @TODO Brute force is not efficient, sort then search
    public setAttributeValue( attributeValue : number ) {

        this.attributeValue = attributeValue;

        let modifiers = this.getModifiers();

        for ( let modifierIndex = 0 ; modifierIndex < modifiers.length ; modifierIndex++ ) {

            if ( modifiers[modifierIndex].getName() == this.name ) {

                modifiers[modifierIndex].setValue( D20AttributeCheck.translateAttributeValue( attributeValue ) );
                break;
            }
        }
    }

    protected setCheckDie(): void {

        this.dieBag.add( 1, 20 );
    }

    protected static translateAttributeValue( value: number ) : number {

        if ( value <= 3 ) { return -3; }
        else if ( value <= 6 ) { return -2; }
        else if ( value <= 9 ) { return -1; }
        else if ( value <= 12 ) { return 0; }
        else {

            value -= 12;
            return Math.ceil( value / 3 );
        }
    }
}