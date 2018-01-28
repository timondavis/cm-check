/// <reference types="node" />
import { EventEmitter } from 'events';
import { Check } from "./Check";
export declare class CheckExecutor extends EventEmitter {
    private static instance;
    private static locked;
    protected checkTypes: {
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
    generateCheck(type?: string): Check;
    registerCheckType(type: string, callback: Function): void;
    protected static doCheck(check: Check): void;
    protected static processModifiers(check: Check, phase: string): void;
    protected static engageThreadLock(): void;
    protected static liftThreadLock(): void;
    protected static isThreadLocked(): boolean;
    private constructor();
}
