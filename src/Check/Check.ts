import { DieBag } from "../DieBag";
import { DieModifier } from "./Modifier/DieModifier";
import { TargetModifier } from "./Modifier/TargetModifier";
import { ResultModifier } from "./Modifier/ResultModifier";

export abstract class Check {

    protected targetModifiers: TargetModifier[] = [];
    protected resultModifiers: ResultModifier[] = [];
    protected dieModifiers: DieModifier[] = [];

    protected rawResult: number = 0;
    protected result: number = 0;

    protected dieBag : DieBag;


    /**
     * @pre The attribute defined must exist on any entities tested against this check.
     *
     * @param {number} target
     */
    public constructor( protected target: number ) {

        this.dieBag = new DieBag();
        this.setBaseDieBag();
    }

    /**
     * Add a new modifier to the check's target number before the roll
     *
     * @param {TargetModifier} modifier
     */
    public addTargetModifier( modifier: TargetModifier ) : void {

        this.targetModifiers.push( modifier );
    }

    /**
     * Add a new modifier to the check's result after the roll
     *
     * @param {ResultModifier} modifier
     */
    public addResultModifier( modifier: ResultModifier ) : void {

        this.resultModifiers.push( modifier );
    }

    /**
     * Add a new modifier to the amount of die (before or after the roll)
     *
     * @param {DieModifier} modifier
     */
    public addDieModifier( modifier: DieModifier ) : void {

        this.dieModifiers.push( modifier );
    }

    /**
     * Get a collection of all registered target modifiers
     * @returns {TargetModifier[]}
     */
    public getTargetModifiers() : TargetModifier[] { return this.targetModifiers; }

    /**
     * Get a collection of all registered result modifiers
     * @returns {ResultModifier[]}
     */
    public getResultModifiers() : ResultModifier[] { return this.resultModifiers; }

    /**
     * Get a collection of all registered die modifiers
     * @returns {DieModifier[]}
     */
    public getDieModifiers() : DieModifier[] { return this.dieModifiers; }


    /**
     * Has the check passed?
     *
     * @returns {boolean}
     */
    public isPass() : boolean {

        return ( this.result >= this.target );
    }

    /**
     * Set or reset the target number for the check
     *
     * @param {number} target
     */
    public setTarget( target : number ) {
        this.target = target;
    }

    /**
     * Get the target number for the check
     *
     * @returns {number}
     */
    public getTarget() : number {
        return this.target;
    }

    /**
     * Set or reset the result of the check
     *
     * @param {number} result
     */
    public setResult( result : number ) {

        this.result = result;
    }

    /**
     * Get the current result value on the check
     * @returns {number}
     */
    public getResult() : number {

        return this.result;
    }

    /**
     * Get the result of dice rolled, without modifiers.
     * @returns {number}
     */
    public getRawRollResult() : number {

        return this.rawResult;
    }

    /**
     * Execute the check
     */
    public check() : void {

        this.dieBag.roll();
        this.rawResult = this.dieBag.getTotal();
        this.setResult( this.dieBag.getTotal() );
    }

    /**
     * Get the die bag belonging to the check
     *
     * @returns {DieBag}
     */
    public getDieBag() : DieBag {

        return this.dieBag;
    }

    /**
     * Get a report on the status of the check
     * @param {boolean} getReportAsString
     *
     * @returns {string | {{isPass: boolean; target: number; result: number, modifiers: []any, number}}
     */
    public report( getReportAsString : boolean ) : any {

        let report = {
            isPass: this.isPass(),
            target: this.target,
            result: this.result,
            modifiers: [
                { targetModifiers: this.getTargetModifiers() },
                { resultModifiers: this.getResultModifiers() },
                { dieModifiers: this.getDieModifiers() },
            ],
            rollResult: this.getDieBag().getTotal()
        };
        return ( getReportAsString ) ? JSON.stringify( report ) : report;
    }

    /**
     * Get the typename of this check
     *
     * @returns {string}
     */
    public abstract getType() : string;

    /**
     * Set a new DieBag on this check.
     */
    protected abstract setBaseDieBag() : void;
}