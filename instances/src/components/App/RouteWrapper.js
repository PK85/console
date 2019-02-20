import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spinner } from '@kyma-project/react-components';

import ServiceInstances from '../ServiceInstances/ServiceInstances.container';
import BundleServiceInstances from '../ServiceInstances/BundleServiceInstances.container';
import ServiceInstanceDetails from '../ServiceInstanceDetails/ServiceInstanceDetails.container';
import BundleServiceInstanceDetails from '../ServiceInstanceDetails/BundleServiceInstanceDetails.container';

import { EmptyList } from '../ServiceInstanceDetails/styled';

class RouteWrapper extends React.Component {
  componentDidMount() {
    if (typeof this.props.subscribeToEvents === 'function') {
      this.props.subscribeToEvents();
    }
  }

  render() {
    const { serviceInstances } = this.props;
    if (serviceInstances.loading) {
      return (
        <EmptyList>
          <Spinner />
        </EmptyList>
      );
    }

    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={ServiceInstances} />
          <Route
            exact
            path="/details/:name"
            component={ServiceInstanceDetails}
          />
          <Route exact path="/bundle" component={BundleServiceInstances} />
          <Route
            exact
            path="/bundle/details/:name"
            component={BundleServiceInstanceDetails}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default RouteWrapper;
