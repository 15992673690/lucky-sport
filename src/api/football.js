import { request } from "@/utils/ApolloClient";

import {
    GET_SPORTODDSDETAILL
} from '@/graphql/useSubscription';

export const getSportOddsDetail = function(params) {
    return request.subscription(GET_SPORTODDSDETAILL, params)
}