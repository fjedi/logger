import pino, { Logger } from 'pino';

function logMethod(args: any, method: any) {
  if (args.length === 2) {
    let interpolationValue;
    switch (typeof args[1]) {
      case 'object':
        interpolationValue = ' %j';
        break;
      case 'string':
        interpolationValue = ' %s';
        break;
      case 'number':
        interpolationValue = ' %d';
        break;
      default:
    }
    // eslint-disable-next-line no-param-reassign
    args[0] = `${args[0]}${interpolationValue}`;
  }
  // @ts-ignore
  method.apply(this, args);
}

export const logger = pino({
  // Set to null to avoid adding pid, hostname and name properties to each log.
  base: null,
  prettyPrint: true,
  // @ts-ignore
  hooks: { logMethod },
});

export function getLogger(): Logger {
  return logger;
}

// @ts-ignore
export { Logger };
