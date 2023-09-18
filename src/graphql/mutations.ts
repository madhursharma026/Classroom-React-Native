import {gql} from '@apollo/client';

export const FIRST_SETP_USER_LOGIN = gql`
  mutation FirstStepUserLogin($firstStepUserLoginInput: FirstStepLoginInput!) {
    firstStepUserLogin(firstStepUserLoginInput: $firstStepUserLoginInput) {
      id
    }
  }
`;

export const USER_LOGIN_VERIFICATION = gql`
  mutation UserLoginVerification(
    $loginVerificationInput: LoginVerificationInput!
  ) {
    userLoginVerification(loginVerificationInput: $loginVerificationInput) {
      jwtToken
      refreshToken
    }
  }
`;

export const INITIATE_CONVERSATION = gql`
  mutation InitiateConversation {
    initiateConversation {
      id
      isWaiting
      createdAt
      updatedAt
      conversationInitiator {
        id
        firstName
        lastName
        age
        mobileNumber
        verified
        level
        totalTalks
        createdAt
        updatedAt
        teachingClasses {
          id
          title
          startsAt
          description
          teacherId
          createdAt
          updatedAt
          usersJoined {
            id
            firstName
            lastName
            age
            mobileNumber
            verified
            level
            totalTalks
            createdAt
            updatedAt
          }
          teacher {
            id
            firstName
            lastName
            age
            mobileNumber
            verified
            createdAt
            updatedAt
          }
        }
        conversationsStarted {
          id
          isWaiting
          createdAt
          updatedAt
          isPair
        }
        conversationJoined {
          id
          isWaiting
          createdAt
          updatedAt
          isPair
        }
      }
      conversationWith {
        id
        firstName
        lastName
        age
        mobileNumber
        verified
        level
        totalTalks
        createdAt
        updatedAt
      }
      isPair
    }
  }
`;

export const PAIR_MATCHES = gql`
  subscription Subscription {
    pairMatched {
      id
      isWaiting
      createdAt
      updatedAt
      conversationInitiator {
        id
        firstName
        lastName
        age
        mobileNumber
        verified
        level
        totalTalks
        createdAt
        updatedAt
        teachingClasses {
          id
          title
          startsAt
          description
          teacherId
          createdAt
          updatedAt
          usersJoined {
            id
            firstName
            lastName
            age
            mobileNumber
            verified
            level
            totalTalks
            createdAt
            updatedAt
          }
          teacher {
            id
            firstName
            lastName
            age
            mobileNumber
            verified
            createdAt
            updatedAt
          }
        }
        conversationsStarted {
          id
          isWaiting
          createdAt
          updatedAt
          isPair
        }
        conversationJoined {
          id
          isWaiting
          createdAt
          updatedAt
          isPair
        }
      }
      conversationWith {
        id
        firstName
        lastName
        age
        mobileNumber
        verified
        level
        totalTalks
        createdAt
        updatedAt
      }
      isPair
    }
  }
`;
