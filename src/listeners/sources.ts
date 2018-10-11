import { JscpdEventEmitter, MATCH_SOURCE_EVENT } from '../events';
import { IListener } from '../interfaces/listener.interface';
import { ISource } from '../interfaces/source.interface';
import { IStore } from '../interfaces/store/store.interface';
import { SOURCES_DB } from '../stores/models';
import { StoresManager } from '../stores/stores-manager';
import { generateSourceId } from '../utils';
import { timerStart, timerStop } from '../utils/timer';

export class SourcesListener implements IListener {
  public attach(eventEmitter: JscpdEventEmitter): void {
    eventEmitter.on(MATCH_SOURCE_EVENT, this.matchSource.bind(this));
  }

  private matchSource(source: ISource) {
    timerStart(this.constructor.name);
    const sourceId: string = generateSourceId(source);
    const sourcesStore: IStore<ISource> = StoresManager.getStore(SOURCES_DB);
    sourcesStore.set(sourceId, source);
    timerStop(this.constructor.name);
  }
}
