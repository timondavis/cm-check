/// <reference types="node" />
import { EventEmitter } from 'events';
import { Check } from "./Check";
export declare class CheckExecutor extends EventEmitter {
    private static instance;
    private static locked;
    /**
     * Get the global instance of the Check Machine
     * @returns {CheckExecutor}
     */
    static getInstance(): CheckExecutor;
    /**
     * Execute a check
     *
     * @TODO THREAD LOCKING IS VERY RUDIMENTARY.  IMPROVE
     * @param {Check} check
     * @returns {Check}
     */
    execute(check: Check): Check;
    /**
     * Execute a check passed in
     *
     * @param {Check} check
     */
    private static doCheck(check);
    private static processModifiers(check, phase);
    protected static engageThreadLock(): void;
    protected static liftThreadLock(): void;
    protected static isThreadLocked(): boolean;
    private constructor();
}
