import gql from "graphql-tag";

// 赛事查询
export const MATCH_SEARCH = gql `
    query matchSearch($name: String!) {
        matchSearch(name: $name){
            matchID
            homeName
            homeLogo
            awayName
            awayLogo
            matchTime
            leagueName
        }
    }
`;

// 体育我的投注列表
export const GET_SPORTBETLIST = gql`
    query sportBetList($isSettlement: Int!) {
        sportBetList(isSettlement: $isSettlement) {
            betTime
            betInfo
            betAmount
            betInfoNum
            issueOn
            isSettlement
            subData
            returnAmount
            win
            currency
        }
    }
`