import { request } from "@/utils/ApolloClient";

import {
    GET_FOOTBALLLIST
} from '@/graphql/useSubscription';

export const getFootballList = function(params) {
    return request.subscription(GET_FOOTBALLLIST, params)
}