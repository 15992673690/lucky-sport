import { request } from "@/utils/ApolloClient";

import {
    GET_SPORTBETLIST
} from '@/graphql/useQuery';

export const getSportBetList = function(params) {
    return request.query(GET_SPORTBETLIST, params)
}