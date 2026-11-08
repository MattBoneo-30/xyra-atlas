/** The same deterministic assignment is used by the smoke suite and CI runner. */
export const BROWSER_SHARD_COUNT=3;
export function browserShardFor(index){
 if(!Number.isInteger(index)||index<0)throw Error('Scenario index must be nonnegative');
 return index%BROWSER_SHARD_COUNT+1;
}
