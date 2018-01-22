/// <reference types="node" />
import { EventEmitter } from 'events';
import { Check } from "./Check";
export declare class CheckExecutor extends EventEmitter {
    private static instance;
    private isExecutingHook;
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
     * @param entity
     * @param {number} target
     * @returns {Check}
     */
    execute(check: Check): boolean;
    private doCheck(check);
    private processTargetModifiers(check, phase);
    private processResultModifiers(check, phase);
    private processDieModifiers(check, phase);
    private constructor();
}
