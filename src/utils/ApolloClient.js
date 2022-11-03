import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { provideApolloClient, useQuery, useMutation, useSubscription } from '@vue/apollo-composable';
import { Toast } from 'vant';


// const {
//     VUE_WS_BASE_URL,
//     VUE_WS_BASE_QUERY
// } = process.env;

// 缓存实现
const cache = new InMemoryCache()

// 与 API 的 HTTP 连接
const httpLink = createHttpLink({
    // 你需要在这里使用绝对路径
    uri: '/query',
})

  
// 创建订阅的 websocket 连接
const wsLink = new WebSocketLink({
    uri: 'ws://192.168.180.105:10000/query',
    options: {
      reconnect: true,
    },
})

// 使用分割连接的功能
// 你可以根据发送的操作类型将数据发送到不同的连接
const link = split(
    // 根据操作类型分割
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    },
    wsLink,
    httpLink
)

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
    cache,
    link,
    connectToDevTools: true,
})

export const request = {};
request.query = (SymbolTxt, params) => {
    
    return new Promise((resolve, reject) => {
        
        const {onError, onResult, refetch} = useQuery(SymbolTxt, params)
        
        refetch()
        onResult((res) =>{
            console.log(res)
            if(res.data) {
                resolve({
                    code: 20000,
                    data: res.data,
                })
            } else {
                reject(res)
            } 
        });
        onError(res => reject(res))
    })
};

request.mutate = (SymbolTxt, params, options) => {
    return new Promise((resolve, reject) => {
        const result = useMutation(SymbolTxt, options)
        console.log("result", result)
        result.mutate(params).then(res=> {
            
            const { code, msg } = res.data.bet;
            if (code != 0) {
                Toast.success(msg);
                reject(res)
            } else {
                resolve(res.data)
            }
        }).catch(res=> {
            reject(res)
        })
    })
};

request.subscription = (symbolTxt, refs) => {
    const result = useSubscription(symbolTxt, refs);
    return result
}
provideApolloClient(apolloClient);
export default apolloClient