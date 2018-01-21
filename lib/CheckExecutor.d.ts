/// <reference types="node" />
import { EventEmitter } from 'events';
import { Check } from "./Check";
export declare class CheckExecutor extends EventEmitter {
    private instance;
    /**
     * Get the global instance of the Check Machine
     * @returns {CheckMachine}
     */
    getInstance(): CheckExecutor;
    /**
     * Execute a check
     *
     * @param {Check} check
     * @param entity
     * @param {number} target
     * @returns {Check}
     */
    execute(check: Check, target: number, entity?: any): boolean;
    private static doCheck(check);
    private static processTargetModifiers(check);
    private static processResultModifiers(check);
    private static processDieModifiers(check);
    private constructor();
}
