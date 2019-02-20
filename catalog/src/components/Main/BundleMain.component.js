import React from 'react';
import PropTypes from 'prop-types';

import { ThemeWrapper } from '@kyma-project/react-components';

import ServiceClassList from '../ServiceClassList/BundleServiceClassList.container';

import { MainWrapper } from './styled';

const MainPage = ({
  history,
  serviceClasses,
  filterClasses,
  filterClassesAndSetActiveFilters,
  filterFilters,
}) => {
  const searchFn = e =>
    filterClassesAndSetActiveFilters('search', e.target.value);

  const svcClassesArray = serviceClasses.clusterServiceClasses
    ? serviceClasses.clusterServiceClasses
    : serviceClasses.serviceClasses;
  console.log('test', svcClassesArray);

  return (
    <ThemeWrapper>
      <MainWrapper>
        {!serviceClasses.loading && (
          <ServiceClassList
            serviceClasses={!serviceClasses.error ? svcClassesArray : []}
            filterServiceClasses={filterClasses}
            setServiceClassesFilter={filterClassesAndSetActiveFilters}
            history={history}
            searchFn={searchFn}
            errorMessage={serviceClasses.error && serviceClasses.error.message}
          />
        )}
      </MainWrapper>
    </ThemeWrapper>
  );
};

MainPage.propTypes = {
  history: PropTypes.object.isRequired,
  serviceClasses: PropTypes.object.isRequired,
  filterClasses: PropTypes.func.isRequired,
  filterClassesAndSetActiveFilters: PropTypes.func.isRequired,
};

export default MainPage;
