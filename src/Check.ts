import { DieBag } from "./DieBag";

export abstract class Check {

    protected targetModifiers: { name: string, value: number}[] = [];
    protected resultModifiers: { name: string, value: number}[] = [];
    protected dieModifiers: { name: string, dieBag: DieBag, phase: string, remove: boolean, strictRemove: boolean }[] = [];

    protected rawResult: number = 0;
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
        this.addResultModifier( { name: 'baseAttributeModifier', value: attributeValue } );
    }

    public addTargetModifier( modifier: { name: string, value: number } ) : void {

        this.targetModifiers.push( modifier );
    }

    public addResultModifier( modifier: { name: string, value: number } ) : void {

        this.resultModifiers.push( modifier );
    }

    public addDieModifier( modifier: { name: string, dieBag: DieBag, phase: string, remove: boolean, strictRemove: boolean } ) : void {

        this.dieModifiers.push( modifier );
    }

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

    public getRawRollResult() : number {

        return this.rawResult;
    }

    public check() : void {

        this.dieBag.roll();
        this.rawResult = this.dieBag.getTotal();
        this.setResult( this.dieBag.getTotal() );
    }

    public getDieBag() : DieBag {

        return this.dieBag;
    }

    /**
     * Get a report on the status of the check
     * @param {boolean} getReportAsString
     *
     * @returns {string | {{isPass: boolean; target: number; result: number}}
     */
    public report( getReportAsString : boolean ) : any {

        let report = { isPass: this.isPass(), target: this.target, result: this.result };
        return ( getReportAsString ) ? JSON.stringify( report ) : report;
    }

    public abstract getType() : string;

    protected static translateAttributeValue( value: number ) : number { return value; }

    protected abstract setBaseDieBag() : void;

}