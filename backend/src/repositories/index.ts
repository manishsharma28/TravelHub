import { memoryRepository } from './memory.js';
import type { PackageRepository } from './types.js';

export type { PackageRepository } from './types.js';

/**
 * Chooses the data source for the running process.
 *
 * Today only the in-memory seed data exists. To move to DynamoDB:
 *   1. Implement PackageRepository in ./dynamo.ts
 *   2. Add the branch below
 *   3. Set DATA_SOURCE=dynamo in the environment
 *
 *   const repository =
 *     process.env.DATA_SOURCE === 'dynamo' ? dynamoRepository : memoryRepository;
 *
 * Nothing else in the codebase needs to change — routes only see this export.
 */
export const repository: PackageRepository = memoryRepository;
