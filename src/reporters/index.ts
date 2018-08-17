import { IOptions } from '../interfaces/options.interface';
import { IReporter } from '../interfaces/reporter.interface';
import { ConsoleReporter } from './console';
import { ConsoleFullReporter } from './consoleFull';
import { JsonReporter } from './json';
import { SilentReporter } from './silent';
import { StatisticReporter } from './statistic';
import { TimeReporter } from './time';
import { XmlReporter } from './xml';
import { ThresholdReporter } from './threshold';

const REPORTERS: { [key: string]: IReporter } = {};

export function registerReporter(name: string, reporter: IReporter): void {
  REPORTERS[name] = reporter;
}

export function getRegisteredReporters(): { [key: string]: IReporter } {
  return REPORTERS;
}

export function registerReportersByName(options: IOptions) {
  const { reporter = [] } = options;
  if (reporter.includes('console')) {
    registerReporter('console', new ConsoleReporter(options));
  }

  if (reporter.includes('consoleFull')) {
    registerReporter('consoleFull', new ConsoleFullReporter(options));
  }

  if (reporter.includes('time')) {
    registerReporter('time', new TimeReporter(options));
  }

  if (reporter.includes('json')) {
    registerReporter('json', new JsonReporter(options));
  }

  if (reporter.includes('xml')) {
    registerReporter('xml', new XmlReporter(options));
  }

  if (reporter.includes('stat')) {
    registerReporter('stat', new StatisticReporter(options));
  }

  if (reporter.includes('silent')) {
    registerReporter('silent', new SilentReporter(options));
  }
  if (reporter.includes('threshold')) {
    registerReporter('threshold', new ThresholdReporter(options));
  }
}