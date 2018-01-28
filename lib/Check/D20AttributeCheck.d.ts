import { Check } from './Check';
export declare class D20AttributeCheck extends Check {
    protected attributeValue: number;
    protected attributeName: string;
    constructor(attributeValue: number, target: number, attributeName?: string);
    /**
     * Set the name of the attribute being checked against
     * @param {string} name
     */
    setAttributeName(name: string): void;
    /**
     * Get the name of the attribute being checked against
     * @returns {string | undefined}
     */
    getName(): string;
    /**
     * Get the formal typename of this check
     * @returns {string}
     */
    getType(): string;
    protected setBaseDieBag(): void;
    protected static translateAttributeValue(value: number): number;
}
