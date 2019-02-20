import gql from 'graphql-tag';

export const SEND_NOTIFICATION = gql`
  mutation sendNotification(
    $title: String!
    $color: String!
    $icon: String!
    $type: String!
    $instanceName: String!
    $classClusterWide: Boolean!
  ) {
    sendNotification(
      title: $title
      color: $color
      icon: $icon
      type: $type
      instanceName: $instanceName
      classClusterWide: $classClusterWide
    ) @client {
      title
    }
  }
`;
