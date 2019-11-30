/// <reference types="node" />
import { Check } from "./Check";
import { Modifier } from "./Modifier/Modifier";
import { EventEmitter } from "events";
export declare class CheckExecutor extends EventEmitter {
    private static instance;
    private static locked;
    protected checkTypes: {
        [key: string]: Function;
    };
    protected modifierTypes: {
        [key: string]: Function;
    };
    /**
     * Get the global instance of the Check Machine
     * @returns {CheckExecutor}
     */
    static getInstance(): CheckExecutor;
    /**
     * Execute a check
     *
     * @TODO is there a better way to thread-lock on this method?
     *
     * @param {Check} check
     * @returns {Check}
     */
    execute(check: Check): Check;
    /**
     * Generate a new check.  Returns a simple check by default, but you can pass in the key of a check type to get
     * an instance.
     *
     * @param {string} type
     * @returns {Check}
     */
    generateCheck(type?: string): Check;
    /**
     * Register a check type to the CheckExecutor.  The callback provided should return an instance of the check
     * being paired with it.
     *
     * @param {string} type
     * @param {Function} callback
     */
    registerCheckType(type: string, callback: Function): void;
    /**
     * Get an array of the available check names
     * @returns {string[]}
     */
    getCheckTypes(): string[];
    /**
     * Generate a new modifier instance
     *
     * @param {string} type
     * @returns {Modifier}
     */
    generateModifier(type: string): Modifier;
    /**
     * Register a new modifier type
     *
     * @param {string} type
     * @param {Function} callback
     */
    registerModifierType(type: string, callback: Function): void;
    /**
     * Get an array of available modifier names
     *
     * @returns {string[]}
     */
    getModifierTypes(): string[];
    protected static doCheck(check: Check): void;
    protected static processModifiers(check: Check, phase: string): void;
    protected static engageThreadLock(): void;
    protected static liftThreadLock(): void;
    protected static isThreadLocked(): boolean;
    private constructor();
}
