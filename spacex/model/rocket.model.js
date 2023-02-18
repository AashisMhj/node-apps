const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLList
} = require('graphql');

const HeightType = new GraphQLObjectType({
    name: 'RocketHeight',
    fields: () => ({
        meters: {type: GraphQLFloat},
        feet: {type: GraphQLInt}
    })
});
const DiameterType = new GraphQLObjectType({
    name: 'RocketDiameter',
    fields: () => ({
        meters: {type: GraphQLFloat},
        feet: {type: GraphQLInt}
    })
});


const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        id: {type: GraphQLString},
        height: {type: HeightType},
        diameter: {type: DiameterType},
        id: {type: GraphQLString}  ,
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        active: {type: GraphQLBoolean},
        cost_per_launch: {type: GraphQLInt},
        first_flight: {type: GraphQLString},
        county: {type: GraphQLString},
        company: {type: GraphQLString},
        description: {type: GraphQLString},
        wikipedia: {type: GraphQLString},
        flickr_images: {type: new GraphQLList(GraphQLString)}
    })
})

module.exports = RocketType;