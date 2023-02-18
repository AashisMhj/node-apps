const {GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLList, } = require('graphql');

const ShipType = new GraphQLObjectType({
    name: 'Ship',
    fields: ()=>({
        roles: {type: new GraphQLList(GraphQLString)},
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        active: {type: GraphQLBoolean},
        link: {type: GraphQLString},
        image: {type: GraphQLString},
        year_built: {type: GraphQLInt},
        home_port: {type: GraphQLString},
        launches: {type: new GraphQLList(GraphQLString)}
    })
})


module.exports = ShipType;