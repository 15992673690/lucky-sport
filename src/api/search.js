import { request } from "@/utils/ApolloClient";

import {
    MATCH_SEARCH
} from '@/graphql/useQuery';

export const matchSearch = function(params) {
    return request.query(MATCH_SEARCH, params)
}