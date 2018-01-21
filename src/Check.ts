import { DieBag } from "./DieBag";

export abstract class Check {

    protected attributeModifiers: {name: string, value: number}[];
    protected targetModifiers: { name: string, value: number}[];
    protected resultModifiers: { name: string, value: number}[];
    protected dieModifiers: { name: string, dieBag: DieBag }[];

    protected result: number = 0;

    protected dieBag : DieBag;


    /**
     * @pre The attribute defined must exist on any entities tested against this check.
     *
     * @param {number} attributeValue
     * @param {number} target
     */
    public constructor( protected attributeValue : number, protected target: number ) {

        this.dieBag = new DieBag();
    }

    public addAttributeModifier( modifier: {name: string, value: number} ) : void {

        this.attributeModifiers.push( modifier );
    }

    public addTargetModifier( modifier: { name: string, value: number } ) : void {

        this.targetModifiers.push( modifier );
    }

    public addResultModifier( modifier: { name: string, value: number } ) : void {

        this.resultModifiers.push( modifier );
    }

    public addDieModifier( modifier: { name: string, dieBag: DieBag } ) : void {

        this.dieModifiers.push( modifier );
    }

    public getAttributeModifiers() { return this.attributeModifiers; }
    public getTargetModifiers() { return this.targetModifiers; }
    public getResultModifiers() { return this.resultModifiers; }
    public getDieModifiers() { return this.dieModifiers; }


    public isPass() : boolean {

        return ( this.result >= this.target );
    }

    public setTarget( target : number ) {
        this.target = target;
    }

    public getTarget() : number {
        return this.target;
    }

    public setResult( result : number ) {

        this.result = result;
    }

    public getResult() : number {

        return this.result;
    }

    public check() : void {

        this.dieBag.roll();
    }

    public getDieBag() : DieBag {

        return this.dieBag;
    }

    public abstract getType() : string;

    protected abstract translateAttributeValue( value: number, callback : { ( value : number ): number } ): number ;

    protected abstract setBaseDieBag() : void;

}