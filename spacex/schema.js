const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
    GraphQLString
} = require('graphql');

const service = require('./services/index');
const {LaunchType, RocketType, ShipType} = require('./model');

// Root query
const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => 'world'
        },
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(_, args){
                return service.getLaunces()
                    .then(res => res.data)
                    .catch((error) => [])
            }
        },
        launch: {
            type: LaunchType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(_, args){
                return service.getLaunch(args.id)
                    .then(res => res.data)
                    .catch(error => {})
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(_, args){
                return service.getRockets()
                    .then(res => res.data)
                    .catch(error => [])
            }
        },
        rocket: {
            type: RocketType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(_, args){
                return service.getRocketDetail(args.id)
                    .then(res => res.data)
                    .catch(()=> {})
            }
        },
        ships: {
            type: new GraphQLList(ShipType),
            resolve(_, args){
                return service.getShips()
                    .then(res => res.data)
                    .catch((error) => [])
            }
        },
        ship: {
            type: ShipType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args){
                return service.getShipDetail(args.id)
                    .then(res => res.data)
                    .catch((error) =>null)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})