import { Check } from './Check';

export class D20AttributeCheck extends Check {

    protected attributeName : string = '';

    public setAttribute( name : string ) {

        this.attributeName = name;
    }

    public getType() : string {

        return this.attributeName + 'Attribute';
    }

    protected setBaseDieBag(): void {

        this.dieBag.add( 1, 20 );
    }

    protected translateAttributeValue( value: number, callback : { ( value : number ): number } ): number {

        return callback( value );
        /*
        if ( this.attributeValue <= 3 ) {
            this.baseModifier = -3;
        }

        else if ( this.attributeValue <= 6 ) {
            this.baseModifier = -2;
        }

        else if ( this.attributeValue <= 9 ) {
            this.baseModifier = -1;
        }

        else if ( this.attributeValue <= 12 ) {

            this.baseModifier = 0;
        }

        else if ( this.attributeValue <= 15 ) {

            this.baseModifier = 1;
        }

        else if ( this.attributeValue <= 18 ) {

            this.baseModifier = 2;
        }

        else if ( this.attributeValue <= 21 ) {

            this.baseModifier = 3;
        }

        else {
            this.baseModifier = 4;
        }
        */
    }
}