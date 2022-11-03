import gql from "graphql-tag";     //graphql-tag用于解析GraphQL查询

export const GET_FOOTBALLLIST = gql `
    subscription footballListV2($listType: String!, $filterType: Int) {
        footballListV2(input: {listType: $listType, filterType: $filterType})
    }
`;

export const GET_SPORTODDSDETAILL = gql `
    subscription sportOddsDetail($matchID: String!, $listType: String!) {
        sportOddsDetail(matchID: $matchID, listType: $listType)
    }
`;