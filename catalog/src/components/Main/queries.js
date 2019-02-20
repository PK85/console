import gql from 'graphql-tag';

const serviceClassesQGL = `
  name
  description
  displayName
  externalName
  imageUrl
  activated
  providerDisplayName
  tags
  labels
`;

export const SERVICE_CLASSES_QUERY = gql`
  query serviceClasses($namespace: String!) {
    serviceClasses(namespace: $namespace) {
      ${serviceClassesQGL}
    }
  }
`;

export const CLUSTER_SERVICE_CLASSES_QUERY = gql`
  query clusterServiceClasses {
    clusterServiceClasses {
      ${serviceClassesQGL}
    }
  }
`;
