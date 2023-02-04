const {GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt, } = require('graphql');

const PositionSchema = new GraphQLObjectType({
    name: 'Position',
    fields: ()=>({
        longitude: {type: GraphQLInt},
        latitude: {type: GraphQLInt}
    })
});

const ShipType = new GraphQLObjectType({
    name: 'Ship',
    fields: ()=>({
        ship_id: {type: GraphQLString},
        ship_name: {type: GraphQLString},
        ship_type: {type: GraphQLString},
        // roles: PositionSchema],
        active: {type: GraphQLBoolean},
        position: {type: PositionSchema},
        url: {type: GraphQLString},
        image: {type: GraphQLString}
    })
});

module.exports = ShipType;