const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} =  require('graphql');
const RocketType = require('./rocket.model');

const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: ()=>({
        rocket: {type: GraphQLString},
        details: {type: GraphQLString},
        flight_number: {type: GraphQLInt},
        name: {type: GraphQLString},
        upcoming: {type: GraphQLBoolean},
        id: {type: GraphQLString}
    })
});

module.exports = LaunchType;