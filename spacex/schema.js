const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString
} = require('graphql');

const service = require('./services/index');
const {LaunchType, RocketType, ShipType} = require('./model');

// Root query
const RootQuery = new GraphQLObjectType({
    name: 'rootQueryType',
    fields: {
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
                flight_number: {type: GraphQLInt}
            },
            resolve(_, args){
                return service.getLaunch(args.flight_number)
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
                id: {type: GraphQLInt}
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
                    .catch(() => [])
            }
        },
        ship: {
            type: ShipType,
            args: {
                rocket_name: {type: GraphQLString}
            },
            resolve(parent, args){
                return service.getShipDetail(args.rocket_name)
                    .then(res => res.data)
                    .catch(() => {})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})