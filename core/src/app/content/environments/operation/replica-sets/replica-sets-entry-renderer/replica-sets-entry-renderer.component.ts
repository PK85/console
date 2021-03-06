import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { AbstractKubernetesEntryRendererComponent } from '../../abstract-kubernetes-entry-renderer.component';
import { Subscription } from 'rxjs';
import { ComponentCommunicationService } from '../../../../../shared/services/component-communication.service';
import { StatusLabelComponent } from '../../../../../shared/components/status-label/status-label.component';
import { ENETUNREACH } from 'constants';

@Component({
  selector: 'app-replica-sets-entry-renderer',
  templateUrl: './replica-sets-entry-renderer.component.html',
  styleUrls: ['./replica-sets-entry-renderer.component.scss']
})
export class ReplicaSetsEntryRendererComponent
  extends AbstractKubernetesEntryRendererComponent
  implements OnInit, OnDestroy {
  constructor(
    protected injector: Injector,
    private componentCommunicationService: ComponentCommunicationService
  ) {
    super(injector);
  }
  public disabled = false;
  private communicationServiceSubscription: Subscription;

  ngOnInit() {
    this.communicationServiceSubscription = this.componentCommunicationService.observable$.subscribe(
      e => {
        const event: any = e;
        if (
          'disable' === event.type &&
          this.entry.metadata.name === event.entry.metadata.name
        ) {
          this.disabled = event.entry.disabled;
        }
      }
    );
  }

  ngOnDestroy() {
    this.communicationServiceSubscription.unsubscribe();
  }

  hasWarnings(entry) {
    // TODO adjust when ui-api-layer for replica sets is ready
    return entry.status.readyReplicas !== entry.status.replicas;
    // return entry.pods.warnings.length > 0;
  }

  isPending(entry) {
    // TODO adjust when ui-api-layer for replica sets is ready
    return false;
    // return !this.hasWarnings(entry) && entry.pods.pending > 0;
  }

  getClass(entry) {
    // TODO adjust when ui-api-layer for replica sets is ready
    if (this.hasWarnings(entry)) {
      return 'sf-indicator--warning';
    } else if (this.isPending(entry)) {
      return '';
    } else {
      return 'sf-indicator--success';
    }
  }

  getStatus(entry) {
    // TODO adjust when ui-api-layer for replica sets is ready
    if (this.isPending(entry)) {
      return 'pending';
    }
    if (this.hasWarnings(entry)) {
      return 'has warnings';
    }
    return 'running';
  }

  getStatusType(entry) {
    // TODO adjust when ui-api-layer for replica sets is ready
    if (this.isPending(entry) || this.hasWarnings(entry)) {
      return 'warning';
    }
    return 'ok';
  }
}
