import { getMonorepoDirpath } from 'get-monorepo-root';
import nullthrows from 'nullthrows-es';

export const monorepoDirpath = nullthrows(getMonorepoDirpath(import.meta.url));
